import React, { useState } from 'react';
import './CreatePost.css';
import { useNavigate } from 'react-router-dom';

function CreatePosts(props) {
  const [post, setPost] = useState({ id: 0, userId: 0, title: '', body: '' });
  const User = props.user;
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };
  const getpostId = () =>{
    setPost({userId:User.id})
    setPost({id: post.id=post.id + 1})
    return post;
  }
  const handleSubmit = (event) => {
   
    event.preventDefault();
    console.log('Working');
    if (User.logged_in === true) { 
        post.id = post.id+1;
      const newPost = getpostId();
      console.log('Submitted post:', newPost);
      let existingPosts = JSON.parse(localStorage.getItem('post')) || [];
      existingPosts.push(newPost);
      localStorage.setItem('post', JSON.stringify(existingPosts));
       alert('Post added')
      navigate('/posts');

    }
    else{
        alert('Please Login for Creating posts')
        navigate('/login')
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
       
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
