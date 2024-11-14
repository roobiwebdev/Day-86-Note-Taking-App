import React from 'react'
import NoteCard from './NoteCard'

const NoteContainer = () => {
    return (
        <div className='flex flex-col gap-4 w-full overflow-y-auto scroll-smooth '>

            <NoteCard />

        </div>
    )
}

export default NoteContainer