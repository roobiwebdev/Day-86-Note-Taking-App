import React from "react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/noteSlice";
import { useNavigate } from "react-router";
import { logout } from "../store/authSlice";
import toast from "react-hot-toast";
import { toggleTheme } from "../store/themeSlice";

// Define the types for the Redux state
interface RootState {
  note: {
    notes: any[]; // Replace with your note data structure type
    isArchiveView: boolean;
    archivedNotes: any[]; // Replace with your note data structure type
    searchQuery: string;
    selectedTag: string;
  };
  auth: {
    isAuthenticated: boolean;
  };
  theme: {
    darkMode: boolean;
  };
}

const NavBar: React.FC = () => {
  const notes = useSelector((state: RootState) => state.note.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isArchiveView = useSelector(
    (state: RootState) => state.note.isArchiveView
  );
  const archivedNotes = useSelector(
    (state: RootState) => state.note.archivedNotes
  );
  const searchQuery = useSelector((state: RootState) => state.note.searchQuery);
  const selectedTag = useSelector((state: RootState) => state.note.selectedTag);
  const isloggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    if (isloggedIn) {
      dispatch(logout());
    }
    navigate("/");
    toast.success("Logged out successfully!");
  };

  return (
    <div className="flex flex-row items-center justify-between px-8 py-4 border-b border-b-neutral-200 w-full dark:bg-slate-950 dark:border-b-slate-600 dark:text-white">
      <h1 className="text-2xl font-bold">
        {isArchiveView
          ? `Archived Notes (${archivedNotes.length})`
          : searchQuery
          ? `Showing results for: ${searchQuery}`
          : selectedTag
          ? `Notes with tag: ${selectedTag}`
          : `All Notes (${notes.length})`}
      </h1>
      <div className="flex items-center gap-3">
        <div className="flex relative items-center">
          <MagnifyingGlassIcon className="w-5 h-5 stroke-neutral-500 dark:stroke-slate-400 absolute ml-3" />
          <input
            type="search"
            name="search"
            id="search"
            className="py-3 px-9 border text-neutral-950 placeholder-neutral-500 border-neutral-200 rounded-lg decoration-neutral-300 text-sm dark:text-white dark:bg-slate-950 dark:border-slate-600 dark:placeholder-slate-400 focus:outline-none"
            placeholder="Search by title, content, or tags..."
            size={28}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            className="py-3 px-3 hover:bg-neutral-100 border border-neutral-200 dark:border-slate-600 dark:hover:bg-slate-800 rounded-lg"
            onClick={handleThemeChange}
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 stroke-neutral-500 dark:stroke-white" />
            ) : (
              <MoonIcon className="w-5 h-5 stroke-neutral-500 dark:stroke-white" />
            )}
          </button>
          <button
            className="py-3 px-3 hover:bg-neutral-100 border border-neutral-200 rounded-lg dark:border-slate-600 dark:hover:bg-slate-800"
            onClick={handleLogout}
          >
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5 stroke-neutral-500 dark:stroke-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
