import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Unauthorized } from "../components/Unauthorized";

export const Home: FC = () => {
  const user = useSelector((state: RootState) => state.user);
  if(!user.email || !user.username) {
    return !user.email && <Unauthorized />
  }
  return (
    <>
      <div className="w-full h-screen min-h-[600px] flex justify-center items-center bg-violet-100">
        <div className="w-[50%] min-w-[400px] h-[50%] min-h-[400px] flex justify-center items-center  bg-primary px-16 py-6 rounded-md">
            <h2 className="text-white xs:font-semibold sm:text-4xl text-2xl">Hello {user.username}, Welcome to Home page.</h2>
        </div>
      </div>
    </>
  );
};
