import React, {Component} from 'react';
import axios from '../../../axios';
import {Route} from 'react-router-dom';
import * as eos from '../../../eosService/service';
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    
    constructor() {
        super();
        this.state = {
            post: [],
            username:''
        }
    }

    componentDidMount() {
        const status = eos.setStatus();
        if (status != null){
            this.setState({username:status})
        }

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

    displayDeviceHandler = () => {
        eos.getDeviceByName('scatterdev').then(response => {
            console.log(response);
        });


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
                <h2 style={{textAlign:'center'}}>{this.state.username}</h2>
                <section className="Posts">
                    <button onClick={this.displayDeviceHandler}>Display Devices</button>
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
            
        )
    }
}

export default Posts;