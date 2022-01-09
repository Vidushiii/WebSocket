import React, { useEffect, useState, useRef } from "react";
import axios from 'axios'
import styled from 'styled-components';
import { Post, Back } from "./Styles/ChannelPage";
import { Link, useParams } from "react-router-dom";

const ChannelPage = ({user, socket}) => {
    
    const [comment,setComment]=useState("");
    const [comments, setComments]=useState([]);
    const [loading, setLoading]=useState(true);
    const [post, setPost] = useState();
    const [hash, setHash] = useState();
    const myRef = useRef(null);
    console.log(myRef)

    const scrollSmoothHandler = () => {
        if(myRef==null) return;
        myRef.current.scrollIntoView({ behavior: "smooth" });
        myRef.current.focus();
    };
    // const goToViolation=(id)=>{
    //     const violation = document.getElementById(id); 
    //     window.scrollTo({
    //       top:violation.offsetTop,
    //       behavior:"smooth"
    //   });
    //   };

    // const temp = '61d97e1f68156e040e18c3cd';
    // console.log(`comment${temp}` === hash);

    const fetchPost = async (id) => {
        const result = await axios({
            method: 'get',
            params: {id},
            url: `http://localhost:3501/posts/${id}`,
        })
        if(result){
            setPost(result.data.result);
            setComments([...result.data.result.comment]);
            scrollSmoothHandler();
        }
    }
    const { id } = useParams();

    useEffect(()=>{
        socket && socket.emit("joinRoom", id);
        socket && socket.on('comment', (data)=> {
            console.log(data);
            if(user.id !== data.comment.author._id){
                setComments((comments) => [...comments, data.comment]);
            }
        });
        return () => {
            socket && socket.emit('leaveRoom', id);
            socket && socket.off('comment');
        }
    },[socket, id, user.id])

    useEffect(() => {
        setLoading(true);
        fetchPost(id)
        // scrollSmoothHandler();
        window.location.hash = window.decodeURIComponent(window.location.hash);
        // const scrollToAnchor = () => {
        const hashParts = window.location.hash.split("#");
        if (hashParts.length >= 2) {
            setHash(hashParts.slice(-1)[0]);
        }
        // };
        // scrollToAnchor();
        // window.onhashchange = scrollToAnchor;
        // scrollSmoothHandler();
        setLoading(false);
    }, [id, hash])

    useEffect(() => {
        console.log(myRef);
    }, [myRef])

    // useEffect(scrollSmoothHandler,[])
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
        <>
        {loading? <div>Loading...</div>
        :
        <div>
        <Post>
        <div><h2>{post && post.postContent}</h2>
        <form onSubmit={addComment}>
        <input name="name" placeholder="Post a comment !!" value={comment} onChange={(e)=> setComment(e.target.value)}/>
        </form>
        </div>
        <Back><Link to={'/forum'}>Back</Link></Back>
        </Post>
        {comments.length>0 && comments.map(a =>
            <CommentCard key={a._id} id={`comment${a._id}`} ref={`comment${a._id}` === hash ? myRef : null}>
                <Flex>
                {a.content}
                </Flex>
                <Flex>
                    {a.author.name}
                </Flex>
            </CommentCard>
            )}
    </div>
        }
    </>
    )
}

export default ChannelPage;


const CommentCard = styled.div`
    height: 50px;
    width: 70%;
    color: white;
    margin:10px 0;
    background-color: grey;
    padding: 10px 5px;
    display: flex;
    justify-content: space-between
`;

const Flex = styled.div`

`;