import { FC } from "react";
import logo from "../assets/redux.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { removeUser } from "../app/features/user/userSlice";
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <nav className="flex justify-center bg-primary sm:py-4 py-2 w-full">
      <div className="flex-1 flex justify-between xl:max-w-[1280px]">
        <div className="text-white">
          <img className="w-[64px] h-[64px] p-2" src={logo} alt="" />
        </div>
        <div className="flex items-center gap-2">
          {user !== null && user.isAdmin && (
            <div className="flex items-center">
              <Link
                className="text-white font-poppins font-semibold text-lg"
                to="/admin/dashbord"
              >
                Admin
              </Link>
            </div>
          )}
          {user === null ? (
            <h2 className="text-white font-poppins font-semibold text-lg">
              Login
            </h2>
          ) : (
            <>
              <h2
                onClick={() => dispatch(removeUser())}
                className="text-white font-poppins font-semibold text-lg cursor-pointer"
              >
                Logout
              </h2>
              <Link to="/profile"
                className="text-white font-poppins font-semibold text-lg cursor-pointer"
              >
                Profile
              </Link>
              <Link to="/"
                className="text-white font-poppins font-semibold text-lg cursor-pointer"
              >
                Home
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
