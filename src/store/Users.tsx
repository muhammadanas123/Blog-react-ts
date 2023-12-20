import { MutableRefObject, ReactNode, createContext, useContext, useRef, useState } from "react"

export type UsersProviderProps = {
  children: ReactNode
}

export type User = {
  id: string
  name: string
  email: string
  password: string
}


export type UsersContext = {
  users: User[]
  handleAddUser: (name: string, email: string, password: string) => void
  handleDeleteUser: (email: string) => void
  isSignedIn: MutableRefObject<boolean>
  doSignIn: (name: string, email: string, password: string) => boolean
  doSignOut: () => void
}

const usersContext = createContext<UsersContext | null>(null)

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const existingUsers = localStorage.getItem("users")|| "[]"
      return JSON.parse(existingUsers) as User[]
    } catch (error) {
      return []
    }
  })

  const isSignedIn = useRef<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | object>({})

  const handleAddUser = (name: string, email: string, password: string) => {
    setUsers((prev) => {
      const newUser = {
        id: Math.random().toString(),
        name: name,
        email: email,
        password: password
      }
      const newUsers: User[] = [newUser, ...prev]

      localStorage.setItem("users", JSON.stringify(newUsers))

      return newUsers
    })
  }

  const handleDeleteUser = (email: string) => {
    setUsers((prev) => {
      const filteredUsers = prev.filter((user) => {
        user.email !== email
      })

      localStorage.setItem("users", JSON.stringify(filteredUsers))

      return filteredUsers
    })
  }

  const doSignIn = (name: string, email: string, password: string) => {

    const registeredUserArray = users.filter((obj) => obj.name === name && obj.email === email && obj.password === password)
    const [registeredUser] = registeredUserArray

    if (registeredUser) {
      setSignedIn()
      setCurrentUser(() => {
        localStorage.setItem("current_user", JSON.stringify(registeredUser))
        return registeredUser
      })
      return true
    }else {
      return false
    }
  }

  const doSignOut = () => {
    unsetSignedIn()
    setCurrentUser(() => {
      localStorage.setItem("current_user", JSON.stringify({}))
      return {}
    })

  }

  const setSignedIn = () => {
    isSignedIn.current = true
    localStorage.setItem("isSignedIn", JSON.stringify(isSignedIn.current))
  }

  const unsetSignedIn = () => {
    isSignedIn.current = false
    localStorage.setItem("isSignedIn", JSON.stringify(isSignedIn.current))
  }

  return (
    <>
      <usersContext.Provider
        value={{
          users,
          handleAddUser,
          handleDeleteUser,
          isSignedIn,
          doSignIn,
          doSignOut
        }}
      >
        {children}
      </usersContext.Provider>
    </>
  )
}

export const useUsers = () => {
  const usersConsumer = useContext(usersContext)
  if (!usersConsumer) {
    throw new Error("useUsers is used outside of provider")
  }

  return usersConsumer
}
