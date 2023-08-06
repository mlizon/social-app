import axios from "axios";
import { useEffect, useState } from "react";

const FollowRecommendations = (props) => {

    const [recommendations, setRecommendations] = useState([])

    const getRecommendations = () => {
        axios
            .post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then((res) => {
                setRecommendations(res.data)
            })
        console.log("akademia")
    }

    useEffect(() => {
        getRecommendations()

    }, [props.posts])

    const follow = (id) => {
        axios.post('https://akademia108.pl/api/social-app/follows/follow', {
            leader_id: id
        })
            .then((res) => {
                console.log(res);
                props.getLatestPosts()
            })

    }


    return (
        <div className="followRecommendations">
            {recommendations.map((recommendation) => {
                return (
                    <div className="recommendation">
                        <img src={recommendation.avatar_url} />
                        <h3>{recommendation.username}</h3>
                        <button onClick={() => { follow(recommendation.id) }}>Follow</button>
                    </div>
                )

            })}

        </div>

    )
}

export default FollowRecommendations;