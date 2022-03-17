import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";

const ChangeTeacherModal = ({ onSubmit, data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allTeachers, setAllTeachers] = useState([]);
  const [allClassesWithTeacher, setAllClassesWithTeacher] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const { register, handleSubmit } = useForm();

  const fetchData = async () => {
    await axios
      .get("http://localhost:9090/api/teachers")
      .then((res) => setAllTeachers(res.data));
    await axios
      .get("http://localhost:9090/api/classes/with_teachers")
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
  };

  useEffect(() => {
    if (availableTeachers !== []) {
      fetchData();
    }
    return null
    
  }, [availableTeachers]);

  return isLoading ? (
    <Loader />
  ) : (
    <form className="mt-5 border-1" onSubmit={handleSubmit(onSubmit)}>
      <div>Выберите учителя</div>
      <select {...register("teacher")} placeholder="Выберите учителя">
        <option value={{}} className="border-2">
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
      <input
        className="mt-5 w-1/2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      />
    </form>
  );
};

export default ChangeTeacherModal;
