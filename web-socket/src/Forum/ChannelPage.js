import React, { useState } from "react";
import { Post, Back } from "./Styles/ChannelPage";
import { Link } from "react-router-dom";

const ChannelPage = () => {

    const [comment,setComment]=useState("");
    const [showComments, setShowComments]=useState([]);

    const ShowComment = (e) => {
        e.preventDefault();
        const data=comment;
        if(comment)
        {setShowComments((ls)=>[...ls,data])
        setComment("")
    }
    }

    return(
        <><div>
            <Post>
            <div><h2>Q. 1 - How does react work ?</h2>
            <form onSubmit={ShowComment}>
            <input name="name" placeholder="Post a comment !!" value={comment} onChange={(e)=> setComment(e.target.value)}/>
            </form>
            </div>
            <Back><Link to={'/forum'}>Back</Link></Back>
            </Post>
            {showComments.map(a =><li>{a}</li>)}
          </div>
        </>
    )
}

export default ChannelPage;