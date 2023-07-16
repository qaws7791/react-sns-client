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
import * as S from './PostDetailPage.Style'

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
    await mutationAddComment.mutate({postId, comment})
  }

  const handleDeleteComment = async (commentId) => {
    await mutationDeleteComment.mutate({postId,commentId})
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
      <S.PostComments>

        <h3>댓글 작성</h3>
        <S.CommentWrite>
            <InputText value={comment} onChange={setComment} width="100%" />
            <Button onClick={handleAddComment}>댓글 쓰기</Button>
        </S.CommentWrite>

        <S.CommentsList>

          {data.post?.comments.map(comment=>
            <S.CommentItem key={comment.id}>
                <S.CommentHeader>
                <S.CommentUser>{comment.userId.name}</S.CommentUser>
                <S.CommentDate>{calculateRelativeTime(comment.createdAt)}</S.CommentDate>
                </S.CommentHeader>
                <S.CommentContent>{comment.content}</S.CommentContent>
              {comment.userId.id === userId && <Button onClick={()=>handleDeleteComment(comment.id)}>댓글 삭제</Button>}
            </S.CommentItem>
          )}
        </S.CommentsList>
      </S.PostComments>

    </div>
  )
}

export default PostDetailPage