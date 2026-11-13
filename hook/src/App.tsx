import type { User } from "./store/store";

type Props = {
  data?: User[];
  deleteUser?: (id: string) => void;
  editUser?: (user: User) => void;
};

export default function UserList({
  data = [],
  deleteUser,
  editUser,
}: Props) {
  return (
    <div>
      {data.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.age}</p>
          <p>{user.job}</p>

          <button onClick={() => editUser?.(user)}>
            Edit
          </button>

          <button onClick={() => deleteUser?.(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}