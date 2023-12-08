import  { FC, useState } from 'react'
import logo from "../assets/heliverse_logo.jpeg"
import { MdOutlineMoreVert } from "react-icons/md";
import { MdBusiness } from "react-icons/md";
import { FaCircle, FaFemale, FaMale } from "react-icons/fa";
import { Button, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface Student {
  id:number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  domain: string;
  available: boolean;
}

interface Props {
  student: Student
  onUserSelect:(student: Student)=> void;
}

export const UserCard: FC<Props> = ({student, onUserSelect}) => {

  const {first_name, last_name, email, gender, avatar, domain, available} = student;

  const [checked, setChecked] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    onUserSelect(student)
  };

  return (
    <div className='bg-white h-fit rounded-lg flex flex-col px-6 py-5 mx-2 my-2' style={{width:"22%"}}>
      <div className='flex flex-1 flex-row justify-between'>
      <div className='flex flex-2 flex-row items-center'>
        <img src={avatar} width={50} height={50} className='rounded-full border-2' />
        <div className='flex flex-col items-start ml-3'>
            <p className='font-bold text-blue-500'>{`${first_name} ${last_name}`}</p>
            <p className='text-gray-700'>{email}</p>
        </div>
        </div>
        <div className='flex flex-1 justify-end items-start'>
          <Checkbox checked={checked} disabled={!available} onChange={onChange} />
      </div>
      </div>
      <div className='flex flex-row mt-5'>
        <div className='flex items-center'>
        <MdBusiness color='gray'/>
        <p className='ml-2 text-sm text-gray-600'>{domain}</p>
        </div>
        <div className='flex items-center ml-5'>
            <FaFemale color='gray'/>
            <p className='ml-2 text-sm text-gray-600'>{gender}</p>
        </div>
        <div className='flex items-center ml-5'>
            <FaCircle size={9} color={`${available ? 'green' :'orange'}`} />
            <p className='ml-2 text-sm text-gray-600'>{available ? 'Available' : 'Unavailable'}</p>
        </div>
      </div>
    </div>
  )
}
