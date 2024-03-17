import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import jwt_decode from 'jwt-decode';

// const [opUsername, setOpUsername] = useState('');
//
// useEffect(() => {
//   const token = Cookies.get('token');
//
//   if (token) {
//     // Decode the token to get user information
//     const decodedToken = jwt_decode(token);
//    const { username } = decodedToken;
//     setOpUsername(username);
//   }
// }, []);


function CreatePost() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePost = () => {
    setLoading(true);
    const token = Cookies.get('token');

    if (!token) {
      console.error('No token found');
      return;
    }
    const tokenPayload = token.split('.')[1];
    const decodedToken = JSON.parse(atob(tokenPayload));
    const datePosted = new Date().toISOString(); // Get current date and time
    const opUsername = decodedToken.username;// Replace with the actual username of the logged-in user

    const postData = {
      text,
      imageUrl,
      datePosted,
      opUsername
    };

    axios.post('http://localhost:3001/post', postData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Post created successfully:', response.data);
      // Handle any UI updates or notifications indicating successful post creation
      setLoading(false);
      setText('');
      setImageUrl('');
    })
    .catch(error => {
      console.error('Error creating post:', error);
      // Handle any UI updates or notifications indicating post creation failure
      setLoading(false);
    });
  };

  return (
    <div>
      <h2>Create Post</h2>
      <div>
        <label>What's on your mind? Share your Thoughts with others:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {/* <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div> */}
      <button onClick={handleCreatePost} disabled={loading}>Create Post</button>
    </div>
  );
}

export default CreatePost;

