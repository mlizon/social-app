import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPost = () => {

    const [postContent, setPostContent] = useState('');


    const addNewPost = (e) => {
        e.preventDefault();
        if (!postContent) {
            return
        }
        axios.post("https://akademia108.pl/api/social-app/post/add", {
            content: postContent
        })
        .then((res)=>{
            console.log(res);
        })
        .catch ((error)=>{
            console.error(error);
        }) 
            
    }




    

    return (
        <div className="addPost">
            <form onSubmit={(e)=>{addNewPost(e)}}>
                <textarea name="textarea" cols="30" rows="10" placeholder="Dodaj Post..." onChange={(e) => setPostContent(e.target.value)} value={postContent}></textarea>
                <button className='btn'>Dodaj post</button>
            </form>
        </div>
    );
}

export default AddPost;