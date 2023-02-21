import { User } from '../types/user'
import { client } from '../utils/client'

export async function getUsers() {
  const { data } = await client.get<User[]>('/users')
  return data
}

export async function deleteUserById(id: number) {
  await client.delete(`/users/${id}`)
}

export async function updateUserById(id: number, updates: Partial<Omit<User, 'id'>>) {
  const { data } = await client.patch<User>(`/users/${id}`, updates)
  return data
}
