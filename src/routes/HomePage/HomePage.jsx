
import { getPosts } from "@/api/posts"
import PostCard from "@/components/PostCard"
import { useQuery } from "react-query"

const HomePage = () => {
  const { isLoading, isError, data } = useQuery("posts", getPosts)
  if(isLoading) return <div>로딩중</div>
  if(!isLoading && !isError)
  return (
    <div>
      {data?.posts?.map((post)=> <PostCard isLink={true} key={post.id} post={post}/>)}
    </div>
  )
}

export default HomePage