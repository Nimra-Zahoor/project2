import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Comments from "../Comments/Comments";

function Posts() {
  const navigate = useNavigate();

  const [createdPost, setCreatedPosts] = useState([]);
  let [currentUser, setcurrentUser] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");

  useEffect(() => {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setcurrentUser(currentUser);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
        localStorage.setItem("serverPosts", JSON.stringify(response.data));
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    setCreatedPosts(JSON.parse(localStorage.getItem("posts")) || []);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const addNewPost = () => {
    navigate("/create-post");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("logged out");
    navigate("/login");
  };

  const handleEdit = (postId, title, body, userId) => {
    if (currentUser.id === userId) {
      setEditingPostId(postId);
      setEditedTitle(title);
      setEditedBody(body);
    } else {
      alert("You cannot edit this post");
    }
  };

  const handleUpdatePost = (postId, userid) => {
    const updatedPosts = createdPost.map((post) => {
      if (post.id === postId && currentUser.id === userid) {
        return {
          ...post,
          title: editedTitle,
          body: editedBody,
        };
      }

      return post;
    });

    setCreatedPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setEditingPostId(null);
    setEditedTitle("");
    setEditedBody("");
  };

  const handleDelete = (postId) => {
    const updatedPosts = createdPost.filter((post) => post.id !== postId);
    setCreatedPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  if (data.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div className="container">
        <h1 className="title">Posts</h1>
        <div className="addPosts">
          <button className="plusBtn" onClick={addNewPost}>
            +
          </button>
        </div>
        {createdPost.map((item) => (
          <div className="posts" key={item.id}>
            {editingPostId === item.id ? (
              <div>
                <textarea
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Enter title..."
                />
                <textarea
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                  placeholder="Enter post..."
                />
                <button
                  className="save-btn"
                  onClick={() => handleUpdatePost(item.id, item.userId)}
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
                {item.userId === currentUser.id && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(item.id, item.title, item.body, item.userId)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </>
                )}

                <Comments postId={item.id} userId={item.userId} />
              </>
            )}
          </div>
        ))}
        {data.map((item) => (
          <div className="posts" key={item.id}>
            <>
              <h3>Title:</h3>
              <p>{item.title}</p>
              <h3>Post:</h3>
              <p>{item.body}</p>
              <Comments postId={item.id} />
            </>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Posts;
