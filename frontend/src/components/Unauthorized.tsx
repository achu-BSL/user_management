import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Unauthorized: FC = () => {
  return (
    <div className='absoulte flex justify-center items-center w-full h-screen min-h-[400px] bg-slate-950 bg-opacity-50 '>
        <div className='flex flex-col items-center justify-evenly sm:w-[350px] xs:w-[300px] w-[80%] h-[50%] max-h-[380px] sm:px-6 px-2 sm:py-4 py-1 bg-slate-300 rounded-md shadow-md'>
            <div>
            <h1 className='font-poppins font-semibold sm:text-xl text-lg'>Authorization faild,</h1>
            <h4 className='font-poppins'>Plase Login, and continue.</h4>

            </div>
      <Link className='sm:px-16 px-8 sm:py-2 py-1 sm:font-semibold text-white bg-primary rounded-md shadow-md hover:bg-opacity-80' to="/login">Login</Link>
        </div>
    </div>
  );
};