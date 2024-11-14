import React, { useEffect } from 'react'
import NoteContainer from './NoteContainer'
import { useSelector, useDispatch } from 'react-redux'
import { addEmptyNote, setSelectedTag, setArchiveView, setActiveNote } from '../store/noteSlice'
import toast from 'react-hot-toast'
import Empty from '../assets/Task_empty.svg'


const NoteSaidebar = () => {
    const notes = useSelector((state) => state.note.notes)
    const archivedNotes = useSelector((state) => state.note.archivedNotes)
    const isArchiveView = useSelector((state) => state.note.isArchiveView)
    const selectedTag = useSelector((state) => state.note.selectedTag)
    const isDarkTheme = useSelector(state => state.theme.darkMode)
    const dispatch = useDispatch()


    useEffect(() => {
        const currentNotes = isArchiveView ? archivedNotes : notes;
        if (currentNotes.length > 0) {
            const lastNote = currentNotes[0];
            dispatch(setActiveNote(lastNote.id));
        }
    }, [isArchiveView, notes.length, archivedNotes.length]);



    const handleCreateNote = () => {
        dispatch(addEmptyNote());
        toast.success('New note created successfully!', {

            style: {
                background: isDarkTheme ? '#1e293b' : '#fff',
                color: isDarkTheme ? '#fff' : '#0a0a0a',
                borderColor: isDarkTheme ? '#475569' : '#cbd5e1',
                borderRadius: '10px',
            },
        })
        dispatch(setSelectedTag(null))
        dispatch(setArchiveView(false))
    }

    const displayedNotes = isArchiveView ? archivedNotes : notes;

    return (
        <div className='flex flex-col items-start pl-7 pr-4 py-5 gap-4 border-r border-r-neutral-200 dark:border-r-slate-600 dark:bg-slate-950 w-[290px] h-screen  '>


            <button className='bg-blue-600 text-white font-medium text-center text-sm px-4 py-3 rounded-lg w-full hover:bg-blue-700 ' onClick={handleCreateNote}>
                + Create New Note
            </button>
            {displayedNotes.length === 0 ? (<>

                {isArchiveView && <p className='text-neutral-500 dark:text-slate-400 text-[12px] '>All your archived notes are stored here. You can restore or delete them anytime.</p>}
                <div className='bg-neutral-100 dark:bg-slate-800 dark:border-slate-600 border border-neutral-200 p-2 rounded-lg flex flex-col items-center justify-center gap-2'>
                    <img src={Empty} alt="" className='w-16 h-16' />
                    <p className='text-neutral-500 dark:text-slate-400 text-[12px]  font-normal'>{isArchiveView
                        ? "No notes have been archived yet. Move notes here for safekeeping, or create a new note."
                        : "You don't have any notes yet. Start a new note to capture your thoughts and ideas."}

                    </p>

                </div>

            </>

            ) : (<>
                {isArchiveView && <p className='text-neutral-500 dark:text-slatel-400 text-[12px]'>All your archived notes are stored here. You can restore or delete them anytime.</p>}
                {selectedTag && <p className='text-neutral-500 dark:text-slate-400 text-[12px]'>All notes with the <span className='font-semibold'> "{selectedTag}"</span> tag are shown here.</p>}
                <NoteContainer />
            </>
            )}

        </div>
    )
}

export default NoteSaidebar