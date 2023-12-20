import { Navigate } from "react-router-dom"
import { useUsers } from "../store/Users"
import AccountForm from "./AccountForm"

function Sign_up() {
  const page = "Sign up"
  const { handleAddUser, isSignedIn } = useUsers()
  return (
    <>
      {!isSignedIn.current ? (
        <AccountForm page={page} onSubmit={handleAddUser} />
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export default Sign_up
