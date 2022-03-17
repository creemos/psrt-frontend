import { useState, useEffect } from "react";
import axios from "axios";

const ChangeStudentsModal = ({ data, setShowChangeStudentsModal }) => {
  const [availableStudents, setAvailableStudents] = useState([]);
  const [schoolClassStudents, setSchoolClassStudents] = useState([]);

  const updateFrames = async () => {
    await axios
      .get(`http://localhost:9090/api/classes/${data.id}`)
      .then((res) => setSchoolClassStudents(res.data.students));
    await axios
      .get(`http://localhost:9090/api/students/available_students`)
      .then((res) => setAvailableStudents(res.data));
  };

  const addToSchoolClass = async (student) => {
    await axios.put(
      `http://localhost:9090/api/classes/${data.id}/addstudent`,
      student,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        },
      }
    );
    updateFrames();
  };

  const removeFromSchoolClass = async (student) => {
    const updatedStudents = schoolClassStudents.filter(item => item === student)
    console.log(updatedStudents)
    
    await axios.put(
      `http://localhost:9090/api/classes/${data.id}/deletestudent`,
      updatedStudents,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        },
      }
    );
    updateFrames();
  }

  useEffect(() => {
    updateFrames();
  }, []);

  return (
    <div className="flex w-full justify-around">
      <div className="border-2 border-indigo-600 w-1/3 p-5">
        {availableStudents.length > 0 ? (
          availableStudents.map((student) => {
            return (
              <div key={student.studentId} className="flex justify-between p-1 align-center">
                <div>
                  {student.firstname} {student.patronymic} {student.lastname} {" "}
                  {student.gender}
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
              <div key={student.studentId} className="flex justify-between p-1 align-center">
                <div>
                  {student.firstname} {student.patronymic} {student.lastname} {" "}
                  {student.gender}
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
      <button className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => setShowChangeStudentsModal(false)}>Вернуться</button>
      
    </div>
  );
};

export default ChangeStudentsModal;
