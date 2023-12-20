import { usePosts } from "../store/Posts"
import Index from "./Index"

function Posts() {
  const {posts} = usePosts()
  return <Index postsData={posts} />
}

export default Posts
