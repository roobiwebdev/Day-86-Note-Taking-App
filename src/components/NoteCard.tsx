import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveNote, getFilteredNotes } from "../store/noteSlice";

// Define types for the Redux state
interface Note {
  id: string;
  title: string;
  tags: string[];
  creationDate: string;
}

interface RootState {
  note: {
    notes: Note[];
    activeNoteId: string | null;
    selectedTag: string | null;
    archivedNotes: Note[];
    isArchiveView: boolean;
  };
}

// Define the type for `handleActive` argument
interface NoteCardProps {
  noteId: string;
}

const NoteCard: React.FC = () => {
  const notes = useSelector((state: RootState) => state.note.notes);
  const activeNoteId = useSelector(
    (state: RootState) => state.note.activeNoteId
  );
  const selectedTag = useSelector((state: RootState) => state.note.selectedTag);
  const archivedNotes = useSelector(
    (state: RootState) => state.note.archivedNotes
  );
  const isArchiveView = useSelector(
    (state: RootState) => state.note.isArchiveView
  );
  const filteredNotes = useSelector(getFilteredNotes);
  const dispatch = useDispatch();

  // Update `handleActive` function to accept a string argument
  const handleActive = (noteId: string) => {
    dispatch(setActiveNote(noteId));
  };

  return (
    <>
      {filteredNotes.map((note) => (
        <div
          key={note.id}
          className={`flex flex-col items-start mb-2 p-2 ${
            note.title === "Untitled Note" ? "gap-0" : "gap-3"
          } rounded-lg cursor-pointer ${
            activeNoteId === note.id
              ? "bg-neutral-100 dark:bg-slate-800 border-none"
              : "border-b dark:border-b-slate-600 border-neutral-200 w-full rounded-none"
          }`}
          onClick={() => handleActive(note.id)}
        >
          <h2 className="text-base font-semibold text-neutral-950 dark:text-white leading-5">
            {note.title}
          </h2>

          <div className="flex gap-1 items-center">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="px-[6px] py-[2px] bg-neutral-200 dark:bg-slate-600 dark:text-white text-[12px] font-normal rounded-[4px]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="w-full">
            <p className="text-[12px] font-normal text-neutral-700 dark:text-slate-400 tracking-wide">
              {note.creationDate}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default NoteCard;
