import { useState } from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useUsers } from '../store/Users'

// type User = {
//   id: string
//   name: string
//   email: string
//   password: string
// }

type FormProps = {
  page: string
  onSubmit: (name: string, email: string, password: string) => void | boolean
}

function AccountForm({page, onSubmit}: FormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { isSignedIn } = useUsers()


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (page === "Sign up") {
      try {
        onSubmit( name, email, password)
        navigate("/sign_in")
      } catch (error) {
        alert(error)
      }
    } else if (page === "Sign in") {
      console.log(`before ${isSignedIn.current}`)

      const SignedIn = onSubmit(name, email, password )

      console.log(`after ${isSignedIn.current}`)

      if (SignedIn) {
        // navigate("/")
      }else {
        alert("There is some problem to sign you in.")
      }
    }
  }

  return (
    <>
      <Container className="mt-4 w-25">
        <h1 className="text-center mb-4">{page} form</h1>
        <Form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <Form.Control
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <Form.Control
              required
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <Form.Control
              required
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Button type="submit" variant="outline-dark">
              {page}
            </Button>
          </Stack>
        </Form>
      </Container>
    </>
  )
}

export default AccountForm
