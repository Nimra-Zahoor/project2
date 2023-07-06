import React, { useState } from 'react';
import './CreatePost.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function CreatePosts(props) {
  
  const { user } = props;
  let postId =1;
 
  const [post, setPost] = useState({id:1, userId: 1, title: '', body: '' });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };
  const getId = () =>{
    let existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    let prev_id;
    for(let i in existingPosts)
    {
        if(existingPosts[i].userId == user.id)
        {
          
           prev_id = existingPosts[i].id+1;
        }
    }
    return prev_id;
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    if (user.logged_in === true) {
      const newPost = {
        id: getId(),
        userId: user.id,
        title: post.title,
        body: post.body,
      };
      setPost({ id:newPost.id, userId: user.id, title: '', body: '' });

      console.log('Submitted post:', newPost);
      let existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
      existingPosts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(existingPosts));

      alert('Post added');
      navigate('/posts');
    } else {
      alert('Please Login for Creating posts');
      navigate('/login');
    }
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="Input"
          type="text"
          id="postTitle"
          name="title"
          placeholder="Post Title"
          value={post.title}
          onChange={handleInputChange}
        />
        <br />
        <textarea
          className="body"
          id="postBody"
          name="body"
          placeholder="Enter Post Text"
          value={post.body}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}
export default CreatePosts;
