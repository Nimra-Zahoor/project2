import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './posts.css';
import Edit from '../Edit/Edit'
import Comments from '../Comments/Comments';
function Posts(props) {
  const [data, setData] = useState(null);
  const [createdPost,setCreatedPosts] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const User = props.user; 
  let getPosts = () =>{
    let newPost = JSON.parse(localStorage.getItem('post'));
    console.log("newPost--",newPost)
    setCreatedPosts(newPost)
    return createdPost;
   }
  useEffect(() => {
    const fetchData = () => {
        axios
          .get('https://jsonplaceholder.typicode.com/posts')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            setError(error);
          });
      };
       
      fetchData();
      getPosts ();
    }, []);
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
  const addNewPost = () =>{
    navigate('/createPost');
  }

  const handleEdit = (id) =>{
    console.log("Edit working ");
    <Edit id = {id}></Edit>
    console.log('id for edit', id)
   // navigate('/edit')
  }
  return (
    <div>
        
      <div className='addPosts'>
          <button className='plusBtn' onClick={addNewPost}>+</button>
      </div>
      {data && (
        <ul>
             {createdPost?.map(item => (
                <div className="posts" key={item.id}>
                    <h5>Post by user: {item.userId}</h5>
                    <h5>post id:{item.id}</h5>
                   <h3>Title:</h3> {item.title}<br/>
                   <h3>Post:</h3> {item.body}<br/><br/>
                   <button onClick={handleEdit(item.id)} >Edit</button><br/>
                   <br/>
                      <button className='delete'>Delete</button>
                      <Comments user = {User}/>
                </div>
              ))}
              
          {data.map(item => (
            <div className="posts" key={item.id}>
               <h3>Title:</h3> {item.title}<br/>
               <h3>Post:</h3> {item.body}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Posts;
