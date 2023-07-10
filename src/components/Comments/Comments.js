import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Comments.css';

const Comments = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState()
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [newComment, setNewComment] = useState('');


  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const allComment = localStorage.getItem('comments')
        let existingComments = [];
        if (allComment) {
          existingComments = JSON.parse(allComment) || [];
        }
        setComments([...existingComments, ...response.data]);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId]);

  const saveCommentsToLocalStorage = (updatedComments) => {
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const getId = () => {
    const allComments = localStorage.getItem('comments')
    if (allComments) {
      const existingComments = JSON.parse(allComments) || []
      console.log(existingComments?.length)
      return existingComments?.length + 1;
    }
    else {
      return 1;
    }

  }

  const handleAddComment = () => {
    const comment = {
      id: getId(),
      postId: postId,
      user_id: currentUser.id,
      body: newComment,
    };
    const existingComments = JSON.parse(localStorage.getItem('comments')) || []
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    saveCommentsToLocalStorage([...existingComments, comment]);

    setNewComment('');
  };

  const handleEditComment = (commentId) => {
    const commentToEdit = [...comments].find(comment => comment.id === commentId && comment.user_id === currentUser.id);
    console.log('comment to edit', commentToEdit)
    if (commentToEdit) {
      setEditingCommentId(commentId);
      setEditingCommentText(commentToEdit.body);
    }
  };

  const handleUpdateComment = (commentId) => {
    const existingComments = JSON.parse(localStorage.getItem('comments')) || []
    const updatedComments = existingComments.map(comment =>
      comment.id === commentId && comment.user_id === currentUser.id ? { ...comment, body: editingCommentText } : comment
    );
    const allUpdatedComments = [...comments].map(comment =>
      comment.id === commentId && comment.user_id === currentUser.id ? { ...comment, body: editingCommentText } : comment
    );
    setComments(allUpdatedComments);
    saveCommentsToLocalStorage(updatedComments);
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  const handleDeleteComment = (commentId) => {
    const existingComments = JSON.parse(localStorage.getItem('comments')) || [];
    const updatedComments = existingComments.filter(comment => comment.id !== commentId || comment.user_id !== currentUser.id);
    setComments(updatedComments);
    saveCommentsToLocalStorage(updatedComments);
  };

  return (
    <div key={postId}>
      <h3>Comments</h3>
      <form>
        <textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button type="button" onClick={handleAddComment}>
          Add Comment
        </button>
        <br />
      </form>
      <ul>
        {comments.map((comment) => (
          postId === comment.postId &&
          <li key={comment.id}>

            {editingCommentId === comment.id && comment.user_id === currentUser.id ? (
              <div>
                <textarea
                  value={editingCommentText}
                  onChange={(e) => setEditingCommentText(e.target.value)}
                ></textarea>
                <button onClick={() => handleUpdateComment(comment.id)}>Save</button>
              </div>
            ) : (
              <>
                <p>{comment.body}</p>
                {comment.user_id === currentUser.id && !editingCommentId && (
                  <>
                    <button onClick={() => handleEditComment(comment.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                  </>
                )}
              </>

            )}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
