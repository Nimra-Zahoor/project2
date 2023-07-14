import axios from "axios";

export const fetchComments = async (postId) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
export const fetchPosts = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
    localStorage.setItem("serverPosts", JSON.stringify(response.data));
  } catch (error) {
    return [];
  }
};
