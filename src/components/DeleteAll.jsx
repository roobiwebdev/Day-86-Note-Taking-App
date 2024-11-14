import React from 'react'
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllNotes } from '../store/noteSlice'
import { closeDialog } from '../store/dialogSlice'
import toast from 'react-hot-toast'

const DeleteAll = () => {
    const notes = useSelector((state) => state.note.notes)



    const dispatch = useDispatch()

    const handleDeleteAllNotes = () => {
        dispatch(deleteAllNotes())
        toast.success('All notes deleted successfully!')
        dispatch(closeDialog())
    }


    return (
        <div className='fixed inset-0  dark:bg-slate-950/50  flex items-center justify-center bg-neutral-950/60 z-50'>
            <div className='w-[440px] flex flex-col p-4 bg-white border border-neutral-200 dark:bg-slate-800 dark:border-slate-600 rounded-xl'>

                <div className='flex flex-row gap-4 w-full pb-5 border-b border-b-neutral-200 dark:border-b-slate-600  shrink-0'>
                    <ArchiveBoxXMarkIcon className='w-10 h-10 stroke-neutral-700 dark:stroke-white dark:bg-slate-600  p-2 bg-neutral-100 rounded-lg' />
                    <div className='flex flex-col items-start gap-2 w-3/4'>
                        <h1 className='text-base text-neutral-950 font-semibold dark:text-white'>Delete All Notes </h1>
                        <p className='text-sm dark:text-slate-300 text-neutral-700 font-normal'>Are you sure you want to permanently delete All the notes? This action cannot be undone.</p>
                    </div>

                </div>
                <div className='flex items-center justify-end w-full gap-4 pt-5'>
                    <button className='bg-neutral-100 text-neutral-700  dark:bg-slate-500 dark:text-slate-300 font-medium text-center text-sm px-4 py-[10px] rounded-lg hover:bg-neutral-200' onClick={() => dispatch(closeDialog())}>
                        Cancel
                    </button>
                    <button className='bg-red-500 text-white font-medium text-center text-sm px-4 py-[10px] rounded-lg  hover:bg-red-600' onClick={handleDeleteAllNotes} >
                        Delete All Notes
                    </button>

                </div>

            </div>

        </div>
    )
}

export default DeleteAll