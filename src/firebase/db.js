import {db} from './firebase'

const doCreateUser = (id,username, email) => 
db.ref(`users/${id}`).set({
  username, 
  email,
});

const onceGetUsers = () => 
db.ref('users').once('value');

export {doCreateUser, onceGetUsers}; 
