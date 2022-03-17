import { useForm } from "react-hook-form";

const StudentModal = ({onSubmit, data}) => {
  
  const { register, handleSubmit } = useForm();
  return (
    <form className="mt-5 border-1" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder={data.firstname?data.firstname:"Имя"} {...register("firstname", { required: true })} className="m-5 p-2 border border-1" />
      <input placeholder={data.patronymic?data.patronymic:"Отчество"} {...register("patronymic", { required: true })} className="m-5 p-2 border border-1" />
      <input placeholder={data.lastname?data.lastname:"Фамилия"} {...register("lastname", { required: true })} className="m-5 p-2 border border-1" />
      <select {...register("gender")} placeholder="Пол">
        <option value="жен.">жен.</option>
        <option value="муж.">муж.</option>
      </select>
      <input className="mt-5 w-1/2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
    </form>
  );
};

export default StudentModal