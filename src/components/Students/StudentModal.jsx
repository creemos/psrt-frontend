import { useForm } from "react-hook-form";

const StudentModal = ({ onSubmit, data, toBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: data
  });


  return (
    <form className="mt-5 border-2 flex flex-col w-1/2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <input
          placeholder="Имя"
          {...register("firstname", {
            required: true,
            pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/i,
          })}
          className="m-2 p-2 border border-1"
        />
        {errors.firstname && <span className="text-rose-500">Имя должно содержать только буквы!</span>}
      </div>
      <div className="flex flex-col">
        <input
          placeholder="Отчество"
          {...register("patronymic", {
            required: true,
            pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/i,
          })}
          className="m-2 p-2 border border-1"
        />
        {errors.patronymic && (
          <span className="text-rose-500">Отчество должно содержать только буквы!</span>
        )}
      </div>
      <div className="flex flex-col">
        <input
          placeholder="Фамилия"
          {...register("lastname", { required: true, pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/i })}
          className="m-2 p-2 border border-1"
        />
        {errors.lastname && <span className="text-rose-500">Фамилия должна содержать только буквы!</span>}
      </div>

      <select {...register("gender")} placeholder="Пол" className="mt-5 w-1/6 self-center p-2">
        <option disabled value="">Пол</option>
        <option value="жен.">жен.</option>
        <option value="муж.">муж.</option>
      </select>
      <div className="mt-5 flex justify-around">
        <input
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        value="Сохранить"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => toBack(false)}
      >
        Назад
      </button>
      </div>
      
    </form>
  );
};

export default StudentModal;
