import React, { useEffect, useState } from 'react';
import './Comments.css';
import axios from 'axios';

const Comments = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const saveCommentsToLocalStorage = (updatedComments) => {
    const existingComments = JSON.parse(localStorage.getItem('comments')) || [];
    const filteredComments = existingComments.filter(comment => comment.post_id !== postId);
    const updatedCommentList = [...filteredComments, ...updatedComments];
    localStorage.setItem('comments', JSON.stringify(updatedCommentList));
  };

  const handleAddComment = () => {
    const comment = {
      id: Date.now(),
      post_id: postId,
      user_id: userId,
      body: newComment,
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    saveCommentsToLocalStorage(updatedComments);

    setNewComment('');
  };

  const handleEditComment = (commentId) => {
    const commentToEdit = comments.find(comment => comment.id === commentId && comment.user_id === userId);
    if (commentToEdit) {
      setEditingCommentId(commentId);
      setEditingCommentText(commentToEdit.body);
    }
  };

  const handleUpdateComment = (commentId) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId && comment.user_id === userId ? { ...comment, body: editingCommentText } : comment
    );
    setComments(updatedComments);
    saveCommentsToLocalStorage(updatedComments);

    setEditingCommentId(null);
    setEditingCommentText('');
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId || comment.user_id !== userId);
    setComments(updatedComments);
    saveCommentsToLocalStorage(updatedComments);
  };

  return (
    <div>
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
        <br/>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {editingCommentId === comment.id ? (
              <div>
                <textarea
                  value={editingCommentText}
                  onChange={(e) => setEditingCommentText(e.target.value)}
                ></textarea>
                <button onClick={() => handleUpdateComment(comment.id)}>Save</button>
              </div>
            ) : (
              <p>{comment.body}</p>
            )}
            {comment.user_id === userId && (
              <>
                {!editingCommentId && (
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
