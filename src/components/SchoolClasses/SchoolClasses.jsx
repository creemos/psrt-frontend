import { useState, useEffect } from "react";
import Loader from "./../Loader/Loader";
import axios from "axios";
import SchoolClassModal from "./SchoolClassModal";
import ChangeTeacherModal from "./ChangeTeacherModal";
import ChangeStudentsModal from "./ChangeStudentsModal";

const SchoolClasses = () => {
  const [allSchoolClasses, setAllSchoolClasses] = useState([]);
  const [isShowSchoolClassModal, setIsShowSchoolClassModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showChangeTeacherModal, setShowChangeTeacherModal] = useState(false);
  const [showChangeStudentsModal, setShowChangeStudentsModal] = useState(false);
  const [sort, setSort] = useState("year")
  const [currentSchoolClass, setCurrentSchoolClass] = useState({
    id: "",
    code: "",
    year: "",
    students: [],
    teacher: {},
  });

  const fetchAllSchoolClasses = async () => {
    await axios
      .get("http://localhost:9090/api/classes")
      .then((res) => setAllSchoolClasses(res.data))
      setIsLoading(false);
  };


  const editSchoolClass = (id) => {
    console.log(`Select class no.${id}`);
    setIsLoading(true);
    setEditMode(true);

    axios
      .get(`http://localhost:9090/api/classes/${id}`)
      .then((res) => setCurrentSchoolClass(res.data))
      .then(console.log(currentSchoolClass))
      .then(setIsShowSchoolClassModal(true));
  };

  const deleteSchoolClass = async (id) => {
    setIsLoading(true);
    
    await axios.delete(`http://localhost:9090/api/classes/${id}`);

    console.log(`Class with no.${id} deleted!`);
    await fetchAllSchoolClasses();
    setIsLoading(false);
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (!editMode) {
      await axios
        .post("http://localhost:9090/api/classes", data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json",
          },
        })
        .then((res) =>
          console.log(
            `Adding class ${res.data.year}${res.data.code} with id.${res.data.id}`
          )
        )
        .catch((err) => console.log(err));
    } else {
      await axios.put(
        `http://localhost:9090/api/classes/${currentSchoolClass.id}`,
        { ...data, teacher: currentSchoolClass.teacher },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json",
          },
        }
      );
      setEditMode(false);
    }
    setIsShowSchoolClassModal(false);
  };

  const onChangeTeacher = async (data) => {
    await axios
      .put(
        `http://localhost:9090/api/classes/${currentSchoolClass.id}/addteacher`,
        data.teacher,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json",
          },
        }
      )
      .catch(function (error) {
        alert("Данный преподаватель уже назначен классным руководителем!");
      });
    setShowChangeTeacherModal(false);
    fetchAllSchoolClasses();
  };

  const editTeacher = (classId) => {
    axios
      .get(`http://localhost:9090/api/classes/${classId}`)
      .then((res) => setCurrentSchoolClass(res.data))
      .then(setShowChangeTeacherModal(true));
  };

  const editStudents = (schoolClass) => {
    setCurrentSchoolClass(schoolClass);
    setShowChangeStudentsModal(true);
  };

  
  useEffect(() => {
    setIsLoading(true)
    fetchAllSchoolClasses();
  }, []);

  useEffect(() => {
    setIsLoading(true)
    fetchAllSchoolClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showChangeStudentsModal, showChangeTeacherModal, isShowSchoolClassModal]);

  useEffect(() => {
    if (currentSchoolClass !== 1 && isShowSchoolClassModal === true) {
      setIsLoading(false);
    }
  }, [currentSchoolClass, isShowSchoolClassModal]);

  return (
    <div className="w-3/4 flex flex-col items-center justify-between">
      {isLoading ? (
        <Loader />
      ) : isShowSchoolClassModal ? (
        <SchoolClassModal onSubmit={onSubmit} data={currentSchoolClass}/>
      ) : showChangeTeacherModal ? (
        <ChangeTeacherModal
          onSubmit={onChangeTeacher}
          data={currentSchoolClass}
        />
      ) : showChangeStudentsModal ? (
        <ChangeStudentsModal data={currentSchoolClass} setShowChangeStudentsModal={setShowChangeStudentsModal}/>
      ) : (
        <div className="w-full flex flex-col align-center justify-center">
          <table className="text-center border-2 mt-5 w-full">
            <thead className="bg-slate-400">
              <tr>
                <th className="cursor-pointer" onClick={() => setSort("year")}>Год обучения</th>
                <th className="cursor-pointer" onClick={() => setSort("code")}>Мнемокод</th>
                <th className=" w-1/4">Классный руководитель</th>
                <th className=" w-1/4">Список учеников</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allSchoolClasses.sort((a, b) => a[sort] > b[sort]? 1 : -1).map((schoolClass) => {
                return (
                  <tr key={Math.random(10)}>
                    <td className="border border-slate-300">{schoolClass.year}</td>
                    <td className="border border-slate-300">{schoolClass.code}</td>
                    <td className="mt-auto mb-0 border border-slate-300">
                      <div className="flex justify-center flex-col p-3">
                        {schoolClass.teacher ? (
                          `${schoolClass.teacher.firstname} ${schoolClass.teacher.patronymic} ${schoolClass.teacher.lastname}`
                        ) : null} 
                          <button
                            className="self-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mt-5"
                            onClick={() => editTeacher(schoolClass.id)}
                          >
                            Редактировать
                          </button>
                      </div>
                    </td>
                    <td className="border border-slate-300 pb-3">
                      <ul>
                        {schoolClass.students.map((student) => {
                          return (
                            <li  key={Math.random(10)} className="m-2 border border-slate-300">
                              {`${student.firstname} ${student.patronymic} ${student.lastname}`}
                            </li>
                          );
                        })}
                        <button
                          className="self-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mt-3"
                          onClick={() => editStudents(schoolClass)}
                        >
                          Редактировать
                        </button>
                      </ul>
                    </td>
                    <td className="border border-slate-300">
                      <button
                        className="self-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          editSchoolClass(schoolClass.id);
                        }}
                      >
                        Изменить
                      </button>
                      <button
                        className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          deleteSchoolClass(schoolClass.id);
                        }}
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
            onClick={() => setIsShowSchoolClassModal(true)}
            className="self-end mt-5 w-1/6  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Добавить класс
          </button>
        </div>
      )}
    </div>
  );
};

export default SchoolClasses;
