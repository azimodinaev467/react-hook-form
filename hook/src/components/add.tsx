import { useForm } from "react-hook-form";
import axios from "axios";
import { api, type FormData } from "../store/store";

type Props = {
  getData: () => void;
};

export default function AddUser({ getData }: Props) {
  const {
    handleSubmit,
    reset,
  } 

  async function addUser(form: FormData) {
    await axios.post(api, form);
    reset();
    getData();
  }

  return (
    <form onSubmit={handleSubmit(addUser)}>
      <input placeholder="Name" {...register("name", { required: true })} />

      <input
        type="number"
        placeholder="Age"
        {...register("age", { valueAsNumber: true, required: true })}
      />

      <input placeholder="Job" {...register("job", { required: true })} />

      <button type="submit">Add User</button>
    </form>
  );
}