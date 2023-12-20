import { usePosts } from '../store/Posts'
import PostForm from './PostForm'

function New() {
  const page = 'New'
  const { handleAddPost } = usePosts()

  return (
    <>
      <PostForm page={page} onSubmit={handleAddPost} />
    </>
  )
}

export default New
