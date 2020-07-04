import React from 'react';

import './Post.css';

const post = (props) => (
        <article
            onClick={props.clicked} 
            className="Post">
            <h1>{props.type}</h1>
            <div className='Info'>DeviceID: {props.deviceid}</div>
            <div className="Info">
                <div className="Author">Account: {props.owner}</div>
            </div>
        </article>
    );

   
export default post;