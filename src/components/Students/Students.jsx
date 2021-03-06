import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./../Loader/Loader";
import StudentModal from "./StudentModal";

const Students = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("firstname");
  const [currentStudent, setCurrentStudent] = useState({
    studentId: "",
    firstname: "",
    patronymic: "",
    lastname: "",
    gender: "",
  });

  const fetchStudents = async () => {
    await axios
      .get("https://psrt-app.herokuapp.com/api/students")
      .then((res) => {
        filtrateStudents(res.data);
      });
    setIsLoading(false);
  };

  const filtrateStudents = (array) => {
    if (filter !== "") {
      const filtratedStudents = array.filter((student) => {
        return (
          student.firstname.toLowerCase().includes(filter.toLowerCase()) ||
          student.patronymic.toLowerCase().includes(filter.toLowerCase()) ||
          student.lastname.toLowerCase().includes(filter.toLowerCase())
        );
      });
      setAllStudents(filtratedStudents);
    } else {
      setAllStudents(array);
    }
  };

  const deleteStudent = async (id) => {
    setIsLoading(true);
    await axios
      .delete(`https://psrt-app.herokuapp.com/api/students/${id}`)
      .then((res) => {
        fetchStudents();
      });
  };

  const editStudent = async (id) => {
    console.log(`Select student no.${id}`);
    setEditMode(true);
    await axios
      .get(`https://psrt-app.herokuapp.com/api/students/${id}`)
      .then((res) => setCurrentStudent(res.data));
    setShowStudentModal(true);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (!editMode) {
      await axios.post("https://psrt-app.herokuapp.com/api/students", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        },
      });
    } else {
      await axios.put(
        `https://psrt-app.herokuapp.com/api/students/${currentStudent.studentId}`,
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json",
          },
        }
      );
      setEditMode(false);
    }
    await fetchStudents();
    setShowStudentModal(false);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (showStudentModal === false) {
      fetchStudents();
      setCurrentStudent({
        studentId: "",
        firstname: "",
        patronymic: "",
        lastname: "",
        gender: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort, showStudentModal]);

  return (
    <div className="w-3/4 flex flex-col items-center justify-between pl-10 ">
      {isLoading ? (
        <Loader />
      ) : showStudentModal === false ? (
        <div className="w-full flex flex-col justify-between">
          <input
            className="self-end border-2 border-indigo-600 p-2 mt-2"
            type="text"
            placeholder="??????????.."
            onChange={(e) => searchHandler(e)}
          />
          <table className="text-center mt-5 border-solid border-2 border-slate-300">
            <thead className="bg-slate-400">
              <tr>
                <th
                  className="cursor-pointer"
                  onClick={() => setSort("firstname")}
                >
                  ??????
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => setSort("patronymic")}
                >
                  ????????????????
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => setSort("lastname")}
                >
                  ??????????????
                </th>
                <th>??????</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allStudents
                .sort((a, b) => (a[sort] > b[sort] ? 1 : -1))
                .map((student) => {
                  return (
                    <tr key={student.studentId}>
                      <td className="border border-slate-300">
                        {student.firstname}
                      </td>
                      <td className="border border-slate-300">
                        {student.patronymic}
                      </td>
                      <td className="border border-slate-300">
                        {student.lastname}
                      </td>
                      <td className="border border-slate-300">
                        {student.gender}
                      </td>
                      <td className="border border-slate-300 w-1/4">
                        <button
                          className="self-center bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mr-2"
                          onClick={() => editStudent(student.studentId)}
                        >
                          ????????????????
                        </button>
                        <button
                          className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                          onClick={() => deleteStudent(student.studentId)}
                        >
                          ??????????????
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <button
            onClick={() => setShowStudentModal(true)}
            className="self-center mt-5 w-1/2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ???????????????? ??????????????
          </button>
        </div>
      ) : (
        <StudentModal
          onSubmit={onSubmit}
          data={currentStudent}
          toBack={setShowStudentModal}
        />
      )}
    </div>
  );
};

export default Students;
