import { Navigate } from "react-router-dom"
import { useUsers } from "../store/Users"
import AccountForm from "./AccountForm"

function Sign_in() {
  const page = "Sign in"
  const { doSignIn, isSignedIn, users } = useUsers()
  console.log('users from sign in file')
  console.log(users);
  // console.log(`user signed in ${isSignedIn}`)

  return (
    <>
      {!isSignedIn.current ? (
        <AccountForm page={page} onSubmit={doSignIn} />
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export default Sign_in
