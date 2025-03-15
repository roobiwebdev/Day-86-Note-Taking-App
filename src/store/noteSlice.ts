import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; // Add this import

// Define the types for the note state
interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  creationDate: string;
  archived?: boolean;
}

interface NoteState {
  notes: Note[];
  archivedNotes: Note[];
  activeNoteId: string | null;
  selectedTag: string | null;
  isArchiveView: boolean;
  searchQuery: string;
}

const initialState: NoteState = {
  notes: [],
  archivedNotes: [],
  activeNoteId: null,
  selectedTag: null,
  isArchiveView: false,
  searchQuery: "",
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addEmptyNote: (state) => {
      const newNoteId = uuidv4();
      const newNote: Note = {
        id: newNoteId,
        title: "Untitled Note",
        content: "",
        tags: [],
        creationDate: "",
      };
      state.notes.unshift(newNote);
      state.activeNoteId = newNoteId;
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.activeNoteId = null;
    },
    deleteAllNotes: (state) => {
      state.notes = [];
      state.activeNoteId = null;
    },
    deleteArchivedNote: (state, action: PayloadAction<string>) => {
      state.archivedNotes = state.archivedNotes.filter(
        (note) => note.id !== action.payload
      );
    },
    setActiveNote: (state, action: PayloadAction<string | null>) => {
      state.activeNoteId = action.payload;
    },
    setSelectedTag: (state, action: PayloadAction<string | null>) => {
      state.selectedTag = action.payload;
    },
    archiveNote: (state, action: PayloadAction<string>) => {
      const noteToArchive = state.notes.find(
        (note) => note.id === action.payload
      );
      if (noteToArchive) {
        noteToArchive.archived = true;
        state.archivedNotes.push(noteToArchive);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.activeNoteId =
          state.archivedNotes.length > 0 ? state.archivedNotes[0].id : null;
      }
    },
    restoreNote: (state, action: PayloadAction<string>) => {
      const noteToRestore = state.archivedNotes.find(
        (note) => note.id === action.payload
      );
      if (noteToRestore) {
        noteToRestore.archived = false;
        state.notes.push(noteToRestore);
        state.archivedNotes = state.archivedNotes.filter(
          (note) => note.id !== action.payload
        );
      }
    },
    setArchiveView: (state, action: PayloadAction<boolean>) => {
      state.isArchiveView = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

// Add a selector to get all tags
export const getAllTags = (state: { note: NoteState }) => {
  const tagsSet = new Set<string>();
  state.note.notes.forEach((note) => {
    note.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
};

// Add a selector to get filtered notes
export const getFilteredNotes = (state: { note: NoteState }) => {
  const notes = state.note.isArchiveView
    ? state.note.archivedNotes
    : state.note.notes;
  const searchQuery = state.note.searchQuery.toLowerCase();
  const selectedTag = state.note.selectedTag;

  return notes.filter((note) => {
    const matchesSearch =
      searchQuery === "" ||
      note.title.toLowerCase().includes(searchQuery) ||
      note.content.toLowerCase().includes(searchQuery) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

    const matchesTag = !selectedTag || note.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });
};

export const {
  addEmptyNote,
  updateNote,
  setActiveNote,
  setSelectedTag,
  deleteNote,
  archiveNote,
  restoreNote,
  setArchiveView,
  deleteArchivedNote,
  setSearchQuery,
  deleteAllNotes,
} = noteSlice.actions;
export default noteSlice.reducer;
