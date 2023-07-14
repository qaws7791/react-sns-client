
import { createPost } from "@/api/posts"
import TextArea from "@/components/TextArea/TextArea"
import { useState } from "react"
import { getUploadURL, uploadImageS3 } from "@/api/upload"
import Button from "@/components/Button"
import { useNavigate } from "react-router-dom"
import usePopup from "@/hooks/usePopup"
import styled from "styled-components"

const PostWritePage = () => {
  const [content, setContent] = useState('')
  const [count,setCount] = useState(0)
  const [isImageLoading,setImageLoading] = useState(false)
  const [imageUrl,setImageUrl] = useState('')
  const [uploadUrl,setUploadUrl] = useState('')
  const [openPopup] = usePopup()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!content) {
      return await openPopup({title:'글 작성 실패', contents:'1글자 이상의 내용이 필요합니다.'})
    }
    try {
      const { post } = await createPost({content,imageUrl})
      navigate(`/p/${post.id}`)
    } catch (error) {
      await openPopup({ title:'안내',contents: error})
    }  
  }

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

  const handleDeleteImage = () => {
    setImageUrl('')
  }

  return (
    <div>
      <h2>글 작성</h2>
      <Form onSubmit={onSubmit}>
      <TextArea value={content} onChange={setContent}/>
      <input type='file' accept='image/*' onChange={handleSubmitUploadImage}/>
      {imageUrl && <div><Button type="button" onClick={handleDeleteImage}>❌이미지 삭제</Button></div>}
      {!isImageLoading && imageUrl && <InputImagePreview width={200} src={imageUrl+'?'+count}/>}
      <div><Button fullWidth>작성</Button></div>
      </Form>
    </div>
  )
}

const Form = styled.form`
  gap: 2rem;
  display: flex;
  flex-direction: column;
`

const InputImagePreview = styled.img`
  max-height: 200px;
  object-fit: contain;
`

export default PostWritePage