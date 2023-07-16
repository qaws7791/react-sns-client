import TextArea from "@/components/TextArea/TextArea"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import api from '@/api/api'
import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "@/api/posts"
import { useQuery } from "react-query"
import { getUploadURL, uploadImageS3 } from "@/api/upload"
import Button from "@/components/Button"
import usePopup from "@/hooks/usePopup"
import * as S from './PostUpdatePage.Style'

const PostUpdatePage = () => {
  const [content, setContent] = useState('')
  const [isImageLoading,setImageLoading] = useState(false)
  const [imageUrl,setImageUrl] = useState(false)
  const [uploadUrl,setUploadUrl] = useState('')
  const [count,setCount] = useState(0)
  const { isLoading, isError, data } = useQuery("postUpdate", ()=>getPostById(postId))
  const { userId } = useSelector((state)=>state.auth)
  const { postId }  = useParams()
  const [openPopup] = usePopup()
  const navigate = useNavigate()
  const onSubmit = async (e) => {
    e.preventDefault()
    if(!content) {
      return await openPopup({title:'글 작성 실패', contents:'1글자 이상의 내용이 필요합니다.'})
    }
    try {
    await api.patch(`/post/${postId}`, { content, imageUrl })
    navigate(`/p/${postId}`)
    } catch (error) {
      await openPopup({ title:'안내',contents: error})
    }  
  }

  useEffect(() => {
    if(isLoading) return
    if(data.post.userId.id !== userId) {
      alert('권한이 없습니다.')
      navigate('/')
    }
    setContent(data.post.content)
    setImageUrl(data.post.imageUrl) 
  },[data, isLoading, isError,navigate, userId])

  const handleSubmitUploadImage = async (event) => {
    const file = event.target.files[0]
    if(!file) return
    setImageLoading(true)
    let res
    if(!uploadUrl) {
      try {
        res = await getUploadURL(file.name)
        setImageUrl(res.key)
        setUploadUrl(res.url)
      } catch(error) {
        console.log(error)
      }
    }
    await uploadImageS3(uploadUrl || res.url,file)
    setCount(prev=>prev+1)
    setImageLoading(false)
  }

  const handleRestoreImage = () => {
    setImageUrl(data.post.imageUrl)
  }

  const handleDeleteImage = () => {
    setImageUrl('')
  }

  if(isLoading) return <div>로딩중</div>
  if(!isLoading && !isError)
  return (
    <div>
      <h2>글 수정</h2>
      <form onSubmit={onSubmit}>
      <TextArea value={content} onChange={setContent}/>
      <input type='file' accept='image/*' onChange={handleSubmitUploadImage}/>
      {!isImageLoading && imageUrl && <>
      <div>
        <Button type="button" onClick={handleRestoreImage}>이미지 원래대로</Button>
        <Button type="button" onClick={handleDeleteImage}>❌이미지 삭제</Button>
      </div>
      <S.InputImagePreview width={200} src={imageUrl+'?'+count}/>
      </>}
      <Button>변경</Button>
      </form>
    </div>
  )
}

export default PostUpdatePage