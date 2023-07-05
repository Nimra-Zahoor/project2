import React, { useState,useEffect } from 'react'
import axios from 'axios';
function Comments(props) {
    const User = props.user;
    const [Comments, setComments] = useState('');
    const [Error, setError] = useState('')
    useEffect(() => {
        const fetchComments = () => {
            axios
              .get('https://jsonplaceholder.typicode.com/posts/{$postId}/comments')
              .then(response => {
                setComments(response.data);
              })
              .catch(error => {
                setError(error);
              });
          };
      
          fetchComments();
        }, []);
  return (
    <div></div>
  )
}

export default Comments