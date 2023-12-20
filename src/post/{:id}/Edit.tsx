import { usePosts } from "../../store/Posts"
import PostForm from "../PostForm"

function Edit() {
  const page = 'Edit'
  const {handleEditPost} = usePosts()
  return (
    <>
      <PostForm page={page} onSubmit={handleEditPost} />
    </>
  )
}

export default Edit
