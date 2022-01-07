import React from 'react';
import ChannelPage from './ChannelPage';
import Link from 'react-router-dom';

const Homepage = () => {

    const RenderPost = () => {
        return(
            <><h2>gjhn</h2><ChannelPage /></>
    )}
    
    const ChannelList = () => {
        return (
        <ul>
            <li><button onClick={() => RenderPost()}>General</button ></li>
            <li><button >Web-Socket Discussion</button ></li>
            <li><Link to={'/forum/post'}>Contact</Link></li>
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