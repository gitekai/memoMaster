import React from 'react'; 
import Button from '@material-ui/core/Button';
import {auth} from '../firebase'; 

const SignOut = () => {
 
  return (
    <Button variant="contained" color="primary" onClick={auth.doSignOut} >Sign out</Button>
  )
}

export default SignOut; 

