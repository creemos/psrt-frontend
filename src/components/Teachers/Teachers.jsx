import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./../Loader/Loader";
import TeacherModal from "./TeacherModal";

const Teachers = () => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("firstname");
  const [currentTeacher, setCurrentTeacher] = useState({
    id: "",
    firstname: "",
    patronymic: "",
    lastname: "",
    gender: "",
    year: "",
    subject: "",
  });

  const filtrateTeachers = async (array) => {
    if (filter !== "") {
      const filtratedTeachers = array.filter((teacher) => {
        return (
          teacher.firstname.toLowerCase().includes(filter.toLowerCase()) ||
          teacher.patronymic.toLowerCase().includes(filter.toLowerCase()) ||
          teacher.lastname.toLowerCase().includes(filter.toLowerCase())
        );
      });
      setAllTeachers(filtratedTeachers);
    } else {
      setAllTeachers(array);
    }
    setIsLoading(false);
  };

  const fetchTeachers = async () => {
    await axios.get("https://psrt-app.herokuapp.com/api/teachers").then((res) => {
      filtrateTeachers(res.data);
    });
  };

  const deleteTeacher = async (id) => {
    setIsLoading(true)
    await axios.put(`https://psrt-app.herokuapp.com/api/classes/find_relation`, id, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      },
    });
    await axios
      .delete(`https://psrt-app.herokuapp.com/api/teachers/${id}`)
      .then((res) => {
        console.log(`User with no.${id} deleted!`);
      });
    fetchTeachers();
  };

  const editTeacher = (id) => {
    console.log(`Select teacher no.${id}`);
    setEditMode(true);
    axios
      .get(`https://psrt-app.herokuapp.com/api/teachers/${id}`)
      .then((res) => setCurrentTeacher(res.data))
      .then(setShowTeacherModal(true));
    fetchTeachers();
  };

  const onSubmit = async (data) => {
    setIsLoading(true)
    if (!editMode) {
      await axios
        .post("https://psrt-app.herokuapp.com/api/teachers", data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json",
          },
        })
        .then((res) =>
          console.log(`Adding user ${res.data.firstname} no.${res.data.id}`)
        )
        .catch((err) => console.log(err));
    } else {
      await axios.put(
        `https://psrt-app.herokuapp.com/api/teachers/${currentTeacher.id}`,
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
    await fetchTeachers()
    setShowTeacherModal(false);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort]);

  return (
    <div className="w-3/4 flex flex-col items-center justify-between  pl-10">
      {isLoading ? (
        <Loader />
      ) : showTeacherModal === false ? (
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
                <th
                  className="cursor-pointer"
                  onClick={() => setSort("firstname")}
                >
                  Имя
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => setSort("patronymic")}
                >
                  Отчество
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => setSort("lastname")}
                >
                  Фамилия
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => setSort("gender")}
                >
                  Пол
                </th>
                <th className="cursor-pointer" onClick={() => setSort("year")}>
                  Год рождения
                </th>
                <th>Предмет</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allTeachers
                .sort((a, b) => (a[sort] > b[sort] ? 1 : -1))
                .map((teacher) => {
                  return (
                    <tr key={teacher.id}>
                      <td className="border border-slate-300">
                        {teacher.firstname}
                      </td>
                      <td className="border border-slate-300">
                        {teacher.patronymic}
                      </td>
                      <td className="border border-slate-300">
                        {teacher.lastname}
                      </td>
                      <td className="border border-slate-300">
                        {teacher.gender}
                      </td>
                      <td className="border border-slate-300">
                        {teacher.year}
                      </td>
                      <td className="border border-slate-300">
                        {teacher.subject}
                      </td>
                      <td className="border border-slate-300">
                        <button
                          className="self-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => editTeacher(teacher.id)}
                        >
                          Изменить
                        </button>
                        <button
                          className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => deleteTeacher(teacher.id)}
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
            onClick={() => setShowTeacherModal(true)}
            className="self-center mt-5 w-1/2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Добавить учителя
          </button>
        </div>
      ) : (
        <TeacherModal onSubmit={onSubmit} data={currentTeacher} toBack={setShowTeacherModal} />
      )}
    </div>
  );
};

export default Teachers;
