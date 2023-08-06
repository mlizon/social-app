import AddPost from './AddPost';
import './Post.css'
import { useState } from "react";
import axios from 'axios';

const Post = (props) => {

    const [likeCount, setLikeCount] = useState(props.post.likes.length)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [doesUserLiked, setDoesUserLiked] = useState(props.post.likes.filter(like => like.username === props.user?.username).lenght !== 0);

    const deletePost = (id) => {
        //    console.log(props.post);
        axios.post("https://akademia108.pl/api/social-app/post/delete", {
            post_id: id
        })
            .then((res) => {
                console.log(res);

                props.setPosts((posts) => {
                    return posts.filter((post) => post.id !== res.data.post_id)

                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const likePost = (id, isLiked) => {
        axios.post('https://akademia108.pl/api/social-app/post/' + (isLiked ? 'dislike' : 'like'), {
            post_id: id,
        })
            .then(() => {
                setLikeCount(likeCount + (isLiked ? -1 : 1))
                setDoesUserLiked(!isLiked)
            })
    }
    const unfollow = (id) => {
        axios.post('https://akademia108.pl/api/social-app/follows/disfollow', {
            leader_id: id
        })
            .then((res) => {
                props.getLatestPosts()
            })

    }
    return (
        <div className="post">

            <div className="avatar">
                <img src={props.post.user.avatar_url} alt={props.post.user.username} />
            </div>

            <div className="postData">
                <div className="postMeta">
                    <div className="author"> {props.post.user.username}</div>
                    <div className="date"> {props.post.created_at.substring(0, 10)}</div>
                </div>
                <div className="postContent">{props.post.content}</div>

                <div className="likes">
                    {props.post.user.username === props.user?.username && <button className='btn' onClick={() => { setDeleteConfirm(true) }}>delete</button>}

                    {props.user && props.user.username !== props.post.user.username && (
                    <button onClick={() => unfollow(props.post.user.id)}> Unfollow</button>)}

                {props.user && (
                    <button
                        className='btn'
                        onClick={() => likePost(props.post.id, doesUserLiked)}
                    >
                        {doesUserLiked ? 'Dislike' : 'Like'}
                    </button>)}

                {likeCount}
            </div>
        </div>

            {
        deleteConfirm && (
            <div className="delete">
                <h3>Czy chcesz usunąć post?</h3>
                <button className='btn' onClick={() => { deletePost(props.post.id) }}>Tak</button>
                <button className="btn" onClick={() => { setDeleteConfirm(false) }}>Nie</button>
            </div>
        )
    }

        </div >

    )
}
export default Post;