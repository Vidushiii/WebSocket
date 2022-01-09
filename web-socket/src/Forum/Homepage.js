import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Homepage = ({isAuthenticated, user}) => {
    const [post, setPost] = useState('')
    const [posts, setPosts] = useState([]);
    
    const fetchPosts = async () => {
        const result = await axios({
            method: 'get',
            url: 'http://localhost:3501/posts',
        })
        if(result){
            setPosts(result.data.result);
        }
    }
    useEffect(()=> {
        fetchPosts();
    },[])

    const handleCreatePost = async(e) => {
        e.preventDefault();
        if(post){
            const result = await axios({
                method: 'post',
                url: 'http://localhost:3501/createPost',
                data: {
                    content: post,
                    userID: user.id
                }
            })
            console.log(result);
            if(result.status === 200){
                setPost('');
                setPosts([result.data.result, ...posts]);
            }
        }
    }

    const ChannelList = () => (
        posts.map(data=> (
            <Link key={data._id} to={`/forum/${data._id}#comment61d99fdad5061aff99b0ff3c`}>
                <PostCard>
                    {data.postContent}
                </PostCard>
            </Link >
        ))
    )
    

    return (
        <><h1>Forum</h1>
        <textarea type="text" value={post} onChange={e=>setPost(e.target.value)} />
        <br />
        <button onClick={handleCreatePost}>Create Post</button>
        <br></br>
        <h2>Posts</h2>
        {ChannelList()}
        </>
    )
}

export default Homepage;


const PostCard = styled.div`
    height: 50px;
`;