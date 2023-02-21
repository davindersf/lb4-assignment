import { useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import { UsersContext } from '../../../contexts/users-context'
import { Role, User } from '../../../types/user'

export type TableRowProps = {
  user: User
}

export default function TableRow({ user }: TableRowProps) {
  const [isEditable, setIsEditable] = useState(false)

  function handleSetEditable(updatedValue: boolean) {
    setIsEditable(updatedValue)
  }

  return (
    <>
      {isEditable ? (
        <EditableRow user={user} setEditable={handleSetEditable} />
      ) : (
        <BasicRow user={user} setEditable={handleSetEditable} />
      )}
    </>
  )
}

interface BasicRowProps extends TableRowProps {
  setEditable: (value: boolean) => void
}

function BasicRow({ user, setEditable }: BasicRowProps) {
  const { deleteUser: deleteUserById } = useContext(UsersContext)

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.middleName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.role}</td>
      <td>{user.createdOn}</td>
      <td>{user.modifiedOn}</td>
      <td>
        <button onClick={() => setEditable(true)}>Edit</button>
        <button onClick={() => deleteUserById(user.id)}>Delete</button>
      </td>
    </tr>
  )
}

interface EditableRowProps extends Pick<TableRowProps, 'user'> {
  setEditable: (value: boolean) => void
}

function EditableRow({ user, setEditable: setEditable }: EditableRowProps) {
  const { updateUser: updateUserById } = useContext(UsersContext)

  const [firstName, setFirstName] = useState(user.firstName)
  const [middleName, setMiddleName] = useState(user.middleName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [role, setRole] = useState(user.role)
  const [createdOn, setCreatedOn] = useState(user.createdOn ? new Date(user.createdOn) : undefined)
  const [modifiedOn, setModifiedOn] = useState(user.modifiedOn ? new Date(user.modifiedOn) : undefined)

  function handleCancel() {
    setFirstName(user.firstName)
    setMiddleName(user.middleName)
    setLastName(user.lastName)
    setEmail(user.email)
    setPhone(user.phone)
    setRole(user.role)
    setCreatedOn(user.createdOn ? new Date(user.createdOn) : undefined)
    setModifiedOn(user.modifiedOn ? new Date(user.modifiedOn) : undefined)

    setEditable(false)
  }

  function handleSave() {
    if (!firstName) {
      alert('first name is required!')
      return
    }
    if (!email) {
      alert('email is required!')
      return
    }
    if (!role) {
      alert('role is required!')
      return
    }
    updateUserById(user.id, {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      role,
      createdOn: createdOn?.toISOString(),
      modifiedOn: modifiedOn?.toISOString(),
    })

    setEditable(false)
  }

  return (
    <tr>
      <td>{user.id}</td>
      <td>
        <input
          type="text"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value)
          }}
        />
      </td>
      <td>
        <input
          type="text"
          value={middleName ?? ''}
          onChange={(event) => {
            setMiddleName(event.target.value)
          }}
        />
      </td>
      <td>
        <input
          type="text"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value)
          }}
        />
      </td>
      <td>
        <input
          type="text"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
          }}
        />
      </td>
      <td>
        <input
          type="number"
          value={phone}
          onChange={(event) => {
            if (event.target.value) {
              setPhone(+event.target.value)
            } else {
              setPhone(undefined)
            }
          }}
        />
      </td>
      <td>
        <select
          value={role}
          onChange={(event) => {
            setRole(event.target.value as Role)
          }}
        >
          {Object.keys(Role).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </td>
      <td>
        <DatePicker selected={createdOn} onChange={(date) => setCreatedOn(date ?? undefined)} />
      </td>
      <td>
        <DatePicker selected={modifiedOn} onChange={(date) => setModifiedOn(date ?? undefined)} />
      </td>
      <td>
        <button onClick={() => handleSave()}>Save</button>
        <button onClick={() => handleCancel()}>Cancel</button>
      </td>
    </tr>
  )
}
