import { FC, useEffect } from "react";
import { styles } from "../styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/valiidator";
import { LoginFormData } from "../interfaces/zod.interface";
import { useAppDispatch } from "../hooks/hooks";
import { addMessage } from "../app/features/message/messageSlice";

export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const dispatch = useAppDispatch();

  const submitData = (data: LoginFormData) => {
    console.log(data);
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
              type="text"
              id="password"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col gap-2 justify-center sm:pt-12 pt-6 ">
            <button className="border-2 border-slate-900 bg-primary rounded-md shadow-sm sm:py-2 py-1 text-white font-poppins">
              Login
            </button>
            <p className="font-poppins">Dont' have account ?</p>
          </div>
        </form>
      </div>
    </main>
  );
};
