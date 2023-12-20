import "bootstrap/dist/css/bootstrap.min.css"
// import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import Sign_in from "./account/Sign_in"
import Sign_up from "./account/Sign_up"
import { useUsers } from "./store/Users"
import NavBar from "./NavBar"
import New from "./post/New"
import Edit from "./post/{:id}/Edit"
import Show from "./post/Show"
import Search from "./Search"
import Posts from "./post/Posts"
import Profile from "./account/Profile"


function App() {
  const { isSignedIn } = useUsers()
  const signedIn = localStorage.getItem("isSignedIn") || 'false'
  isSignedIn.current = JSON.parse(signedIn)
  // console.log(`from app component and user signed in ${isSignedIn.current}`)


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/sign_in" element={<Sign_in />} />
        <Route path="/sign_up" element={<Sign_up />} />
        {!isSignedIn.current && (
          <Route path="/*" element={<Navigate to="/sign_in" />} />
        )}
        {isSignedIn.current && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/new" element={<New />} />
            <Route path="/:id" element={<Show />} />
            <Route path="/:id/edit" element={<Edit />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
