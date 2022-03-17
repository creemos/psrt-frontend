import { useForm } from "react-hook-form";

const TeacherModal = ({ onSubmit, data }) => {
  const { register, handleSubmit } = useForm();
  return (
    <form className="mt-5 ml-10 border-1 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
      <div className="ml-10 flex justify-between">
        <input
          name="firstname"
          placeholder={data.firstname ? data.firstname : "Имя"}
          {...register("firstname", { required: true })}
          className="m-5 p-2 border border-1"
        />
        <input
          placeholder={data.patronymic ? data.patronymic : "Отчество"}
          {...register("patronymic", { required: true })}
          className="m-5 p-2 border border-1"
        />
        <input
          placeholder={data.lastname ? data.lastname : "Фамилия"}
          {...register("lastname", { required: true })}
          className="m-5 p-2 border border-1"
        />
        <select {...register("gender")} placeholder="Пол">
          <option value="жен.">жен.</option>
          <option value="муж.">муж.</option>
        </select>
        <input
          placeholder={data.year ? data.year : "Год рождения"}
          {...register("year", { required: true })}
          className="m-5 p-2 border border-1"
        />
        <select {...register("subject")} placeholder="Предмет">
          <option value="Русский язык">Русский язык</option>
          <option value="Математика">Математика</option>
          <option value="Литература">Литература</option>
          <option value="Химия">Химия</option>
          <option value="Физика">Физика</option>
        </select>
      </div>

      <input
        className="mt-5 ml-20 w-1/2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      />
    </form>
  );
};

export default TeacherModal;
