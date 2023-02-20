import { useContext } from 'react'
import { UsersContext } from '../../contexts/users-context'
import TableRow from './components/table-row'

function UsersTable() {
  const { users } = useContext(UsersContext)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Middle name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Modified At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable
