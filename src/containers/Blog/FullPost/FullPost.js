import React, { Component , Fragment} from 'react';
import { Route ,Redirect } from 'react-router';
import * as eos from '../../../eosService/eos';
import './FullPost.css';

class FullPost extends Component {
    
    state = {
        loadedPost:null,
        subStatus: null,
        deleted: false,
    }
    componentDidMount(){
        console.log(this.props);
        this.loadDeviceData();
        //this.loadServiceData();
    }
    componentDidUpdate() {
        this.loadDeviceData();
        //this.loadServiceData();
    }


    loadServiceData(){
        if (this.state.subStatus == 'subscribed'){
        eos.getServiceById(this.props.match.params.id)
            .then(res => {
                console.log('[FullPost.js] getServiceById', res);
            })
            .catch(err => {
                console.log(err)
            });
        }
    }

    loadDeviceData () {
        if(this.props.match.params.id){
            if(!this.state.loadedPost ||(this.state.loadedPost && this.state.loadedPost.deviceid !== +this.props.match.params.id)){
                eos.getDeviceById(this.props.match.params.id)
                    .then(res => {
                        console.log(res);
                        this.setState({loadedPost:res, subStatus: res.sub})
                    });
            }
        }
    }

    deletePostHandler = () => {
        eos.unregdev({deviceid: this.state.loadedPost.deviceid});
        this.setState({loadedPost:null, deleted: true});
    }

    registerSubHandler = () => {
        eos.regsub({deviceid:this.state.loadedPost.deviceid});
    }

    unregisterSubHandler = () => {
        eos.unregsub({deviceid: this.state.loadedPost.deviceid});
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
            const sub = this.state.loadedPost.sub; 
            let statusButton = (
                    <div className="Edit">
                        <button onClick={this.registerSubHandler} className="Add">Subscribe</button>
                     </div>);
            if (sub == 'subscribed'){
                statusButton = (
                    <div className="Edit">
                        <button onClick={this.unregisterSubHandler} className = "Delete">Unsubscribe</button>
                     </div>);
            }
            post = (
                <div className="FullPost">
                    {redirect}
                    <h1>{this.state.loadedPost.devicetype}</h1>
                    <p>Status: {this.state.loadedPost.sub}</p>
                    <p> ID: {this.state.loadedPost.deviceid}</p>
                    {statusButton}
                    <div className="Edit">
                        <button  onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
                
            );
        } 

        
        
        return (post);
    }
}

export default FullPost;