import { FC, useEffect, useState } from 'react';
import qs from 'qs';
import { Student, UserCard } from '../../components/user-card';
import {  Button, Input, Pagination } from 'antd';
import { AiOutlineSearch, AiOutlineUsergroupAdd } from "react-icons/ai";
import { FilterModal } from '../../components/filter-modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageMeta } from '../../common/types/api.types';
import { defaultPageMeta } from '../../common/const/api.const';
import { useDebounce } from '../../utils/use-debounce';
import { AddTeamsModal } from '../../components/add-teams-modal';
import axios from 'axios';

export const Users: FC = () => {

  const { search } = useLocation();
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(search);
  const _page = parseInt(urlParams.get("page") || "1"),
    _take = parseInt(urlParams.get("take") || "20"),
    _gender= (urlParams.get("gender") || []);
    // _presence= (urlParams.get("presense") || []),
    // _domain= (urlParams.get("domain") || []);


    const [students, setStudents] = useState<{
      // meta: PageMeta,
      data: Student[]
    }>({
      // meta: defaultPageMeta,
      data: []
    });
    const [input, setInput] = useState<string>('');
    const [filters, setFilters] = useState({gender:[''],
      domain: [''],
      available:['']});
    const [userForTeams, setUserForTeams] = useState<Student[]>([]);
    const q = useDebounce<string>(input, 100);

    const onUserSelect = (student: Student) => {
      console.log(userForTeams.includes(student));
      if(userForTeams.includes(student)){
        const index = userForTeams.indexOf(student)
        setUserForTeams([
          ...userForTeams.slice(0,index),
          ...userForTeams.slice(index+1)
        ])
      } else {
          setUserForTeams([...userForTeams, student])
      }
    }

    const getStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users', {
          params: {
            page: _page,
            take:_take,
            search: q,
          },
        });
        setStudents({data: response.data.data});
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    console.log(q);

  useEffect(() => {
    getStudents()
  }, [q, _page, _take,]);

  return (
    <div className='pt-14 relative bg-gray-100 h-screen'>
      <div className='my-4 flex flex-row items-center justify-center'>
          <div className='w-4/5'>
            <Input
              allowClear
              prefix={<AiOutlineSearch />}
              onChange={(e) => setInput(e.target.value)}
              size='large'
            />
          </div>
          <div className='ml-0.5'>
            <FilterModal onFilterChange={setFilters}/>
          </div>
          <div className='ml-1'>
          </div>
          <AddTeamsModal buttonDisabled={!!!userForTeams.length} onCancel={setUserForTeams}/>
        </div>
      <div className='flex flex-1 flex-wrap justify-center items-center'>
      { students.data && students.data.map((student) => (
        <UserCard student={student} onUserSelect={onUserSelect} />
        ))}
      </div>
      {!q &&  (
        <div className='mt-4 text-center'>
          <Pagination
            size='default'
            current={_page}
            pageSize={_take}
            total={1000}
            onChange={(page, take) => {
              navigate({
                pathname: '/users',
                search: qs.stringify({
                  page: page,
                  take: take,
                  q: q,
                  gender:filters.gender,
                  domain:filters.domain,
                  present:filters.available
                }),
              });
            }}
            showSizeChanger
          />
        </div>
      )}
    </div>
  )
}