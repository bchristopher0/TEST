import React, { Component } from 'react';
//import axios from 'axios';
//import axios from '../../axios';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewDevice = asyncComponent(()=>{
    return import('./Devices/NewDevice');
});

class Blog extends Component {
    state = {
        auth:true,
    }
    render () {
     
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts/" 
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color:'#fa923f',
                                    textDecoration: 'underline',
                                }}>User</NavLink></li>
                            <li><NavLink to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search:'?quick-submit=true'
                                }}>New Device</NavLink></li>
                        </ul>
                    </nav>
                </header>

                
                <Switch>
                   {this.state.auth ? <Route path="/new-post" component={AsyncNewDevice}/> : null}
                    <Route path="/posts" component={Posts}/>
                    <Route render={()=> <h1>Not Found</h1>}/>
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;