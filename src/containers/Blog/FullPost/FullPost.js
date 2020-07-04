import React, { Component } from 'react';
import { Route ,Redirect } from 'react-router';
import * as eos from '../../../eosService/service';
import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost:null,
        deleted: false,
    }
    componentDidMount(){
        console.log(this.props);
        this.loadData();
    }
    componentDidUpdate() {
        this.loadData();
    }

    loadData () {
        if(this.props.match.params.id){
            if(!this.state.loadedPost ||(this.state.loadedPost && this.state.loadedPost.deviceid !== +this.props.match.params.id)){
                eos.getDeviceById(this.props.match.params.id)
                    .then(res => {
                        console.log(res);
                        this.setState({loadedPost:res})
                    });
            }
        }

        // if (this.props.match.params.id){
        //     if(!this.state.loadedPost ||(this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)){
        //         axios.get('/posts/' + this.props.match.params.id)
        //         .then(response => {
        //             //console.log(response);
        //             this.setState({loadedPost:response.data});
        //         });
        //     }
        // }
    }

    deletePostHandler = () => {
        eos.unregdev({deviceid: this.state.loadedPost.deviceid});
        this.setState({loadedPost:null, deleted: true});
        
        // axios.delete('/posts/' + this.props.match.params.id)
        //     .then(response => {
        //         console.log(response);
        //     });
    }

    render () {
        let redirect = null;
        if(this.state.deleted){
            redirect = <Redirect to="/user"/>;
        };

        
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        if(this.props.match.params.id){
            post = <p style={{textAlign:'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost){
            post = (
                <div className="FullPost">
                    {redirect}
                    <h1>{this.state.loadedPost.devicetype}</h1>
                    <p>{this.state.loadedPost.devicetype}</p>
                    <p>{this.state.loadedPost.deviceid}</p>
                    <div className="Edit">
                        <button  onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        } 

        
        
        return post;
    }
}

export default FullPost;