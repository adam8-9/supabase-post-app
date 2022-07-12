import './App.css';
import { supabase } from './client'
import {useState,useEffect} from 'react'

function App() {
  const [posts,setPosts] = useState([])
  const [post,setPost] = useState({title:'', content:''})
  const {title,content} = post

  useEffect(()=>{ fetchPosts()},[])

  const fetchPosts = async ()=>{
   const {data} = await supabase.from('posts').select()
   setPosts(data)
   console.log(data)
  }

  const createPost = async ()=>{
    await supabase.from('posts').insert([{title,content}]).single()
    setPost({title:'', content:''})
    fetchPosts()
  }


  return (
    <div className="App">

    <form className='form'>
    <input
    placeholder='Title'
    value={title}
    onChange={(e)=>{setPost({...post,title:e.target.value})}}
    >
    </input>

    <textarea style={{margin:'1rem 0'}}
    placeholder='Content'
    value={content}
    onChange={(e)=>{setPost({...post,content:e.target.value})}}
    >
    </textarea>

    <button onChange={createPost}>Create Post</button>

    </form>
 
    {posts.map(post =>(

    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>))}

    </div>
  )
}

export default App;
