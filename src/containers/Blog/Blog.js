import React, { Component } from 'react';
//import axios from 'axios';
//import axios from '../../axios';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Login from '../../components/Login/Login';
import './Blog.css';
import FullPost from '../../containers/Blog/FullPost/FullPost';
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
                                to="/login/" 
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color:'#fa923f',
                                    //textDecoration: 'underline',
                                }}>Login</NavLink></li>
                            <li><NavLink 
                                to="/user/" 
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color:'#fa923f',
                                    //textDecoration: 'underline',
                                }}>User</NavLink></li>
                            <li><NavLink to={{
                                    pathname: '/new-device',
                                    hash: '#submit',
                                    search:'?quick-submit=true'
                                }}>New Device</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/user" component={Posts}/>
                    <Route path={"/device" + '/:id'} exact component={FullPost}/>
                    {this.state.auth ? <Route path="/new-device" component={AsyncNewDevice}/> : null}
                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        );
    }
}

export default Blog;