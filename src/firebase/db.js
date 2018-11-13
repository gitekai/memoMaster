import {db} from './firebase'

const doCreateUser = (id,username, email) => 
db.ref(`users/${id}`).set({
  username, 
  email,
});

const doCreateMayorSystem = (userID, mayorSystem) => 
db.ref(`mayorSystems/${userID}`).set(
  {...mayorSystem}
)

const onceGetMajorSystem = (userID ) => {
  return db.ref(`mayorSystems/${userID}`).once('value');
}

const onceGetUsers = () => 
db.ref('users').once('value');

export {doCreateUser, onceGetUsers, onceGetMajorSystem,doCreateMayorSystem}; 
