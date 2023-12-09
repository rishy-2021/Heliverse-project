import  { FC } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/heliverse_logo.jpeg"

export const NavBar: FC = () => {

  return (
    <div className='fixed inset-x-0 top-0 h-14 border-b border-b-contrast-10 z-30 flex flex-row'>
        <div className='flex flex-1 flex-row items-center ml-7'>
          <img
              src={logo}
              alt='heliverse'
              className='h-10 w-20 object-cover rounded-lg'
          />
        </div>
        <div className='flex flex-1 flex-row rounded-full'>
          <NavLink
            to="/users"
            className={({ isActive, isPending }) => `mr-5 ${isActive && 'border-b-2 border-blue-500'}`}
            title='Users'
          >
             <p className='font-medium my-4'>
               Users
              </p>
          </NavLink>
           <NavLink
            to="/tables"
            className={({ isActive, isPending }) => `${isActive && 'border-b-2 border-blue-500'}`}
          >
             <p className='font-medium my-4'>
                Tables
              </p>
          </NavLink>
        </div>
      </div>
  )
}
