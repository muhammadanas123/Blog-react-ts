import { Button, Card, Container } from "react-bootstrap"
import { usePosts } from "../store/Posts"
import { useNavigate } from "react-router-dom"

type Post = {
  userId: string
  id: string
  title: string
  body: string
  createdAt: Date
}

type Posts = {
  postsData: Post[]
}

function Index({ postsData }: Posts) {
  const { handleDeletePost } = usePosts()
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem("current_user") || "{}")
  // console.log(posts)
  // const currentUserPosts = posts.filter((post) => post.userId === currentUser.id)

  return (
    <>
      <Container className="mt-4 w-50">
        <Card>
          <Card.Header>Featured</Card.Header>
          {postsData.map((post) => {
            return (
              <Card.Body key={post.id}>
                <Card.Title key={`title${post.id}`}>{post.title}</Card.Title>
                <Card.Text key={`body${post.id}`}>{post.body}</Card.Text>
                <Button
                  variant="outline-info"
                  className="me-2"
                  onClick={() => {
                    navigate(`/${post.id}`)
                  }}
                >
                  Show
                </Button>
                {currentUser.id === post.userId && (
                  <>
                    <Button
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => {
                        navigate(`/${post.id}/edit`)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Card.Body>
            )
          })}
        </Card>
      </Container>
    </>
  )
}

export default Index
