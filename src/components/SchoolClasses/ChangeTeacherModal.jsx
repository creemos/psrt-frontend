import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";

const ChangeTeacherModal = ({ onSubmit, data, toBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allTeachers, setAllTeachers] = useState([]);
  const [allClassesWithTeacher, setAllClassesWithTeacher] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { register, handleSubmit } = useForm();

  const fetchData = async () => {
    await axios
      .get("https://psrt-app.herokuapp.com/api/teachers")
      .then((res) => setAllTeachers(res.data));
    await axios
      .get("https://psrt-app.herokuapp.com/api/classes/with_teachers")
      .then((res) => setAllClassesWithTeacher(res.data))
      .then(() => {
        const newArr = [];
        allClassesWithTeacher.map((x) => newArr.push(x.teacher));
        const result = allTeachers.filter(
          ({ id: item1 }) => !newArr.some(({ id: item2 }) => item1 === item2)
        );
        setAvailableTeachers(result);
      });
    setIsLoading(false);
    setDataLoaded(true);
  };

  useEffect(() => {
    fetchData();
    return null;
  }, [availableTeachers]);

  return isLoading ? (
    <Loader />
  ) : (
    <form className="mt-5 border-1" onSubmit={handleSubmit(onSubmit)}>
      {data.teacher ? (
        <div className="mb-5">
          Текущий учитель:
          <p className="text-xl font-bold">
            {data.teacher.firstname} {data.teacher.patronymic}{" "}
            {data.teacher.lastname}
          </p>
        </div>
      ) : null}
      <div>Выберите учителя:</div>
      <select
        {...register("teacher")}
        placeholder="Выберите учителя"
        className="py-2 px-4 w-full mt-3"
      >
        <option value={"empty"} className="border-2">
          Отсутствует
        </option>
        {availableTeachers.map((teacher) => {
          return (
            <option
              key={teacher.id}
              value={JSON.stringify(teacher)}
              className="border-2"
            >
              {teacher.firstname} {teacher.patronymic} {teacher.lastname}
            </option>
          );
        })}
      </select>
      <div className="w-full flex justify-around">
        <input
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          value="Сохранить"
        />
        <button
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => toBack(false)}
        >
          Вернуться
        </button>
      </div>
    </form>
  );
};

export default ChangeTeacherModal;
