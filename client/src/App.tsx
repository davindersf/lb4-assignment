import { useReducer } from 'react'
import LoadData from './components/load-data'
import UsersTable from './components/users-table'
import { UsersContextProvider } from './contexts/users-context'

function App() {
  const [isTableVisible, toggleTableVisibility] = useReducer((v) => !v, false)

  return (
    <div>
      {isTableVisible === false && <button onClick={toggleTableVisibility}>Load Data</button>}
      {isTableVisible && (
        <UsersContextProvider>
          <LoadData />
          <UsersTable />
        </UsersContextProvider>
      )}
    </div>
  )
}

export default App
