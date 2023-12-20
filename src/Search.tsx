import { ChangeEvent, useState } from "react"
import { usePosts } from "./store/Posts"
import { Container, Form } from "react-bootstrap"
import Index from "./post/Index"

function Search() {
  const { handleSearch } = usePosts()
  const [query, setQuery] = useState<string>()

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <>
      <Container className="w-50 mt-3">
        <Form.Control
          type="text"
          placeholder="Search ..."
          value={query}
          onChange={handleQuery}
        />

      </Container>
      {query && <Index postsData={handleSearch(query!)} />}
    </>
  )
}

export default Search
