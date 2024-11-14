import React from 'react'
import { useState, useEffect } from 'react'
import Select from 'react-select/creatable'
import { TagIcon } from '@heroicons/react/24/outline'
import { ClockIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { updateNote } from '../store/noteSlice'
import toast from 'react-hot-toast'


const MainNote = () => {
    const dispatch = useDispatch()
    const [note, setNote] = useState('')
    const [tags, setTags] = useState('')
    const [title, setTitle] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [currentNoteId, setCurrentNoteId] = useState(null)

    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);

    const notes = useSelector((state) => state.note.notes)
    const activeNoteId = useSelector((state) => state.note.activeNoteId)

    const isArchiveView = useSelector(state => state.note.isArchiveView)
    const archivedNotes = useSelector(state => state.note.archivedNotes)
    const darkMode = useSelector(state => state.theme.darkMode)


    const activeNote = isArchiveView
        ? archivedNotes.find(note => note.id === activeNoteId)
        : notes.find(note => note.id === activeNoteId)



    useEffect(() => {
        if (activeNote) {
            setTitle(activeNote.title)
            setNote(activeNote.content)
            const tagOptions = activeNote.tags.map(tag => ({ value: tag.toLowerCase(), label: tag }))
            setSelectedTags(tagOptions)
            setTags(activeNote.tags.join(','))
            setCreationDate(activeNote.creationDate)
            setCurrentNoteId(activeNote.id)
        }
    }, [activeNote, activeNoteId, notes, archivedNotes])




    const handleChange = (newValue) => {
        setSelectedTags(newValue || [])
        // Update tags string for form validation
        setTags(newValue ? newValue.map(tag => tag.label).join(',') : '')
    }

    const handleCreateTag = (inputValue) => {
        const newTag = { value: inputValue.toLowerCase(), label: inputValue }
        setAvailableTags([...availableTags, newTag])
        setSelectedTags([...selectedTags, newTag])
        setTags([...selectedTags, newTag].map(tag => tag.label).join(','))
    }



    const isFormValid = title.trim() !== '' && note.trim() !== '' && tags.trim() !== ''


    const handleSaveNote = () => {
        const currentDate = new Date().toLocaleDateString('eu-EU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
        dispatch(
            updateNote({
                id: currentNoteId,
                title: title,
                content: note,
                tags: selectedTags.map(tag => tag.label),
                creationDate: currentDate,
            })
        )

        setCreationDate(currentDate)
        toast.success('Note saved successfully!')

    }

    const handleCancelNote = () => {
        if (activeNote) {
            setTitle(activeNote.title)
            setNote(activeNote.content)
            setTags(activeNote.tags.join(','))
            setCreationDate(activeNote.creationDate)
        } else {
            setTitle('')
            setNote('')
            setTags('')
            setCreationDate('')
        }
    }

    return (
        <div className='flex flex-col w-[700px]  border-r border-r-neutral-200 dark:bg-slate-950 dark:border-r-slate-600 px-6 py-5 gap-4 h-screen overflow-y-auto '>
            <input className='text-neutral-950 dark:bg-slate-950 dark:text-white font-bold text-2xl py-1 placeholder:text-2xl placeholder:text-neutral-950 dark:placeholder:text-white focus:outline-none' placeholder='Enter a title...' disabled={isArchiveView} value={title} onChange={(e) => setTitle(e.target.value)} />


            <div className='flex flex-col items-start gap-1 border-b border-b-neutral-200 dark:border-b-slate-600 pb-4'>
                <div className='flex flex-row items-center gap-2'>
                    <TagIcon className='w-4 h-4 stroke-neutral-500 dark:stroke-slate-400' />
                    <p className='text-neutral-700 dark:text-slate-400 text-sm'>Tags</p>
                    <Select
                        isMulti
                        isClearable
                        options={availableTags}
                        value={selectedTags}
                        onChange={handleChange}
                        onCreateOption={handleCreateTag}
                        placeholder="Add or select tags..."
                        className="flex-1 dark:bg-slate-950"
                        isDisabled={isArchiveView}
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: darkMode ? '#0f172a' : 'white',
                                color: darkMode ? '#e2e8f0' : '#2B303B',
                                border: 'none',
                                boxShadow: 'none',
                                '&:hover': { border: 'none' },
                            }),
                            menu: (base) => ({
                                ...base,
                                backgroundColor: darkMode ? '#1e293b' : 'white',
                                color: darkMode ? '#e2e8f0' : '#2B303B',
                            }),
                            option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isSelected
                                    ? (darkMode ? '#3b82f6' : '#2563eb')
                                    : isFocused
                                        ? (darkMode ? '#334155' : '#f1f5f9')
                                        : 'transparent',
                                color: isSelected
                                    ? 'white'
                                    : (darkMode ? '#e2e8f0' : '#2B303B'),
                                '&:active': {
                                    backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                                },
                            }),
                            multiValue: (base) => ({
                                ...base,
                                backgroundColor: darkMode ? '#334155' : '#f5f5f5',
                                color: darkMode ? '#e2e8f0' : '#2B303B',
                                borderRadius: '4px',
                            }),
                            multiValueLabel: (base) => ({
                                ...base,
                                color: darkMode ? '#e2e8f0' : '#2B303B',
                            }),
                            multiValueRemove: (base) => ({
                                ...base,
                                color: darkMode ? '#94a3b8' : '#64748b',
                                '&:hover': {
                                    backgroundColor: darkMode ? '#475569' : '#e2e8f0',
                                    color: darkMode ? '#e2e8f0' : '#2B303B',
                                },
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: darkMode ? '#64748b' : '#a3a3a3',
                                fontSize: '14px',
                            }),
                            input: (base) => ({
                                ...base,
                                color: darkMode ? '#e2e8f0' : '#2B303B',
                            }),
                        }}




                    />
                </div>
                <>
                    {isArchiveView && <div className='flex flex-row items-center gap-2'>
                        <CheckCircleIcon className='w-4 h-4 stroke-neutral-500 dark:stroke-slate-400' />
                        <p className='text-neutral-700 dark:text-slate-400 text-sm'>Status</p>
                        <input type='text' disabled size={46} className='px-4 py-1 appearance-none placeholder-neutral-400 text-sm placeholder:text-sm focus:ring-transparent disabled:bg-white dark:disabled:bg-slate-950 dark:placeholder-slate-400 focus:outline-none' placeholder='Archived' />
                    </div>

                    }
                </>
                <div className='flex flex-row items-center gap-2'>
                    <ClockIcon className='w-4 h-4 stroke-neutral-500 dark:stroke-slate-400' />
                    <p className='text-neutral-700 dark:text-slate-400 text-sm'>Last edited</p>
                    <input type='text' disabled size={46} className='px-4 py-1 appearance-none placeholder-neutral-400 dark:placeholder-slate-400 text-sm placeholder:text-sm focus:ring-transparent disabled:bg-white dark:disabled:bg-slate-950 focus:outline-none' placeholder={!creationDate ? 'Not yet saved' : `${creationDate}`} value={creationDate} />
                </div>
            </div>
            <div className='border-b border-b-neutral-200 dark:border-b-slate-600 dark:bg-slate-950 pb-4'>
                <textarea className='text-neutral-950 dark:text-white dark:placeholder-slate-400 dark:bg-slate-950 text-sm font-normal placeholder:text-sm placeholder-neutral-500 w-full h-[460px] border-none focus:outline-none leading-5' placeholder='Start typing here...' value={note} onChange={(e) => setNote(e.target.value)} disabled={isArchiveView}></textarea>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <button className={`text-white font-medium text-sm px-4 py-3 rounded-lg ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'
                    }`} type='submit' disabled={!isFormValid || isArchiveView} onClick={handleSaveNote}>Save Note</button>
                <button className='bg-neutral-100 text-neutral-700 dark:bg-slate-800 dark:text-slate-400 font-medium text-sm px-4 py-3 rounded-lg  hover:bg-neutral-200 dark:hover:bg-slate-700' disabled={isArchiveView} onClick={handleCancelNote}>Cancel</button>
            </div>

        </div>
    )
}

export default MainNote