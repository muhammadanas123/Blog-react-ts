import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UsersProvider } from './store/Users.tsx'
import { PostsProvider } from './store/Posts.tsx'
import { CommentsProvider } from './store/Comments.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UsersProvider>
      <PostsProvider>
        <CommentsProvider>
          <App />
        </CommentsProvider>
      </PostsProvider>
    </UsersProvider>
  </BrowserRouter>
)
