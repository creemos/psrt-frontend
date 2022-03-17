import { useForm } from "react-hook-form";

const SchoolClassModal = ({ onSubmit, data }) => {
  const { register, handleSubmit } = useForm();

  

  return (
    <form className="mt-5 border-1" onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder={data.year ? data.year : "Год обучения"}
        {...register("year", { required: true })}
        className="m-5 p-2 border border-1"
      />
      <input
        placeholder={data.code ? data.code : "Мнемокод"}
        {...register("code", { required: true })}
        className="m-5 p-2 border border-1"
      />
      
      <input
        className="mt-5 w-1/2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      />
    </form>
  );
};

export default SchoolClassModal;
