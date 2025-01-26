import React from 'react'
import SideBar from '../components/Sidebar'
import StudentsPage from '../components/StudentsTable'

function Students() {
  return (
    <div className='flex gap-6'>
        <SideBar/>
        <StudentsPage/>
        
    </div>
  )
}

export default Students