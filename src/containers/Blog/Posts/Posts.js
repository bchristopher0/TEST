import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import * as eos from '../../../eosService/service';
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';
import RelaySocket from '@scatterjs/core/dist/wallets/RelaySocket';

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
        //this.displayDeviceHandler();
        // eos.getDeviceList().then(res => {
        //     console.log(res);
        //     this.setState({devices:res})
        // }).catch(err => {
        //     this.setState({error:true})
        // })

        //console.log(this.state);
    }
    componentDidMount(){
        this.displayDeviceHandler();
        console.log(this.state)
    }

    postSelectedHandler = (id) => {
        //this.props.history.push({pathname:'/posts/' + id});
        this.props.history.push('/device/' + id);

    }

    displayDeviceHandler = async () => {
        const result = await eos.getDeviceList().then(res =>{
            return res;
        }).catch(err =>{
            this.setState({error: true});
        })
        if (result == this.state){
            return;
        }else if(result == null){
            this.setState({error:true})
        }else{
            this.setState({devices:result})
        }
        
        // eos.getDeviceList().then(response => {
        //     console.log(response);
        //     if(response== null){
        //         this.setState({error:true});
        //     }else{
        //         this.setState({devices:response});
        //     }
        // });
        // console.log(this.state);
    }

    render() {
        //this.displayDeviceHandler();
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
                            type={device.devicetype} 
                            owner={device.username}
                            />
                    //</Link>
                );
            });
        }

    
        return (
            <div>
                <h2 style={{textAlign:'center'}}>{this.state.username}</h2>
                <section className="Posts">
                    <button onClick={this.displayDeviceHandler}>Update Devices</button>
                    {devices}
                </section>
            </div>
            
        )
    
}
}

export default Posts;