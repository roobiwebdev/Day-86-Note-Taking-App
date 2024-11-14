// noteSlice.js - Add new action for creating empty note
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'; // Add this import

const noteSlice = createSlice({
    name: "note",
    initialState: {
        notes: [],
        archivedNotes: [],
        activeNoteId: null,
        selectedTag: null,
        isArchiveView: false,
        searchQuery: '',
    },
    reducers: {
        addEmptyNote: (state) => {
            const newNoteId = uuidv4();
            const newNote = {
                id: newNoteId,
                title: "Untitled Note",
                content: "",
                tags: [],
                creationDate: '',
            };
            state.notes.unshift(newNote);
            state.activeNoteId = newNoteId;
        },
        updateNote: (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }

        },

        deleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            state.activeNoteId = null;

        },

        deleteAllNotes: (state,action) => {
            state.notes = [];
            state.activeNoteId = null;
        },

        deleteArchivedNote: (state, action) => {
            state.archivedNotes = state.archivedNotes.filter(note => note.id !== action.payload);
        },

        setActiveNote: (state, action) => {
            state.activeNoteId = action.payload;
        },
        setSelectedTag: (state, action) => {
            state.selectedTag = action.payload;
        },
        archiveNote: (state, action) => {
            const noteToArchive = state.notes.find(note => note.id === action.payload);
            if (noteToArchive) {
                noteToArchive.archived = true;
                state.archivedNotes.push(noteToArchive);
                state.notes = state.notes.filter(note => note.id !== action.payload);
                state.activeNoteId = state.archivedNotes.length > 0 ? state.archivedNotes[0].id : null;

            }
        },
        restoreNote: (state, action) => {
            const noteToRestore = state.archivedNotes.find(note => note.id === action.payload);
            if (noteToRestore) {
                noteToRestore.archived = false;
                state.notes.push(noteToRestore);
                state.archivedNotes = state.archivedNotes.filter(note => note.id !== action.payload);
            }
        },
        setArchiveView: (state, action) => {
            state.isArchiveView = action.payload;

        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },

    },
});

// Add a selector to get all tags
export const getAllTags = (state) => {
    const tagsSet = new Set();
    state.note.notes.forEach(note => {
        note.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
};
// Add a selector to get filtered notes
export const getFilteredNotes = (state) => {
    const notes = state.note.isArchiveView ? state.note.archivedNotes : state.note.notes;
    const searchQuery = state.note.searchQuery.toLowerCase();
    const selectedTag = state.note.selectedTag;

    return notes.filter(note => {
        const matchesSearch = searchQuery === '' ||
            note.title.toLowerCase().includes(searchQuery) ||
            note.content.toLowerCase().includes(searchQuery) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchQuery));

        const matchesTag = !selectedTag || note.tags.includes(selectedTag);

        return matchesSearch && matchesTag;
    });
};

export const { addEmptyNote, updateNote, setActiveNote, setSelectedTag, deleteNote, archiveNote, restoreNote, setArchiveView, deleteArchivedNote, setSearchQuery, deleteAllNotes } = noteSlice.actions;
export default noteSlice.reducer;