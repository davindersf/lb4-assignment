import { createContext, useState } from 'react'
import USERS from '../assets/data.json'
import { Role, User } from '../types/user'

function initUsers() {
  return USERS.map(
    (user) =>
      new User({
        firstName: user.firstName,
        middleName: user.middleName ?? undefined,
        lastName: user.lastName ?? undefined,
        email: user.email,
        phone: user.phone,
        role: Role[user.role as Role],
        createdOn: user.createdOn,
        modifiedOn: user.modifiedOn,
      })
  )
}

type UsersContextType = {
  users: User[]
  reloadData: () => void
  deleteUserById: (id: string) => void
  updateUserById: (id: string, updates: Partial<Omit<User, 'id'>>) => void
}

export const UsersContext = createContext<UsersContextType>(null!)

type UsersContextProviderProps = {
  children: React.ReactNode
}

export const UsersContextProvider = ({ children }: UsersContextProviderProps) => {
  const [users, setUsers] = useState<User[]>(initUsers)

  function deleteUserById(id: string) {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  function updateUserById(id: string, updates: Partial<Omit<User, 'id'>>) {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          return { ...user, ...updates }
        }
        return user
      })
    )
  }

  function reloadData() {
    setUsers(initUsers())
  }

  return (
    <UsersContext.Provider value={{ users, reloadData, deleteUserById, updateUserById }}>
      {children}
    </UsersContext.Provider>
  )
}
