import { ReactNode, createContext, useContext, useState } from "react"

export type PostsProviderProps = {
  children: ReactNode
}

type Post = {
  userId: string
  id: string
  title: string
  body: string
  createdAt: Date
}

type PostsContext = {
  posts: Post[]
  handleAddPost: (id: string, title: string, body: string) => void
  handleEditPost: (id: string, title: string, body: string) => void
  handleDeletePost: (id: string) => void
  handleSearch: (query: string) => Post[]
}

const postsContext = createContext<PostsContext | null>(null)

export const PostsProvider = ({ children }: PostsProviderProps) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const existingPosts = localStorage.getItem("posts") || "[]"
      return JSON.parse(existingPosts) as Post[]
    } catch (error) {
      return []
    }
  })
  const currentUser = JSON.parse(localStorage.getItem("current_user") || "{}")

  const handleAddPost = (id: string, title: string, body:string) => {
    setPosts((prev) => {
      const newPost = {
        userId: currentUser.id,
        id: id,
        title: title,
        body: body,
        createdAt: new Date()
      }
      const newPosts = [newPost, ...prev]

      localStorage.setItem("posts", JSON.stringify(newPosts))
      return newPosts
    })
  }

  const handleEditPost = (id: string, title: string, body: string) => {
    const isPostExist = posts.some((obj) => obj.id === id)

    if (isPostExist) {
      setPosts((prev) => {
        const filteredPosts = prev.filter((p) => p.id !== id)
        const postArray = prev.filter((p) => p.id === id)
        const [requestedPost] = postArray

        const newPost = {
          userId: currentUser.id,
          id: id,
          title: title,
          body: body,
          createdAt: requestedPost.createdAt
        }

        const newPosts = [newPost, ...filteredPosts]
        localStorage.setItem("posts", JSON.stringify(newPosts))
        return newPosts
      })
    } else {
      alert("not found your requested post")
    }
  }

  const handleDeletePost = (id: string) => {
    console.log(id)
    setPosts((prev) => {
      const filteredPosts = prev.filter((post) => post.id !== id)
      // console.log(filteredPosts)
      localStorage.setItem("posts", JSON.stringify(filteredPosts))
      return filteredPosts
    })
  }

  const handleSearch = (query: string) => {
    const searchedData = posts.filter((post) => post.body.toLowerCase().includes(query.toLowerCase()) || post.title.toLowerCase().includes(query.toLowerCase()))
    return searchedData
  }

  return (
    <>
      <postsContext.Provider
        value={{
          posts,
          handleAddPost,
          handleEditPost,
          handleDeletePost,
          handleSearch,
        }}
      >
        {children}
      </postsContext.Provider>
    </>
  )
}

export const usePosts = () => {
  const postsConsumer = useContext(postsContext)
  if (!postsConsumer) {
    throw new Error("usePosts is used outside of provider")
  }

  return postsConsumer
}
