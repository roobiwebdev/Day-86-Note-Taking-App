// ArchiveDialog.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { archiveNote } from '../store/noteSlice';
import { closeDialog } from '../store/dialogSlice';
import toast from 'react-hot-toast';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';

const ArchiveDialog = () => {
    const dispatch = useDispatch();
    const activeNoteId = useSelector(state => state.note.activeNoteId);
    const notes = useSelector(state => state.note.notes);
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const handleArchive = () => {
        dispatch(archiveNote(activeNoteId));
        dispatch(closeDialog());
        toast.success('Note archived successfully!', {

            style: {
                background: isDarkMode ? '#1e293b' : '#fff',
                color: isDarkMode ? '#fff' : '#0a0a0a',
                borderColor: isDarkMode ? '#475569' : '#cbd5e1',
                borderRadius: '10px',
            },
        }
        );

    };

    return (
        <div className='fixed inset-0 flex items-center justify-center  dark:bg-slate-950/50  bg-neutral-950/60 z-50'>
            <div className='w-[440px] flex flex-col p-4 dark:bg-slate-800 dark:border-slate-600  bg-white border border-neutral-200 rounded-xl'>

                <div className='flex flex-row gap-4 w-full pb-5 border-b dark:border-b-slate-600 border-b-neutral-200 shrink-0'>
                    <ArchiveBoxArrowDownIcon className='w-10 h-10 stroke-neutral-700 dark:stroke-white dark:bg-slate-600  p-2 bg-neutral-100 rounded-lg' />
                    <div className='flex flex-col items-start gap-2 w-3/4'>
                        <h1 className='text-base text-neutral-950 font-semibold dark:text-white'>Archive Note </h1>
                        <p className='text-sm text-neutral-700 font-normal dark:text-slate-300'>Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.</p>
                    </div>

                </div>
                <div className='flex items-center justify-end w-full gap-4 pt-5'>
                    <button className='bg-neutral-100   dark:bg-slate-500 dark:text-slate-300 text-neutral-700 font-medium text-center text-sm px-4 py-[10px] rounded-lg hover:bg-neutral-200' onClick={() => dispatch(closeDialog())}>
                        Cancel
                    </button>
                    <button className='bg-blue-600 text-white font-medium text-center text-sm px-4 py-[10px] rounded-lg  hover:bg-blue-700' onClick={handleArchive}>
                        Archive Note
                    </button>

                </div>

            </div>

        </div>
    )
};

export default ArchiveDialog;