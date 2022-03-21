import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const ChangeStudentsModal = ({ data, setShowChangeStudentsModal }) => {
  const [availableStudents, setAvailableStudents] = useState([]);
  const [schoolClassStudents, setSchoolClassStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateFrames = async () => {
    setIsLoading(true)
    await axios
      .get(`https://psrt-app.herokuapp.com/api/classes/${data.id}`)
      .then((res) => setSchoolClassStudents(res.data.students));
    await axios
      .get(`https://psrt-app.herokuapp.com/api/students/available_students`)
      .then((res) => setAvailableStudents(res.data))
    setIsLoading(false)
  };

  const addToSchoolClass = async (student) => {
    await axios.put(
      `https://psrt-app.herokuapp.com/api/classes/${data.id}/addstudent`,
      student,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        },
      }
    );
    await updateFrames();
  };

  const removeFromSchoolClass = async (student) => {
    const updatedStudents = schoolClassStudents.filter(
      (item) => item === student
    );
    await axios.put(
      `https://psrt-app.herokuapp.com/api/classes/${data.id}/deletestudent`,
      updatedStudents,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        },
      }
    );
    await updateFrames();
  };

useEffect(() => {
  updateFrames()
}, [])


  return (
    <div className="w-full flex justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex w-full justify-around">
          <div className="border-2 border-indigo-600 w-1/3 p-5">
            {availableStudents.length > 0 ? (
              availableStudents.map((student) => {
                return (
                  <div
                    key={student.studentId}
                    className="flex justify-between p-1 align-center"
                  >
                    <div>
                      {student.firstname} {student.patronymic}{" "}
                      {student.lastname} {student.gender}
                    </div>
                    <button
                      className="self-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => addToSchoolClass(student)}
                    >
                      +
                    </button>
                  </div>
                );
              })
            ) : (
              <div>Нет доступных учеников!</div>
            )}
          </div>
          <div className="border-2 border-indigo-600 w-1/3 p-5">
            {schoolClassStudents.length > 0 ? (
              schoolClassStudents.map((student) => {
                return (
                  <div
                    key={student.studentId}
                    className="flex justify-between p-1 align-center"
                  >
                    <div>
                      {student.firstname} {student.patronymic}{" "}
                      {student.lastname} {student.gender}
                    </div>
                    <button
                      className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => removeFromSchoolClass(student)}
                    >
                      Удалить
                    </button>
                  </div>
                );
              })
            ) : (
              <div>В классе нет учеников!</div>
            )}
          </div>
          <button
            className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => setShowChangeStudentsModal(false)}
          >
            Вернуться
          </button>
        </div>
      )}
    </div>
  );
};

export default ChangeStudentsModal;
