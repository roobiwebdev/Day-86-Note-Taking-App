import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTags, setSelectedTag, setArchiveView } from '../store/noteSlice'
import { HomeIcon, ArchiveBoxArrowDownIcon, ChevronRightIcon, TagIcon }
    from '@heroicons/react/24/outline'
import Logo from '../assets/Logo.svg'
import Logo_white from '../assets/Logo_white.svg'

const SideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tags = useSelector(getAllTags)
    const selectedTag = useSelector((state) => state.note.setSelectedTag)
    const darkMode = useSelector(state => state.theme.darkMode)

    const [activeButton, setActiveButton] = useState('allNotes')

    const handleButtonClick = (buttonName) => {
        if (buttonName === 'archivedNotes') {
            dispatch(setArchiveView(true))

        } else {
            dispatch(setArchiveView(false))


        }
        setActiveButton(buttonName)
        dispatch(setSelectedTag(null)) // Clear selected tag
    }

    const handleTagClick = (tag) => {
        dispatch(setSelectedTag(tag))
        setActiveButton('tag')
    }

    return (
        <div className='flex flex-col py-3 px-4 gap-3 border-r border-r-neutral-200 w-[272px] h-screen dark:bg-slate-950 dark:border-r-slate-600 '>
            {!darkMode ? (<img src={Logo} alt="Logo" className='w-24 h-24 -mt-6' />) : (<img src={Logo_white} alt="Logo" className='w-24 h-24 -mt-6' />)}

            <div className='flex flex-col items-start w-full gap-2 -mt-4 border-b border-b-neutral-200 pb-3 dark:border-b-slate-600 '>
                <button
                    className={`group flex items-center justify-between w-full py-3 px-3 gap-2 rounded-lg cursor-pointer hover:dark:bg-slate-800 hover:bg-neutral-100 active:bg-neutral-100 ${activeButton === 'allNotes' ? 'bg-neutral-100 text-neutral-950 dark:bg-slate-800 dark:text-white' : 'text-neutral-700 dark:text-white'}`}
                    onClick={() => handleButtonClick('allNotes')}
                >
                    <div className='flex items-center justify-center gap-2'>
                        <HomeIcon className={`w-5 h-5 ${activeButton === 'allNotes' ? 'stroke-blue-600' : 'stroke-neutral-700 dark:stroke-white'} group-hover:stroke-blue-600`} />
                        <p className={`text-sm ${activeButton === 'allNotes' ? 'text-neutral-950 dark:text-white' : 'text-neutral-700 dark:text-white'} group-hover:text-neutral-950 dark:group-hover:text-white`}>All Notes  </p>

                    </div>
                    {activeButton === 'allNotes' && <ChevronRightIcon className='w-4 h-4 stroke-neutral-700 stroke-2 dark:stroke-white' />}
                </button>
                <button
                    className={`group flex items-center justify-between w-full py-3 px-3 gap-2 rounded-lg cursor-pointer hover:bg-neutral-100  hover:dark:bg-slate-800  active:bg-neutral-100 ${activeButton === 'archivedNotes' ? 'bg-neutral-100 text-neutral-950  dark:bg-slate-800' : 'text-neutral-700 dark:text-white'}`}
                    onClick={() => handleButtonClick('archivedNotes')}
                >
                    <div className='flex items-center gap-2'>
                        <ArchiveBoxArrowDownIcon className={`w-5 h-5 ${activeButton === 'archivedNotes' ? 'stroke-blue-600' : 'stroke-neutral-700 dark:stroke-white dark:text-white'} group-hover:stroke-blue-600`} />
                        <p className={`text-sm ${activeButton === 'archivedNotes' ? 'text-neutral-950 dark:text-white' : 'text-neutral-700 dark:text-white'} group-hover:text-neutral-950 dark:group-hover:text-white`}>Archived Notes</p>

                    </div>
                    {activeButton === 'archivedNotes' && <ChevronRightIcon className='w-4 h-4 stroke-neutral-700 stroke-2 dark:stroke-white' />}
                </button>
            </div>
            <div className='flex flex-col items-start gap-3 w-full'>
                <h1 className='text-sm font-medium text-neutral-500 dark:text-slate-400'>Tags</h1>
                <div className='flex flex-col items-start gap-1 w-full'>
                    {tags.map(tag => (
                        <button
                            key={tag}
                            className={`group flex items-center w-full py-2 px-3 gap-2 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-slate-800 active:bg-neutral-100 
                                ${selectedTag === tag ? 'bg-neutral-100 dark:bg-slate-800 dark:text-white text-neutral-950' : 'text-neutral-700 dark:text-white'}`}
                            onClick={() => handleTagClick(tag)}
                        >
                            <TagIcon className={`w-5 h-5 ${selectedTag === tag ? 'stroke-blue-600' : 'stroke-neutral-700 dark:stroke-white'} group-hover:stroke-blue-600`} />
                            <p className={`text-sm ${selectedTag === tag ? 'text-neutral-950  dark:text-white' : 'text-neutral-700  dark:text-white'} group-hover:text-neutral-950  dark:group-hover:text-white`}>
                                {tag}
                            </p>
                        </button>
                    ))}


                </div>

            </div>
        </div>
    )
}

export default SideBar