
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";




const Home = () => {
    const [posts, setPosts] = useState([])

    const getLatestPosts = () => {
        axios.post("http://akademia108.pl/api/social-app/post/latest")
            .then(response => setPosts(response.data))
    }

    useEffect(() => {
        getLatestPosts()
    }, []);

    return (
        <div className="home">
            {posts.map((post) => {
                return <Post post={post} />  
            })}
        </div>
    )
}



export default Home;