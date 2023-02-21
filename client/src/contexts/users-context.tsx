import { createContext, useEffect, useState } from 'react'
import { deleteUserById, getUsers, updateUserById } from '../queries/user'
import { User } from '../types/user'

type UsersContextType = {
  users: User[]
  reloadData: () => void
  deleteUser: (id: number) => void
  updateUser: (id: number, updates: Partial<Omit<User, 'id'>>) => void
}

export const UsersContext = createContext<UsersContextType>(null!)

type UsersContextProviderProps = {
  children: React.ReactNode
}

export const UsersContextProvider = ({ children }: UsersContextProviderProps) => {
  const [users, setUsers] = useState<User[]>()
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)

  function loadData() {
    setIsLoadingUsers(true)
    getUsers()
      .then((data) => setUsers(data))
      .catch(() => alert('failed to fetch data'))
      .finally(() => setIsLoadingUsers(false))
  }

  useEffect(() => {
    if (!users && !isLoadingUsers) {
      loadData()
    }
  }, [])

  function handleDeleteUser(id: number) {
    deleteUserById(id)
      .catch(() => alert('failed to delete user'))
      .finally(() => setUsers((prev) => prev!.filter((user) => user.id !== id)))
  }

  function handleUpdateUser(id: number, updates: Partial<Omit<User, 'id'>>) {
    updateUserById(id, updates)
      .catch((error) => alert(`failed to update user ${error.message}`))
      .finally(() =>
        setUsers((prev) =>
          prev!.map((user) => {
            if (user.id === id) {
              return { ...user, ...updates }
            }
            return user
          })
        )
      )
  }

  if (!users || isLoadingUsers) {
    return <div>Loading...</div>
  }

  return (
    <UsersContext.Provider
      value={{ users, reloadData: loadData, deleteUser: handleDeleteUser, updateUser: handleUpdateUser }}
    >
      {children}
    </UsersContext.Provider>
  )
}
