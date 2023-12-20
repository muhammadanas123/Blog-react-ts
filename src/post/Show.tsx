import { Button, Card, Col, Container, Figure, Form, Row, Stack } from "react-bootstrap"
import { usePosts } from "../store/Posts"
import { useNavigate, useParams } from "react-router-dom"
import { useComments } from "../store/Comments"
import { FormEvent, useRef } from "react"
import { useUsers } from "../store/Users"

function Show() {
  const { posts, handleDeletePost } = usePosts()
  const {users} = useUsers()
  const { id } = useParams()
  const navigate = useNavigate()
  const bodyRef = useRef<HTMLInputElement>(null)
  const commentId = useRef<string>('')
  const likesRef = useRef(0)
  const currentUser = JSON.parse(localStorage.getItem("current_user") || "{}")

  const postArray = posts.filter((post) => post.id === id)
  const [requestedPost] = postArray
  console.log(requestedPost)

  const {
    handleAddComment,
    handleDeleteComment,
    handleEditComment,
    comments,
    handleLikes
  } = useComments()

  const postComments = comments.filter((comment) => comment.postId === requestedPost.id)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (commentId.current) {
      handleEditComment(commentId.current, bodyRef.current!.value)
      commentId.current = ''
      bodyRef.current!.value = ""
    } else {
      handleAddComment(requestedPost.id, bodyRef.current!.value)
      bodyRef.current!.value = ""
    }
  }

  const commentOfUser = (userId: string) => {
    const filteredUserArray = users.filter((user) => user.id === userId)
    const [user] = filteredUserArray;
    return user.name
  }

  return (
    <>
      <Container className="w-50 mt-5">
        <Card className="text-center">
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>{requestedPost.title}</Card.Title>
            <Card.Text>{requestedPost.body}</Card.Text>
          </Card.Body>
          <Stack
            direction="horizontal"
            className="justify-content-center mb-2"
            gap={2}
          >
            {currentUser.id === requestedPost.userId && (
              <>
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => {
                    navigate(`/${requestedPost.id}/edit`)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    handleDeletePost(requestedPost.id)
                    navigate("/posts")
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </Stack>
          <Card.Footer className="text-muted">
            {requestedPost.createdAt.toString()}
          </Card.Footer>
        </Card>
      </Container>

      <Container className="mt-5" style={{ maxWidth: "1000px" }}>
        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Card
              className="shadow-0 border"
              style={{ backgroundColor: "#f0f2f5" }}
              // style={{ backgroundColor: "rgb(76 126 202)" }}
            >
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    className="mb-4"
                    placeholder="Type comment..."
                    ref={bodyRef}
                  />
                </Form>
                <Card className="mb-4">
                  {postComments.map((comment) => {
                    return (
                      <Card.Body key={comment.id}>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <p>{comment.body}</p>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            {currentUser.id === comment.userId && (
                              <>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteComment(comment.id)
                                  }
                                  style={{
                                    backgroundColor: "transparent",
                                    border: 0,
                                  }}
                                >
                                  <Figure.Image
                                    width={15}
                                    height={15}
                                    src="public/delete.png"
                                  />
                                </Button>

                                <Button
                                  type="button"
                                  onClick={() => {
                                    bodyRef.current!.value = comment.body
                                    commentId.current = comment.id
                                  }}
                                  style={{
                                    backgroundColor: "transparent",
                                    border: 0,
                                  }}
                                >
                                  <Figure.Image
                                    width={15}
                                    height={15}
                                    src="public/edit.png"
                                  />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <Card.Img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                              alt="avatar"
                              width="25"
                              height="25"
                            />
                            <p className="small mb-0 ms-2">
                              {commentOfUser(comment.userId)}
                            </p>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            {/* <p className="small text-muted mb-0">Upvote?</p> */}
                            <Button
                              type="button"
                              style={{
                                backgroundColor: "transparent",
                                border: 0,
                              }}
                              onClick={() => {
                                likesRef.current = likesRef.current + 1
                                handleLikes(comment.id, likesRef.current)
                              }}
                            >
                              👍🏻
                            </Button>
                            <p className="small text-muted mb-0">
                              {comment.likes}
                            </p>
                          </div>
                        </div>
                      </Card.Body>
                    )
                  })}
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Show
