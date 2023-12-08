import React, { FC, useEffect, useMemo, useState } from 'react';
import qs from 'qs';
import { UserCard } from '../../components/user-card';

export const Tables: FC = () => {
//   const navigate = useNavigate()

//   const { search } = useLocation();
//   const urlParams = new URLSearchParams(search);
//   const _page = parseInt(urlParams.get("page") || "1");
//   const _take = parseInt(urlParams.get("take") || "10");
//   const locationId = urlParams.get('location') || '';
  const [input, setInput] = useState<string>('');
//   const q = useDebounce<string>(input, 100);
//   const [employees, setEmployees] = useState<{
//     meta: PageMeta,
//     data: Employee[]
//   }>({
//     meta: defaultPageMeta,
//     data: []
//   });

//   const { query: getEmployeesQuery } = useQuery<
//     GetUserEmployeesResponse,
//     EmployeePathParams,
//     EmployeeQueryParams
//   >(employeeApi.getEmployees, {
//     onSuccess: ({
//       data: { data, meta }
//     }) => {
//       setEmployees({
//         meta,
//         data
//       });
//     },
//   });

//   const { query: searchEmployeesQuery } = useQuery(employeeApi.searchEmployees, {
//     onSuccess: ({ data: { meta, data } }) => {
//       setEmployees({
//         meta,
//         data
//       });
//     }
//   });

//   const locations = useMemo(() => {
//     return businessLocations.map((bl) => ({
//       value: bl.id,
//       label: bl.name
//     }))
//   }, [businessLocations]);

//   const searchEmployees = (q: string) => {
//     searchEmployeesQuery({
//       pathParams: {
//         businessId: selectedBusiness.id,
//       },
//       queryParams: {
//         q,
//         locationId
//       }
//     });
//   };

//   const getEmployees = () => {
//     getEmployeesQuery({
//       pathParams: {
//         businessId: selectedBusiness.id,
//       },
//       queryParams: {
//         page: _page,
//         take: _take,
//         locationId
//       }
//     });
//   }

//   useEffect(() => {
//     if (q) {
//       searchEmployees(q)
//     }
//     getEmployees()
//   }, [q, _page, _take, locationId]);

  return (
    <div className='py-6 2xl:px-24 lg:px-10 md:px-4 bg-white min-h-screen'>
        {/* <UserCard /> */}
    </div>
  )
}