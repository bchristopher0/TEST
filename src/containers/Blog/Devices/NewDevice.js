import React, { Component } from 'react';
import * as eos from '../../../eosService/service';
import './NewDevice.css';
import { Redirect } from 'react-router';

class NewPost extends Component {
    state = {
        username: '',
        deviceid: '',
        devicetype: 'Camera',
        submitted:false,
    }

    componentDidMount() {
        console.log(this.props);
        
    }
    addDeviceHandler = () => {
        const data = {
           // username:this.state.username,
            deviceid:this.state.deviceid,
            devicetype:this.state.devicetype,
        }
        eos.regdev(data);
        this.setState({submitted:true});
    }
    generateIdHandler = () => {
        this.setState({deviceid:Math.floor(100000 + Math.random() * 900000)});
    }




    render () {
        let redirect = null;
        if(this.state.submitted){
            redirect = <Redirect to="/user"/>;
        };
        
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Device</h1>
                <label>Device ID</label>
                <input type="text" value={this.state.deviceid} onChange={(event) => this.setState({deviceid: event.target.value})} />
                <button onClick={this.generateIdHandler}>Generate Unique ID</button>
                {/* <label>Device Type</label>
                <textarea rows="1" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} /> */}
                <label>Device Type</label>
                <select value={this.state.devicetype} onChange={(event) => this.setState({devicetype: event.target.value})}>
                    <option value="Camera">Camera</option>
                    <option value="Bulb">Bulb</option>
                    <option value="Plugin">Plugin</option>
                </select>
                <button onClick={this.addDeviceHandler}>Add Device</button>
            </div>
        );
    }
}

export default NewPost;