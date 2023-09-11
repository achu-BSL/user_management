import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Unauthorized } from "../components/Unauthorized";
import { styles } from "../styles";
import logo from "../assets/react.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../utils/valiidator";
import { User, addUser, removeUser } from "../app/features/user/userSlice";
import { useAppDispatch } from "../hooks/hooks";
import { addMessage } from "../app/features/message/messageSlice";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { baseUrl } from "../common/common";
import { setIsLoading } from "../app/features/isLoading/isLoadingSlice";

export const Profile: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const isLoading = useSelector((state: RootState) => state.isLoading);
  const profileInp = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(userSchema) });
  const dispatch = useAppDispatch();

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

  const submitForm = async (data: User) => {
    const formData = new FormData();
    if (data.email !== user?.email && data.email != null) {
      formData.append("email", data.email);
    }

    if (data.username !== user?.username && data.username != null) {
      formData.append("username", data.username);
    }

    if(avatar !== null) {
      formData.append("profile", avatar);
    }

    if (formData.keys().next().done) {
      dispatch(
        addMessage({
          id: Date.now().toString(),
          message: "No Changes",
          isError: true,
        })
      );
      return;
    }
    try {
      dispatch(setIsLoading(true));
      const res: AxiosResponse<User> = await axios.patch(
        `${baseUrl}/profile/update`,
        formData,
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      dispatch(
        addMessage({
          id: Date.now().toString(),
          message: "Profile updated successfully",
          isError: false,
        })
      );
      setIsEditMode(_prev => false);
    } catch (err) {
      let error = "OOPS something wrong";
      if (isAxiosError(err)) {
        if (err.response?.status === 400) {
          error = "Email or Username Already taken";
        } else if (err.response?.status === 403) {
          error = "Authorization faild.";
          dispatch(removeUser());
        }
      }

      dispatch(
        addMessage({
          id: Date.now().toString(),
          message: error,
          isError: true,
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleProfileInp = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file) {
        setAvatar((prev) => file);
      }
    }
  };

  if (user === null) {
    return <Unauthorized />;
  }

  console.log("rendering");

  return (
    <div className="w-full h-screen flex justify-center items-center bg-violet-100">
      <div className="max-w-[400px] max-h-[600px] bg-primary rounded-md shadow-md">
        <form
          className="h-full flex flex-col justify-between sm:px-16 px-6 sm:py-10 py-6 gap-5"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex justify-center">
            <img
              className="sm:h-[150px] sm:w-[150px] h-[100px] w-[100px] object-cover rounded-full border-2"
              src={avatar ? URL.createObjectURL(avatar) : user.profile ? `${baseUrl}/${user.profile}` : logo}
              alt=""
              onClick={() => {
                isEditMode ? profileInp.current!.click() : "";
              }}
            />
            <input
              onChange={handleProfileInp}
              ref={profileInp}
              type="file"
              name="profile"
              id="profile"
              hidden
            />
          </div>

          <div className="flex-1 flex flex-col gap-2 ">
            <div className="flex flex-col gap-1">
              <label
                className="font-poppins font-semibold sm:text-md text-white"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={`${styles.inputStyle} focus:border-b-green-500 ${styles.disableInp}`}
                defaultValue={user.username || ""}
                type="text"
                id="username"
                disabled={!isEditMode}
                {...register("username")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-poppins font-semibold sm:text-md text-white"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className={`${styles.inputStyle} focus:border-b-green-500 ${styles.disableInp}`}
                defaultValue={user.email || ""}
                type="text"
                id="email"
                disabled={!isEditMode}
                {...register("email")}
              />
            </div>
          </div>
          {isEditMode ? (
            <div className="flex flex-col">
              <button
                disabled={isLoading}
                className="font-poppins font-semibold bg-secondary text-white rounded-md sm:py-2 py-1 sm:mt-10 mt-6 disabled:bg-opacity-50"
              >
                {isLoading ? "Updating..." : "save"}
              </button>
              <button
                onClick={() => setIsEditMode((prev) => false)}
                type="button"
                className="font-poppins font-semibold bg-secondary text-white rounded-md sm:py-2 py-1 sm:mt-4 mt-2"
              >
                cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditMode((prev) => true)}
              type="button"
              className="font-poppins font-semibold bg-secondary text-white rounded-md sm:py-2 py-1 sm:mt-10 mt-6"
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
