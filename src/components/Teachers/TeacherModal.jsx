import { useForm } from "react-hook-form";

const TeacherModal = ({ onSubmit, data, toBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });
  return (
    <form
      className="mt-5 ml-10 border-1 flex flex-col items-center w-1/2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <input
            name="firstname"
            placeholder={"Имя"}
            {...register("firstname", {
              required: true,
              pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/i,
            })}
            className="mb-2 p-2 border border-1"
          />
          {errors.firstname && (
            <span className="text-rose-500 mb-2">
              Имя должно содержать только буквы!
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            placeholder={"Отчество"}
            {...register("patronymic", {
              required: true,
              pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/i,
            })}
            className="mb-2 p-2 border border-1"
          />
          {errors.patronymic && (
            <span className="text-rose-500 mb-2">
              Отчество должно содержать только буквы!
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            placeholder={"Фамилия"}
            {...register("lastname", {
              required: true,
              pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/i,
            })}
            className="mb-2 p-2 border border-1"
          />
          {errors.lastname && (
            <span className="text-rose-500 mb-2">
              Фамилия должна содержать только буквы!
            </span>
          )}
        </div>
        <select {...register("gender")} placeholder="Пол" className="mt-5 p-2">
          <option disabled value="">
            Пол
          </option>
          <option value="жен.">жен.</option>
          <option value="муж.">муж.</option>
        </select>
        <input
          placeholder={"Год рождения"}
          {...register("year", { required: true, pattern: /^[0-9]+$/i })}
          className="mt-5 mb-2 p-2 border border-1"
        />
        {errors.year && (
          <span className="text-rose-500 mb-2">
            Год рождения не может содержать буквы!
          </span>
        )}
        <select {...register("subject")} placeholder="Предмет" className="mb-5 p-2">
          <option disabled value="">
            Предмет
          </option>
          <option value="Русский язык">Русский язык</option>
          <option value="Математика">Математика</option>
          <option value="Литература">Литература</option>
          <option value="Химия">Химия</option>
          <option value="Физика">Физика</option>
        </select>
        <div className="flex flex-row justify-around w-full">
          <input
            className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            value="Сохранить"
          />
          <button
            className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => toBack(false)}
          >
            Назад
          </button>
        </div>
      </div>
    </form>
  );
};

export default TeacherModal;
