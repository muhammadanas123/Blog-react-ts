import { FormEvent, useEffect, useRef } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { usePosts } from "../store/Posts"

// type Post = {
//   userId: string
//   id: string
//   title: string
//   body: string
// }

type FormProps = {
  page: string
  onSubmit: (id: string, title: string, body: string) => void
}


function PostForm({ page, onSubmit }: FormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const {posts} = usePosts()
  const navigate = useNavigate()

  const { id } = useParams()
  console.log(id)

  const setFields = () => {
    // console.log(posts)

    const requestedPostForEdit = posts.filter((post) => post.id===id)
    const [post] = requestedPostForEdit
    titleRef.current!.value = post.title
    bodyRef.current!.value = post.body
  }

  useEffect(() => {
    if (page==='Edit'){
      setFields()
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (page === 'New') {
      try {
        onSubmit(Math.random().toString(), titleRef.current!.value, bodyRef.current!.value)
        navigate("/posts")
      } catch (error) {
        alert(error)
      }
    }else if (page === 'Edit') {
      try {
        onSubmit(id!, titleRef.current!.value, bodyRef.current!.value)
        navigate("/posts")
      } catch (error) {
        alert(error)
      }
    }
  }

  return (
    <>
      <Container className="w-50">
        <h1>{`${page} post`}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              ref={titleRef}
              type="text"
              required
              placeholder="Post's title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              ref={bodyRef}
              required
              rows={3}
              placeholder="Post's content"
            />
          </Form.Group>
          <Button type="submit" variant="outline-dark">
            {page==='New' ? 'Save' : 'Update'}
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default PostForm
