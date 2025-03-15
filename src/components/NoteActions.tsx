import React from "react";
import {
  ArchiveBoxArrowDownIcon,
  TrashIcon,
  ArchiveBoxXMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { restoreNote } from "../store/noteSlice";
import { openDialog } from "../store/dialogSlice";
import toast from "react-hot-toast";
import Dialog from "./Dialog";

// Define the types for the Redux state
interface RootState {
  note: {
    isArchiveView: boolean;
    activeNoteId: string | null; // The active note can be null or a string representing the ID
    notes: any[]; // Replace with the actual note type if available
  };
  dialog: {
    isOpen: boolean;
  };
}

const NoteActions: React.FC = () => {
  const isArchiveView = useSelector(
    (state: RootState) => state.note.isArchiveView
  );
  const activeNoteId = useSelector(
    (state: RootState) => state.note.activeNoteId
  );
  const notes = useSelector((state: RootState) => state.note.notes);
  const dispatch = useDispatch();

  const handleDeleteDialog = () => {
    dispatch(openDialog("delete"));
  };

  const handleArchiveDialog = () => {
    dispatch(openDialog("archive"));
  };

  const handleDeleteAllNotes = () => {
    dispatch(openDialog("deleteAll"));
  };

  const handleRestore = () => {
    if (activeNoteId) {
      dispatch(restoreNote(activeNoteId));
      toast.success("Note restored successfully!");
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 py-5 pl-4 pr-8 w-1/4 h-screen dark:bg-slate-950">
      {isArchiveView ? (
        <button
          className="flex items-center gap-2 border border-neutral-300 dark:border-slate-600 dark:text-white text-neutral-950 font-medium text-sm px-4 py-3 rounded-lg w-full hover:bg-neutral-100 dark:hover:bg-slate-700"
          onClick={handleRestore}
          disabled={activeNoteId === null}
        >
          <ArrowPathIcon className="w-5 h-5 stroke-neutral-950 dark:stroke-white" />
          <p>Restore Note</p>
        </button>
      ) : (
        <button
          className="flex items-center gap-2 border border-neutral-300 dark:border-slate-600 dark:text-white text-neutral-950 font-medium text-sm px-4 py-3 rounded-lg w-full hover:bg-neutral-100 dark:hover:bg-slate-700"
          onClick={handleArchiveDialog}
          disabled={activeNoteId === null}
        >
          <ArchiveBoxArrowDownIcon className="w-5 h-5 stroke-neutral-950 dark:stroke-white" />
          <p>Archive Note</p>
        </button>
      )}
      <button
        className="flex items-center gap-2 border border-neutral-300 dark:border-slate-600 dark:text-white text-neutral-950 font-medium text-sm px-4 py-3 rounded-lg w-full dark:hover:bg-slate-700 hover:bg-neutral-100"
        onClick={handleDeleteDialog}
        disabled={activeNoteId === null}
      >
        <TrashIcon className="w-5 h-5 stroke-neutral-950 dark:stroke-white" />
        <p>Delete Note</p>
      </button>
      <button
        className="flex items-center gap-2 border border-neutral-300 dark:border-slate-600 dark:text-white text-neutral-950 font-medium text-sm px-4 py-3 rounded-lg w-full dark:hover:bg-slate-700 hover:bg-neutral-100"
        onClick={handleDeleteAllNotes}
        disabled={activeNoteId === null || isArchiveView}
      >
        <ArchiveBoxXMarkIcon className="w-5 h-5 stroke-neutral-950 dark:stroke-white" />
        <p>Delete All Notes</p>
      </button>
    </div>
  );
};

export default NoteActions;
