import { ReactNode, createContext, useContext, useState } from "react"

type CommentsProviderProps = {
  children: ReactNode
}

type Comment = {
  id: string
  userId: string
  postId: string
  body: string
  likes: number
}

type PostsContext = {
  comments: Comment[]
  handleAddComment: (postId: string, body: string) => void
  handleEditComment: (id: string, body: string) => void
  handleDeleteComment: (id: string) => void
  handleLikes: (id: string, likes: number) => void
}

const commentsContext = createContext<PostsContext | null>(null)

export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const existingComments = localStorage.getItem("comments") || "[]"
      return JSON.parse(existingComments) as Comment[]
    } catch (error) {
      return []
    }
  })

  const currentUser = JSON.parse(localStorage.getItem("current_user") || "{}")

  const handleAddComment = (postId: string, body: string) => {
    setComments((prev) => {
      const newComment: Comment = {
        id: Math.random().toString(),
        userId: currentUser.id,
        postId: postId,
        body: body,
        likes: 0
      }

      const newComments = [newComment, ...prev]
      localStorage.setItem("comments", JSON.stringify(newComments))
      return newComments
    })
  }

  const handleEditComment = (id: string, body: string) => {
    const requestedCommentArray = comments.filter((comment) => comment.id === id)
    const filteredComments = comments.filter((comment) => comment.id !== id)
    const [requestedComment] = requestedCommentArray

    const newComment = {
      ...requestedComment,
      body: body,
    }

    const newComments = [newComment, ...filteredComments]
    setComments(() => {
      localStorage.setItem("comments", JSON.stringify(newComments))
      return newComments
    })
  }

  const handleDeleteComment = (id: string) => {
    setComments((prev) => {
      const newComments = prev.filter((comment) => comment.id !== id)
      localStorage.setItem("comments", JSON.stringify(newComments))
      return newComments
    })
  }

  const handleLikes = (id: string, likes: number) => {
    const requestedCommentArray = comments.filter(
      (comment) => comment.id === id
    )
    const filteredComments = comments.filter((comment) => comment.id !== id)
    const [requestedComment] = requestedCommentArray

    const newComment = {
      ...requestedComment,
      likes: likes
    }

    const newComments = [newComment, ...filteredComments]
    setComments(() => {
      localStorage.setItem("comments", JSON.stringify(newComments))
      return newComments
    })
  }

  return (
    <commentsContext.Provider
      value={{
        comments,
        handleAddComment,
        handleEditComment,
        handleDeleteComment,
        handleLikes
      }}
    >
      {children}
    </commentsContext.Provider>
  )
}

export const useComments = () => {
  const commentsConsumer = useContext(commentsContext)
  if (!commentsConsumer) {
    throw new Error("useComments is used outside of provider")
  }

  return commentsConsumer
}
