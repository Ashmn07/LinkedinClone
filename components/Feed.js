import {useState,useEffect} from 'react'
import { useRecoilState } from 'recoil'
import { handlePostState, useSSRPostsState } from '../atoms/postAtom'
import Input from './Input'
import Post from './Post'

function Feed({posts}) {

  const [realTimePosts,setRealTimePosts] = useState([])
  const [handlePost,setHandlePost] = useRecoilState(handlePostState)
  const [useSSRPosts,setUseSSRPosts] = useRecoilState(useSSRPostsState)

  useEffect(()=>{
    const fetchPosts = async() => {
      const resp = await fetch("/api/posts",{
        method:"GET",
        headers:{
          "content-type": "application/json"
        },
      })
      const respData = await resp.json()
      console.log(respData)
      setRealTimePosts(respData)
      setHandlePost(false)
      setUseSSRPosts(false)
    }
    fetchPosts()
  },[handlePost])

  return (
    <div className="space-y-6 pb-24 max-w-lg">
        <Input/>
        {!useSSRPosts? realTimePosts.map((post) => <Post key={post._id} post={post} />)
        :posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  )
}

export default Feed