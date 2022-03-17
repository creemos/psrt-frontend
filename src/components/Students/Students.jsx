import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./../Loader/Loader";
import StudentModal from "./StudentModal";

const Students = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("firstname")
  const [currentStudent, setCurrentStudent] = useState({
    studentId: "",
    firstname: "",
    patronymic: "",
    lastname: "",
    gender: "",
  });

  const fetchStudents = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:9090/api/students")
      .then((res) => {
        filtrateStudents(res.data)
      })
      .then(setIsLoading(false));
  };

  const filtrateStudents = (array) => {
    if (filter !== "") {
      const filtratedStudents = array.filter((student) => {
        return student.firstname.toLowerCase().includes(filter) || student.patronymic.toLowerCase().includes(filter) || student.lastname.toLowerCase().includes(filter);
      });
      setAllStudents(filtratedStudents);
    } else {
      setAllStudents(array)
    }
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:9090/api/students/${id}`)
      .then((res) => {
        fetchStudents();
        console.log(`User with no.${id} deleted!`);
      })
  };


  const editStudent = (id) => {
    console.log(`Select student no.${id}`);
    setEditMode(true);
    axios
      .get(`http://localhost:9090/api/students/${id}`)
      .then((res) => setCurrentStudent(res.data))
      .then(setShowStudentModal(true));
  };

  useEffect(() => {
    if (showStudentModal === false) {
      fetchStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStudentModal, filter, sort]);

  const onSubmit = async (data) => {
    if (!editMode) {
      await axios
        .post("http://localhost:9090/api/students", data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json",
          },
        })
        .then((res) =>
          console.log(
            `Adding user ${res.data.firstname} no.${res.data.studentId}`
          )
        )
        .catch((err) => console.log(err));
    } else {
      await axios.put(
        `http://localhost:9090/api/students/${currentStudent.studentId}`,
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
    setShowStudentModal(false);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setFilter(e.target.value)
  };

  return (
    <div className="w-3/4 flex flex-col items-center justify-between">
      {isLoading ? (
        <Loader />
      ) : showStudentModal === false ? (
        <div className="w-full flex flex-col justify-between">
          <input
            className="self-end border-2 border-indigo-600 p-2 mt-2"
            type="text"
            placeholder="Поиск.."
            onChange={(e) => searchHandler(e)}
          />
          <table className="text-center border-2 mt-5">
            <thead className="bg-slate-400">
              <tr>
                <th className="cursor-pointer" onClick={() => setSort("firstname")}>Имя</th>
                <th className="cursor-pointer" onClick={() => setSort("patronymic")}>Отчество</th>
                <th className="cursor-pointer" onClick={() => setSort("lastname")}>Фамилия</th>
                <th>Пол</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allStudents.sort((a, b) => a[sort] > b[sort]? 1 : -1).map((student) => {
                return (
                  <tr key={student.studentId}>
                    <td className="border border-slate-300">{student.firstname}</td>
                    <td className="border border-slate-300">{student.patronymic}</td>
                    <td className="border border-slate-300">{student.lastname}</td>
                    <td className="border border-slate-300">{student.gender}</td>
                    <td className="border border-slate-300">
                      <button
                        className="self-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => editStudent(student.studentId)}
                      >
                        Изменить
                      </button>
                      <button
                        className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteStudent(student.studentId)}
                      >
                        Удалить
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
            Добавить ученика
          </button>
        </div>
      ) : (
        <StudentModal onSubmit={onSubmit} data={currentStudent} />
      )}
    </div>
  );
};

export default Students;
