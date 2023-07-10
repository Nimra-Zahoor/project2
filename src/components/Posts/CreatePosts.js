import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CreatePosts({ user }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [post, setPost] = useState({ id: 1, userId: 1, title: "", body: "" });

  const navigate = useNavigate();

  let [postId, setPostId] = useState(1);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser && setCurrentUser(currentUser);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const getId = () => {
    setPostId(postId);
    const existingPosts = JSON.parse(localStorage.getItem("serverPosts")) || [];
    const existingCreatedPosts =
      JSON.parse(localStorage.getItem("posts")) || [];
    let allPosts = [];
    allPosts = [...existingPosts, ...existingCreatedPosts];
    return allPosts.length + 1;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentUser) {
      alert("Please Login for Creating posts");
      navigate("/login");
      return;
    }

    const newPost = {
      id: getId(),
      userId: currentUser.id,
      title: post.title,
      body: post.body,
    };
    setPostId(newPost.id);
    if (
      newPost.id === null ||
      newPost.id === undefined ||
      newPost.id === "" ||
      newPost.id === NaN
    ) {
      newPost.id = 1;
    }

    setPost({ id: newPost.id, userId: currentUser.id, title: "", body: "" });
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    existingPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(existingPosts));

    alert("Post added");
    navigate("/posts");
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
