import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Product.css';
// import Cookies from 'js-cookie';


function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const history = useHistory();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      // Handle case where token is not available (user is not authenticated)
      console.error('No token found');
      setLoading(false);
      return;
    }

    axios.get('http://localhost:3001/posts', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setPosts(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
      setLoading(false);
    });
  }, []);

  const handleCreatePost = () => {
   navigate('/createPosts');
  };



  // const handleDeletePost = async (postId) => {
  //   const token = Cookies.get('token');
    
  //   try {
  //     await axios.delete(`http://localhost:3001/posts/${postId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     // Remove the deleted post from the state
  //     setPosts(posts.filter(post => post.id !== postId));
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //     // Handle error
  //   }
  // };

  const handleDeletePost = async (postId) => {
    const token = Cookies.get('token');

    if (!token) {
      console.error('No token found');
      return;
    }
    const tokenPayload = token.split('.')[1];
    const decodedToken = JSON.parse(atob(tokenPayload));
    const Uname = decodedToken.username;// Replace with the actual username of the logged-in user
    const post = posts.find(post => post.id === postId);
    if(Uname !== post.opUsername){
      console.error('Only the owner of the post can delete it');
      // Handle unauthorized deletion
      return;
    }
    try {
      await axios.delete(`http://localhost:3001/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove the deleted post from the state
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error
    }
  };


  return (
   <div className="posts-container">
      <h2>Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post, index) => (
            <div className="post-card" key={index}>
              <h3>{post.opUsername}</h3>
              <p>{post.text}</p> 
              {/* <img src = {post.imageUrl} alt="Post" />  */}
              <p>Date Posted: {new Date(post.datePosted).toLocaleDateString()}</p>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              <hr />
            </div>
          ))}
        </div>
      )}
      <button onClick={handleCreatePost}>Create Post</button>
    </div>  
  );
}

export default Posts;
