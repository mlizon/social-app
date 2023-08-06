import './Home.css';

import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";
import AddPost from '../components/AddPost';
import FollowRecommendations from '../components/FollowRecommendations';





const Home = (props) => {
    const [posts, setPosts] = useState([])

    const getLatestPosts = () => {
        axios.post("http://akademia108.pl/api/social-app/post/latest")
            .then(response => setPosts(response.data))
            .catch((error)=>{
                console.error(error);
            });
    }

    const getNextPosts = () => {
        axios
        .post('https://akademia108.pl/api/social-app/post/older-then', {
            date: posts[posts.lenght - 1].created_at
        })
        .then((res) => {
            setPosts(posts.concat(res.data));
        })
        .catch((error) => {
            console.error(error);
        })
    }
   
    useEffect(() => {
        getLatestPosts()
    }, []);

    return (
        <div className="home">
            <AddPost/> 
            <FollowRecommendations posts={posts} getLatestPosts={getLatestPosts}/>
            {posts.map((post) => {
                return <Post post={post} key={post.id} setPosts={setPosts} user={props.user} getLatestPosts={getLatestPosts}/>  
            })}
            <button onClick={getNextPosts}>Ładuj</button>
        </div>
    )
}



export default Home;