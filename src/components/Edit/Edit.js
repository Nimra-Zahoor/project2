import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();

  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (location.state) {
      const { postId, title, body } = location.state;
      setPostId(postId);
      setTitle(title);
      setBody(body);
    }
  }, [location.state]);

  const handleUpdatePost = () => {
    // Perform update logic here
    // For simplicity, we'll just log the updated data
    console.log('Updated Post ID:', postId);
    console.log('Updated Title:', title);
    console.log('Updated Body:', body);

    // Pass the updated data back to the Posts component
    navigate('/posts', {
      state: {
        postId,
        title,
        body
      }
    });
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <div>
        <label>Post ID:</label>
        <input type="text" value={postId} disabled />
      </div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleUpdatePost}>Update Post</button>
    </div>
  );
}

export default EditPost;
