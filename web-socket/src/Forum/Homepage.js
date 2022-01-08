import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    
    const ChannelList = () => {
        return (
        <ul>
            <li><Link to={'/forum/post'}>General</Link ></li>
            <li><Link to={'/forum/post'}>Web-Socket Discussion</Link ></li>
        </ul>
        )
    }

    return (
        <><h1>Forum</h1><h2>Posts</h2>
        {ChannelList()}
        </>
    )
}

export default Homepage;