interface AppState {
  note: any; // Replace with the correct type for the note slice
  auth: any; // Replace with the correct type for the auth slice
  theme: any; // Replace with the correct type for the theme slice
}

export const loadState = (): AppState | undefined => {
  try {
    const serializedState = localStorage.getItem("noteAppState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state: AppState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("noteAppState", serializedState);
  } catch (error) {
    console.log("Error saving state:", error);
  }
};
