import { Outlet } from "react-router"
import Dashboard from "./pages/Dashboard"
import { useSelector } from "react-redux"
import Dialog from "./components/Dialog"
import ArchiveDialog from "./components/ArchiveDialog"
import DeleteAll from "./components/DeleteAll"

function App() {


  const dialogType = useSelector((state) => state.dialog.dialogType)

  const darkMode = useSelector((state) => state.theme.darkMode)


  return (

    <div className={`overflow-hidden relative transition-colors duration-200 dark:bg-slate-950 ${darkMode ? 'dark' : ''}`}>
      <Dashboard />
      <Outlet />
      {dialogType === 'delete' && <Dialog />}
      {dialogType === 'archive' && <ArchiveDialog />}
      {dialogType === 'deleteAll' && <DeleteAll />}
    </div>



  )
}

export default App
