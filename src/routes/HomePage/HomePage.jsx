
import { getPosts } from "@/api/posts"
import PostCard from "@/components/PostCard"
import { useQuery } from "react-query"
import { styled } from "styled-components"

const Container = styled.div`
  
`

const HomePage = () => {
  const { isLoading, isError, data } = useQuery("posts", getPosts)
  if(isLoading) return <div>로딩중</div>
  if(!isLoading && !isError)
  return (
    <Container>
      {data?.posts?.map((post)=> <PostCard isLink={true} key={post.id} post={post}/>)}
    </Container>
  )
}

export default HomePage