import React, { useEffect, useState } from "react";
import axios from 'axios'
import styled from 'styled-components';
import { Post, Back } from "./Styles/ChannelPage";
import { Link, useParams } from "react-router-dom";

const ChannelPage = ({user, socket}) => {

    const [comment,setComment]=useState("");
    const [comments, setComments]=useState([]);
    const [post, setPost] = useState();

    const fetchPost = async (id) => {
        const result = await axios({
            method: 'get',
            params: {id},
            url: `http://localhost:3501/posts/${id}`,
        })
        if(result){
            setPost(result.data.result);
            setComments([...result.data.result.comment]);
        }
    }
    const { id } = useParams();

    useEffect(()=>{
        socket && socket.emit("joinRoom", id);
        socket && socket.on('comment', (data)=> {
        console.log(data);
        if(user.id !== data.author){
            setComments((comments) => [...comments, data.comment]);
        }
        })
    },[socket, id, user.id])

    useEffect(() => {
        fetchPost(id)
    }, [id])
    const addComment = async(e) => {
        e.preventDefault();
        if(comment){
            const result = await axios({
                method: 'post',
                url: `http://localhost:3501/comment`,
                data: {
                    userID: user.id,
                    postID: id,
                    content: comment
                }
            })
            console.log(result);
            if(result){
                setComment('');
                setComments([...comments, result.data.result.comment]);
            }
        }
    }

    return(
        <><div>
            <Post>
            <div><h2>{post && post.postContent}</h2>
            <form onSubmit={addComment}>
            <input name="name" placeholder="Post a comment !!" value={comment} onChange={(e)=> setComment(e.target.value)}/>
            </form>
            </div>
            <Back><Link to={'/forum'}>Back</Link></Back>
            </Post>
            {comments.length>0 && comments.map(a =>
                <CommentCard key={a._id}>
                    {a.content}
                </CommentCard>
                )}
          </div>
        </>
    )
}

export default ChannelPage;


const CommentCard = styled.div`
    height: 50px;
    color: white;
    margin:10px 0;
    background-color: grey;
`;