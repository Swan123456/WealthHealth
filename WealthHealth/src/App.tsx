import { useState } from 'react';
import CreateEmployee from './pages/CreateEmployee';
import Employees, { Employee } from './pages/Employees';
import './index.css'

export default () => {
	const [employees, setEmployees] = useState<Array<Employee>>([])

  const [page, setPage] = useState<String>('Home')

  return <>{page === 'Home' ? <CreateEmployee setPage={setPage} setEmployees={setEmployees} /> : <Employees setPage={setPage} employees={employees} />}</>
}

