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
    return ScatterJS.identity.accounts[0].name;
};
setStatus();
setInterval(() => {
    setStatus();
}, 50);


        // set up our RPC + API


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
    return ScatterJS.identity.accounts[0].name;
}

const getDeviceByName = async() => {
    try {
        const rpc = new JsonRpc(network.fullhost());     
        const result = await rpc.get_table_rows({
          json: true,
          code: 'userlist',    // contract who owns the table
          scope: 'userlist',   // scope of the table
          table: 'devicelist',          // Table name
        //   table_key: 'username',           // Table secondary key name
        //   lower_bound: 'account',
        //   upper_bound: 'account',            // Table secondary key value
          limit: 99,                   // Here we limit to 1 to get only row
          reverse: false,
          show_payer: false,
        });
        return result.rows;
      } catch (err) {
        console.error(err);
      }
    }
    



const transact = (actionname, data) => {
    ScatterJS.login().then(id => {
        if(!id) return console.error('no identity');
        const account = ScatterJS.account('eos');
        const rpc = new JsonRpc(network.fullhost());    
        const api = ScatterJS.eos(network, Api, {rpc});


        api.transact({
            actions:[{
                account: 'userlist',
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

export { transact, setStatus, logout, login, regusr, unregusr, regdev, unregdev, getusr, getDeviceByName};