export const loadState = () => {
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

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("noteAppState", serializedState);
    } catch (error) {
        console.log('erroor saving state', error);
    }
}

