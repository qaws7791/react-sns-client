import { addComment, deleteComment } from "@/api/comment"
import { getPostById } from "@/api/posts"
import Button from "@/components/Button"
import InputText from "@/components/InputText"
import PostCard from "@/components/PostCard"
import { calculateRelativeTime } from "@/utils/date"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

const PostDetailPage = () => {
  const { postId }  = useParams()
  const { userId } = useSelector((state) => state.auth)
  const [comment,setComment] = useState('')
  const { isLoading, isError, data } = useQuery("postDetail", ()=>getPostById(postId))
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const mutationAddComment = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("postDetail")
    }
  })

  const mutationDeleteComment = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("postDetail")
    }
  })


  const handleAddComment = async () => {
    const res =await mutationAddComment.mutate({postId, comment})
  }

  const handleDeleteComment = async (commentId) => {
    const res = await mutationDeleteComment.mutate({postId,commentId})

  }

  useEffect(()=>{
    if(!isLoading) {
      if(isError || !data) navigate('/')
    }
  },[isLoading,isError,data,navigate,userId])

  if(isLoading) return <div>로딩중</div>
  if(!isLoading && !isError)
  return (
    <div>
      <PostCard isLink={false} post={data.post}/>
      <PostComments>

        <h3>댓글 작성</h3>
        <CommentWrite>
            <InputText value={comment} onChange={setComment} width="100%" />
            <Button onClick={handleAddComment}>댓글 쓰기</Button>
        </CommentWrite>

        <CommentsList>

          {data.post?.comments.map(comment=>
            <CommentItem key={comment.id}>
                <CommentHeader>
                <CommentUser>{comment.userId.name}</CommentUser>
                <CommentDate>{calculateRelativeTime(comment.createdAt)}</CommentDate>
                </CommentHeader>
                <CommentContent>{comment.content}</CommentContent>
              {comment.userId.id === userId && <Button onClick={()=>handleDeleteComment(comment.id)}>댓글 삭제</Button>}
            </CommentItem>
          )}
        </CommentsList>
      </PostComments>

    </div>
  )
}


const PostComments = styled.div`
  
`

const CommentWrite = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin: 0 20px;
`

const CommentsList = styled.ul`
  
`
const CommentItem = styled.li`
  padding: 1rem;
  box-shadow: 0 -1px 0 0 #ccc inset;
`

const CommentHeader = styled.div`
  gap: 2rem;
  display: flex;
`

const CommentUser = styled.span`
  font-weight: 600;
`

const CommentContent = styled.p`
  
`

const CommentDate = styled.span`
    color: #757575;
`

export default PostDetailPage