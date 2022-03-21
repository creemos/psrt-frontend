import { useForm } from "react-hook-form";

const SchoolClassModal = ({ onSubmit, data, toBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {year: data.year, code: data.code}
  });

  return (
    <form
      className="mt-5 border-1 flex flex-col w-1/2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder={"Год обучения"}
        {...register("year", { required: true, pattern: /^[0-9]+$/i })}
        className="mb-5 p-2 border border-1"
      />
      {errors.year && (
        <span className="text-rose-500">
          Год обучения должен состать из цифр!
        </span>
      )}
      <input
        placeholder={"Мнемокод"}
        {...register("code", { required: true, pattern: /^[A-Za-zА-Яа-я]+$/i })}
        className="mb-5 p-2 border border-1"
      />
      {errors.code && (
        <span className="text-rose-500">Мнемокод должен состоять из букв!</span>
      )}
      <div className="flex justify-around">
        <input
          className="w-1/2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          value="Сохранить"
        />
        <button
          className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => toBack(false)}
        >
          Назад
        </button>
      </div>
    </form>
  );
};

export default SchoolClassModal;
