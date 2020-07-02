import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs2';
import {JsonRpc, Api} from 'eosjs';

ScatterJS.plugins( new ScatterEOS() );

const network = ScatterJS.Network.fromJson({
    blockchain:'eos',
    chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    host:'localhost',
    port:'8888',
    protocol: 'http'
})

// Run ScatterJS.Connect
ScatterJS.connect('UserList',{network}).then(connected => {
    if(!connected) return console.error('no scatter');
    ScatterJS.login().then(id=> {
        if(!id) return console.error('no identity');
    });
});

// perpetually update that status id
const setStatus = () => {
    //const status = document.getElementById('status');
    if(!ScatterJS) return console.error('No Scatter');
    if(!ScatterJS.identity) return console.error('No Identity');
    //status.innerText = ScatterJS.identity.accounts[0].name;
};
setStatus();
setInterval(() => {
    setStatus();
}, 50);


        // set up our RPC + API
const rpc = new JsonRpc(network.fullhost());    
const api = ScatterJS.eos(network, Api, {rpc});

const logout = () => {
    ScatterJS.logout();
}

const login = () => {
    ScatterJS.login();
}

const regusr = () => {
    transact('regusr');
}

const unregusr = () => {
    transact('unregusr');
}
const regdev = (data) => { 
    transact('regdev', data);
}
const unregdev = (data) => {
    transact('unregdev', data);
}

const getusr = () => {
    const account = ScatterJS.account('eos');
    return account.name;
}
const transact = (actionname, data) => {
    ScatterJS.login().then(id => {
        if(!id) return console.error('no identity');
        const account = ScatterJS.account('eos');


        api.transact({
            actions:[{
                account: 'scattertest',
                name: actionname,
                authorization: // user paying for resources must go first
                [{
                    actor: account.name,
                    permission: account.authority,
                }],
                data: {
                    //TODO: pass in data object
                    username: account.name,
                    ...data
                }
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        }).then(res => {
            console.log('sent tx: ', res);
        }).catch(err => {
            console.error('error thrown: ', err);
        });
    });
}

export {transact, setStatus, logout, login, regusr, unregusr, regdev, unregdev, getusr};