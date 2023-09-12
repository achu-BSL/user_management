import { FC, useEffect, useState } from "react";
import { User } from "../app/features/user/userSlice";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../utils/valiidator";
import { addMessage } from "../app/features/message/messageSlice";
import { useDispatch } from "react-redux";

export const Dashboard: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUserId, setEditUserId] = useState<null | number>(null);
  const [editUserData, setEditUserData] = useState<User | null>(null);
  const [searchQuery, setSerchQuery] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(userSchema) });
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res: AxiosResponse<User[]> = await axios.get(
        `http://localhost:3000/admin/users?q=${searchQuery}`
      );
      setUsers((prev) => res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    if (errors.email?.message) {
      dispatch(
        addMessage({
          id: Date.now().toString(),
          message: errors.email.message,
          isError: true,
        })
      );
    } else if (errors.username?.message) {
      dispatch(
        addMessage({
          id: Date.now().toString(),
          message: errors.username?.message,
          isError: true,
        })
      );
    }
  }, [errors]);

  const updateUser = async (data: Partial<User>) => {
    if (Object.entries(data).length === 0) {
      return null;
    }
    try {
      const res: AxiosResponse<User> = await axios.patch(
        `http://localhost:3000/admin/user/update/${editUserId}`,
        data
      );
      dispatch(
        addMessage({
          id: Date.now().toString(),
          message: "Updated successfully",
          isError: false,
        })
      );
      return res.data;
    } catch (err) {
      let message = "OPPS Something wrong";

      if (isAxiosError(err)) {
        if (err.response?.status === 400) {
          message = "Email or username is already taken";
        }
      }
      dispatch(
        addMessage({ id: Date.now().toString(), message, isError: true })
      );
      return null;
    }
  };

  const submitData = async () => {
    const body: Partial<User> = {};
    const currUser = users.find((user) => user.id === editUserData?.id);
    if (currUser != null) {
      if (currUser.email !== editUserData?.email) {
        body.email = editUserData?.email;
      }

      if (currUser.username !== editUserData?.username) {
        body.username = editUserData?.username;
      }

      const updatedUser = await updateUser(body);
      if (updatedUser !== null) {
        setUsers((prev) =>
          prev.map((user) => {
            if (currUser.id === user.id) {
              return updatedUser;
            } else {
              return user;
            }
          })
        );
      }
    }

    setEditUserData(null);
    setEditUserId(null);
  };

  const removeButtonHandler = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/admin/user/delete/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      dispatch(
        addMessage({
          id: Date.now().toString(),
          message: "Deleted user successfully",
          isError: false,
        })
      );
    } catch (err) {
      dispatch(
        addMessage({
          id: Date.now().toString(),
          message: "OOPS something wrong",
          isError: true,
        })
      );
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg max-w-4xl mx-auto">
        <input
          onChange={(e) => {
            const value = e.currentTarget.value;
            setSerchQuery(() => value)
        }}
          className="min-w-full py-2 px-4 border-2 focus:border-slate-900"
          type="text"
          placeholder="Search by username or email"
        />
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3">#id</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 && (
              <>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">#{user.id}</td>
                    <td className="px-6 py-4">
                      {user.id === editUserId ? (
                        <input
                          className="px-2 w-full"
                          value={editUserData?.username || ""}
                          type="text"
                          id="username"
                          {...register("username")}
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            setEditUserData((prev) => {
                              if (prev !== null) {
                                return { ...prev, username: value };
                              } else return prev;
                            });
                          }}
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {user.id === editUserId ? (
                        <input
                          className="px-2 w-full"
                          value={editUserData?.email || ""}
                          type="text"
                          id="email"
                          {...register("email")}
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            setEditUserData((prev) => {
                              if (prev !== null) {
                                return { ...prev, email: value };
                              } else return prev;
                            });
                          }}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {user.id === editUserId ? (
                        <>
                          <button
                            onClick={handleSubmit(submitData)}
                            className="text-blue-600 hover:underline mr-2"
                          >
                            save
                          </button>
                          <button
                            onClick={() => {
                              setEditUserId(null);
                              setEditUserData(null);
                            }}
                            className="text-red-600 hover:underline"
                          >
                            cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditUserData((_prev) => user);
                              setEditUserId((_prev) => user.id || null);
                            }}
                            className="text-blue-600 hover:underline mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeButtonHandler(user.id || 0)}
                            className="text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
