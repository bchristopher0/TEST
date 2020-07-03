import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import * as eos from '../../../eosService/service';
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    
  state ={
      error: '',
      devices: [],
      username:'',
  }

    componentWillMount() {
        const status = eos.setStatus();
        if (status != null){
            this.setState({username:status})
        }
        eos.getDeviceByName().then(res => {
            console.log(res);
            this.setState({devices:res})
        }).catch(err => {
            this.setState({error:true})
        })

        console.log(this.state);
    }
    componentDidMount(){
        console.log(this.state)
    }

    postSelectedHandler = (id) => {
        //this.props.history.push({pathname:'/posts/' + id});
        this.props.history.push('/posts/' + id);

    }

    displayDeviceHandler = () => {
        eos.getDeviceByName('scatterdev').then(response => {
            console.log(response);
            if(response== null){
                this.setState({error:true});
            }else{
                this.setState({devices:response});
            }
        });
        console.log(this.state);
    }

    render() {
        console.log(this.state);
        let devices = <p stype={{textAlign:'center'}} >Something went wrong!</p>;
        if (!this.state.error){
            devices = this.state.devices.map(device=>{
                if(device.username!=this.state.username){return};
                return (
                   // <Link to={'/' + post.id} key={post.id}>
                        <Post 
                            clicked={()=>this.postSelectedHandler(device.deviceid)}
                            deviceid={device.deviceid}
                            key={device.deviceid}
                            title={device.devicetype} 
                            author={device.username}
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
                    {devices}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
            
        )
    
}
}

export default Posts;