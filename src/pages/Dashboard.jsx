import React from 'react'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import NoteSaidebar from '../components/NoteSaidebar'
import MainNote from '../components/MainNote'
import NoteActions from '../components/NoteActions'
import { useSelector } from 'react-redux'



const Dashboard = () => {
  const notes = useSelector((state) => state.note.notes)
  const archivedNotes = useSelector((state) => state.note.archivedNotes)
  const isArchiveView = useSelector(state => state.note.isArchiveView)

  const displayNotes = isArchiveView ? archivedNotes : notes


  return (
    <div className='flex w-full items-start max-h-screen overflow-hidden '>

      <SideBar />

      <div className='flex flex-col w-full dark:bg-slate-950 '>
        <NavBar />
        {displayNotes.length === 0 ? (<div className='w-full flex'>
          <NoteSaidebar />

        </div>) : (<div className='w-full flex'>

          <>
            <NoteSaidebar />
            <MainNote />
            <NoteActions />

          </>

        </div>)}

      </div>
    </div>
  )
}

export default Dashboard