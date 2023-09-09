import { FC } from "react";
import logo from '../assets/redux.svg'

export const Navbar: FC = () => {
  return (
    <nav className="flex justify-center bg-primary sm:py-4 py-2 w-full">
      <div className="flex-1 flex justify-between xl:max-w-[1280px]">
        <div className="text-white">
            <img className="w-[64px] h-[64px] p-2" src={logo} alt="" />
        </div>
        <div className="flex items-center">
            <h2 className="text-white font-poppins font-semibold text-lg">Login</h2>
        </div>
      </div>
    </nav>
  );
};


const arr = [1, 2, 3, 5, 5];

const newArr = arr.map(function (num) {
  return num + 1;
})