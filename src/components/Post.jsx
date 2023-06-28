const Post = (props) => {
    return (
        <div className="post">
            <div className="avatar">
                <img src={props.post.user.avatar_url} alt="" />

            </div>

            <div className="username">
                {props.post.user.username}
            </div>
            <div className="content">
                {props.post.content}
            </div>
            <div className="created">
                {props.post.created_at}
            </div>
           <div className="likes">
                {props.post.likes} 
                </div> 
        </div>

    )
}
export default Post;