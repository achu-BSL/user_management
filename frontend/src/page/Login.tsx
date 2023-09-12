import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/valiidator";
import { LoginFormData } from "../interfaces/zod.interface";
import { useAppDispatch } from "../hooks/hooks";
import { addMessage } from "../app/features/message/messageSlice";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { baseUrl } from "../common/common";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setIsLoading } from "../app/features/isLoading/isLoadingSlice";
import { User, addUser } from "../app/features/user/userSlice";
import { styles } from "../styles";

export const Login: FC = () => {
  const navigator = useNavigate();
  const isLoading = useSelector((state: RootState) => state.isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const dispatch = useAppDispatch();

  const submitData = async (data: LoginFormData) => {
    try {
      dispatch(setIsLoading(true));
      const res: AxiosResponse<User> = await axios.post(`${baseUrl}/login`, {
        email: data.email,
        password: data.password
      }, {
        withCredentials: true
      })
      dispatch(addMessage({id: Date.now().toString(), message: "Login successfully", isError: false}));
      dispatch(addUser(res.data));
      navigator("/");
    } catch (err) {
      let error = "OOPS Something wrong";
      if(isAxiosError(err)) {
        if(err.response?.status === 400) {
          error = 'Incorrect Email or Password';
        }
      }
      dispatch(addMessage({id: Date.now().toString(), message: error, isError: true}))
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (errors.email?.message) {
      dispatch(
        addMessage({
          id: Date.now().toString(),
          message: errors.email.message,
          isError: true,
        })
      );
    } else if (errors.password?.message) {
      dispatch(
        addMessage({
          id: Date.now().toString(),
          message: errors.password?.message,
          isError: true,
        })
      );
    }
  }, [errors]);

  return (
    <main className="flex justify-center items-center h-screen min-h-[580px] bg-violet-200 bg-opacity-60">
      <div className="flex flex-col sm:px-14 px-6 sm:py-8 py-4 bg-secondary bg-opacity-10  rounded-md shadow-lg">
        <h1 className="text-center font-semibold sm:text-xl text-lg sm:my-4 my-2 font-poppins">
          Hi, Welcome back.
        </h1>
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex flex-col sm:gap-2 gap-1"
          action=""
        >
          <div className="flex flex-col">
            <label className="font-poppins font-medium" htmlFor="email">
              Email
            </label>
            <input
              className={`${styles.inputStyle} ${
                errors.email ? "border-b-2 border-b-red-600" : ""
              }`}
              type="text"
              id="email"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-poppins font-medium" htmlFor="password">
              Password
            </label>
            <input
              className={`${styles.inputStyle} ${
                errors.password ? "border-b-2 border-b-red-600" : ""
              }`}
              type="password"
              id="password"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col gap-2 justify-center sm:pt-12 pt-6 ">
            <button className="border-2 border-slate-900 bg-primary rounded-md shadow-sm sm:py-2 py-1 text-white font-poppins disabled:bg-opacity-50" disabled={isLoading}>
              {isLoading ? "Checking...": "Login"}
            </button>
            <Link to="/register" className="font-poppins">Dont' have account ?</Link>
          </div>
        </form>
      </div>
    </main>
  );
};
