import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';
import firebase from 'firebase/app'
import 'firebase/auth'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../logo.png';
 
 
class LoginComponent extends React.Component {
   constructor() {
       super();
       this.state = {
           email: null,
           password: null,
           loginError: ''
       }
   }
 
   render() {
 
       const { classes } = this.props;
       return(<main className={classes.main}>
           <img src={logo} alt="Logo" style={{width:"27vw", textAlign: "center"}} />
           <CssBaseline></CssBaseline>
           <Paper className={classes.paper}>
               <Typography component='h2' variant='h2' style={{fontFamily: 'ModernSans'}}>
                   Login
               </Typography>
               <form className={classes.form} onSubmit={(e) => this.submitLogin(e)}>
               <FormControl required fulllWidth margin='normal' style={{display: 'flex'}}>
                   <InputLabel htmlFor='login-email-input' style={{fontFamily:'ModernSans'}}>Enter Your Email</InputLabel>
                   <Input autoComplete="email" autoFocus id="login-email-input" style={{fontFamily:'ModernSans'}} onChange={(e) => this.userTyping('email', e)}></Input>
               </FormControl>
               <FormControl required fulllWidth margin='normal' style={{display: 'flex'}}>
                   <InputLabel htmlFor='login-password-input' style={{fontFamily:'ModernSans'}}>Enter Your Password</InputLabel>
                   <Input Focus id="password" type='password' style={{fontFamily:'ModernSans'}} onChange={(e) => this.userTyping('password', e)}></Input>
               </FormControl>
               <Button type="submit" fullWidth variant='contained' style={{backgroundColor: '#58D0E1', fontFamily:'ModernSans400'}} className={classes.submit}>Login</Button>
               </form>
               {
                   this.state.loginError ?
                   <Typography className={classes.errorText} component='h5' variant='h6'>
                       Incorrect Login Information.
                   </Typography> :
                   null
               }
           </Paper>
           <Link className={classes.signUpLink} to='/signup' style={{fontFamily:'ModernSans', color: '#000000', textDecoration: 'none'}}>Don't have an account?</Link>
       </main>);
   }
 
userTyping = (type, e) => {
   switch (type) {
       case 'email':
           this.setState({ email: e.target.value });
           break;
 
       case 'password':
           this.setState({ password: e.target.value });
           break;
  
       default:
           break;
   }
}
 
submitLogin = (e) => {
   e.preventDefault();
 
   firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
   .then(() => {
       this.props.history.push("/dashboard");
   }, err => {
       this.setState({ loginError : 'Server Error'});
       console.log(err);
   });
}
}
 
export default withStyles(styles)(LoginComponent);
 

