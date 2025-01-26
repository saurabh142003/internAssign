import React from 'react'
import SideBar from '../components/Sidebar'
import StudentsPage from '../components/StudentsTable'

function Students() {
  return (
    <div className='flex w-full hide-scrollbar gap-6'>
        <SideBar/>
        <StudentsPage/>
        
    </div>
  )
}

export default Students