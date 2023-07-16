import { addLike, deleteLike } from "@/api/like"
import { deletePost } from "@/api/posts"
import IconOnlyButton from "@/components/IconOnlyButton"
import Modal from "@/components/Modal/Modal"
import usePopup from "@/hooks/usePopup"
import { calculateRelativeTime } from "@/utils/date"
import { ChatCircle, DotsThree, Heart,  } from "@phosphor-icons/react"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import * as S from './PostCard.Style'
import PropTypes from 'prop-types';

const PostCard = ({post, isLink=false}) => {
  const [openPopup] = usePopup()
  const [isModalOpen,setModalOpen] = useState(false)
  const { content, id: postId, userId: postUser, createdAt,likes, imageUrl} = post
  const { userId:currentUserId } = useSelector((state) => state.auth)
  const { name:userName } = postUser
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const mutationDeletePost = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    }
  })

  const mutationAddLike = useMutation(addLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
      queryClient.invalidateQueries('postDetail')
    }
  })
  const mutationDeleteLike = useMutation(deleteLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
      queryClient.invalidateQueries('postDetail')
    }
  })


  const handleClickShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.host}/p/${postId}`);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
    setModalOpen(false)
  }

  const handleDeletePost = async () => {
    if(!currentUserId || currentUserId !== postUser.id) {
      return await openPopup({title:'안내', contents:'권한이 없습니다.'})
    }
    const confirm = await openPopup({title:'안내',contents:'정말 삭제하시겠습니까?', type:'confirm'})
    if(!confirm) return
    await mutationDeletePost.mutate(postId)
    navigate('/')
  }
  const getLikeStatus = () => {
    return likes.includes(postUser.id) 
    
  }

  const handleLike = async () => {
    mutationAddLike.mutate(postId)
   }
 
   const handleUnlike = async() => {
     mutationDeleteLike.mutate(postId)
   }

  return (
    <S.Container>
    <S.PostHeader>
      <S.PostInfo>
        <S.UserName>{userName}</S.UserName>
        <S.PostDate>· {calculateRelativeTime(createdAt)}</S.PostDate>
      </S.PostInfo>
      <IconOnlyButton icon={<DotsThree/>} label='더 보기' onClick={()=>setModalOpen(true)}/>
      <Modal isOpen={isModalOpen} closeFunc={()=>setModalOpen(false)}>
          <S.ModalList onClick={()=>setModalOpen(false)}>
            <S.ModalItem onClick={handleClickShare}>공유하기</S.ModalItem>
            {postUser.id === currentUserId 
              && 
              <>
              <S.ModalItem onClick={()=>navigate(`/m/update/${postId}`)}>수정하기</S.ModalItem>
              <S.ModalItem onClick={handleDeletePost}>글 삭제</S.ModalItem>
              </>
            }
            <S.ModalItem onClick={()=>setModalOpen(false)}>닫기</S.ModalItem>
          </S.ModalList>
        </Modal>
    </S.PostHeader>

    <S.PostContent>
      <S.PostText>
      {content}
      </S.PostText>
      {imageUrl && <S.PostImage src={imageUrl}/>}
    </S.PostContent>
    <S.PostButtons>
        {getLikeStatus() ? 
        <IconOnlyButton icon={<Heart/>} color="red" weight="fill" label="좋아요 취소" onClick={handleUnlike}/>
        :<IconOnlyButton icon={<Heart/>} label="좋아요" onClick={handleLike}/>}
        <span>좋아요: {post.likes.length}개</span>
        {isLink 
        ? <Link to={`/p/${postId}`}><IconOnlyButton icon={<ChatCircle/>} label="댓글 보기"/></Link>:
        <IconOnlyButton icon={<ChatCircle/>} label="댓글"/>}
        <span>댓글: {post.comments.length}개</span>
    </S.PostButtons>
  </S.Container>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string,
    userId: PropTypes.object,
    createdAt: PropTypes.number,
    comments: PropTypes.array,
    likes: PropTypes.array,
    imageUrl: PropTypes.string,

  }),
  isLink: PropTypes.bool
}

export default PostCard