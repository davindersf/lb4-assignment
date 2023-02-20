import { useContext } from 'react'
import { UsersContext } from '../../contexts/users-context'

export default function LoadData() {
  const { reloadData } = useContext(UsersContext)

  return <button onClick={reloadData}>Refresh data</button>
}
