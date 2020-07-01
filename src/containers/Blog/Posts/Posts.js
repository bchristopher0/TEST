import React, {Component} from 'react';
import axios from '../../../axios';
import {Route} from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        post: [],
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(response=>{
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author:'Christopher',
                    }
                });
                this.setState({post: updatedPosts})
                //console.log(response);
            })
            .catch(error => {
                console.log(error);
                //this.setState({error:true})
            });
    }

    postSelectedHandler = (id) => {
        //this.props.history.push({pathname:'/posts/' + id});
        this.props.history.push('/posts/' + id);

    }


    render() {
        let posts = <p stype={{textAlign:'center'}} >Something went wrong!</p>
        if (!this.state.error){
            posts = this.state.post.map(post=>{
                return (
                   // <Link to={'/' + post.id} key={post.id}>
                        <Post 
                            clicked={()=>this.postSelectedHandler(post.id)}
                            key={post.id}
                            title={post.title} 
                            author={post.author}
                            />
                    //</Link>
                );
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
            
        )
    }
}

export default Posts;