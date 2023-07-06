import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Posts/posts.css';
import Comments from '../Comments/Comments';

function Posts(props) {
  const [data, setData] = useState([]);
  const [createdPost, setCreatedPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const User = props.user;
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    setCreatedPosts(JSON.parse(localStorage.getItem('posts')) || []);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const addNewPost = () => {
    navigate('/createPost');
  };

  const handleEdit = (postId, title, body) => {
    setEditingPostId(postId);
    setEditedTitle(title);
    setEditedBody(body);
  };

  const handleUpdatePost = (postId) => {
    const updatedPosts = createdPost.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          title: editedTitle,
          body: editedBody,
        };
      }
      return post;
    });

    setCreatedPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    
    setEditingPostId(null);
    setEditedTitle('');
    setEditedBody('');
  };

  const handleDelete = (postId) => {
    const updatedPosts = createdPost.filter((post) => post.id !== postId);
    setCreatedPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  }
  return (
    <div>
      <div className='container'>
        <h1 className='title'>Posts</h1>
        <div className='addPosts'>
          <button className='plusBtn' onClick={addNewPost}>
            +
          </button>
        </div>
        {createdPost.map((item) => (
          <div className='posts' key={item.id}>
           
            {editingPostId === item.id ? (
              <div>
                <textarea
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder='Enter title...'
                />
                <textarea
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                  placeholder='Enter post...'
                />
                <button
                  className='save-btn'
                  onClick={() => handleUpdatePost(item.id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <h3>Title:</h3>
                <p>{item.title}</p>
                <h3>Post:</h3>
                <p>{item.body}</p>
                <button
                  className='edit-btn'
                  onClick={() => handleEdit(item.id, item.title, item.body)}
                >
                  Edit
                </button>
                <button
                  className='delete-btn'
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <Comments postId={item.id} userId={item.userId} />
              </>
            )}
          </div>
        ))}
        {data.map((item) => (
          <div className='posts' key={item.id}>
            <h5>Post by user: {item.userId}</h5>
            <h5>Post ID: {item.id}</h5>
            {!editingPostId === item.id ? (
              <div>
                <textarea
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder='Enter title...'
                />
                <textarea
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                  placeholder='Enter post...'
                />
                <button
                  className='save-btn'
                  onClick={() => handleUpdatePost(item.id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <h3>Title:</h3>
                <p>{item.title}</p>
                <h3>Post:</h3>
                <p>{item.body}</p>
                <button
                  className='edit-btn'
                  onClick={() => handleEdit(item.id, item.title, item.body)}
                >
                  Edit
                </button>
                <button
                  className='delete-btn'
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <Comments postId={item.id} userId={item.userId} />
                                      </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
            }
export default Posts;