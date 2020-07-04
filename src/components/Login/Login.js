import React, {Component} from 'react';
import * as eos from '../../eosService/service';
import './Login.css';
import { Redirect } from 'react-router';
class Login extends Component{
    state = {
        loginStatus:false,
        registerStatus:false,
    }
    loginHandler = () => {
        eos.login();
        this.setState({loginStatus: true})
    }
    logoutHandler = () => {
        eos.logout();
        this.setState({loginStatus:false})
    }
    registerHandler = () => {
        eos.regusr()
    }
    unregisterHandler = () => {
        eos.unregusr();
    }
    

    render() {
        let redirect = null;
        if(this.state.registerStatus){
            redirect = <Redirect to="/posts"/>;
        };

        return(
            <div style={{textAlign:'center'}}>
                {/* {redirect} */}
            <h4 style={{textAlign:'center', marginTop:'10px'}}>Hello, login below</h4>
            <div className='Login' style={{verticalAlign:'center'}} >
            
                <button onClick={this.loginHandler}>Login</button>
                <button onClick={this.logoutHandler}>Logout</button>
         
            </div>
                {this.state.loginStatus ?
                <div className='Login'>
                <button onClick={this.registerHandler}>Register</button>
                <button onClick={this.unregisterHandler}>Unregister</button>
                </div>
                : null}
            </div>
            
            
            
        );
    }
}

export default Login;