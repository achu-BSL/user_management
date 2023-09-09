import { FC, useEffect } from "react";
import { styles } from "../styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData } from "../interfaces/zod.interface";
import { registerSchema } from "../utils/valiidator";
import { useAppDispatch } from "../hooks/hooks";
import {
  MessageInterface,
  addMessage,
} from "../app/features/message/messageSlice";
import axios from "axios";
import { baseUrl } from "../common/common";

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const addMessageDispatch = (msg: MessageInterface) => {
    dispatch(addMessage(msg));
  };

  useEffect(() => {
    if (errors.email?.message) {
      addMessageDispatch({
        id: Date.now().toString(),
        message: errors.email.message,
        isError: true,
      });
    } else if (errors.password?.message) {
      addMessageDispatch({
        id: Date.now().toString(),
        message: errors.password.message,
        isError: true,
      });
    } else if (errors.confrimPassword?.message) {
      addMessageDispatch({
        id: Date.now().toString(),
        message: errors.confrimPassword.message,
        isError: true,
      });
    }
  }, [errors]);

  const submitData = async (data: RegisterFormData) => {
    const res = await axios.post(`${baseUrl}/register`, {
      email: data.email,
      password: data.password
    });
    console.log(res.data);
    if(res.data) {
      addMessageDispatch({id: Date.now().toString(), message: "Register successfylly", isError: false})
    } else if (res.status === 400) {
      addMessageDispatch({id: Date.now().toString(), message: "Email already taken", isError: true})
    }
  };

  return (
    <main className="flex justify-center items-center h-screen min-h-[580px] bg-violet-200 bg-opacity-60">
      <div className="flex flex-col sm:px-14 px-6 sm:py-8 py-4 bg-secondary bg-opacity-10  rounded-md shadow-lg">
        <h1 className="text-center font-semibold sm:text-xl text-lg sm:my-4 my-2 font-poppins">
          Hi, Join with us.
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
          <div className="flex flex-col">
            <label
              className="font-poppins font-medium"
              htmlFor="confirmPassword"
            >
              Confirm-Password
            </label>
            <input
              className={`${styles.inputStyle} ${
                errors.confrimPassword ? "border-b-2 border-b-red-600" : ""
              }`}
              type="text"
              id="confirmPassword"
              {...register("confrimPassword")}
            />
          </div>
          <div className="flex flex-col gap-2 justify-center sm:pt-12 pt-6 ">
            <button className="border-2 border-slate-900 bg-primary rounded-md shadow-sm sm:py-2 py-1 text-white font-poppins">
              Register
            </button>
            <p className="font-poppins">Already have Account ?</p>
          </div>
        </form>
      </div>
    </main>
  );
};
