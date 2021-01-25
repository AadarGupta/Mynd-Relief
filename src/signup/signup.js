import React from 'react';
import { Link } from 'react-router-dom'
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
import '../index.css';
import logo from '../logo.png';
 
class SignupComponent extends React.Component {
 
   constructor() {
       super();
       this.state ={
           email: null,
           password: null,
           passwordConfirmation: null,
           SignupError: ''
       }
   }
 
   render() {
 
       const { classes } = this.props;
       return(
       <main className={classes.main}>
           <img src={logo} alt="Logo" style={{width:"27vw", textAlign: "center"}} />
           <CssBaseline>
               <Paper className={classes.paper}>
                   <Typography>
                       <h1 component='h2' variant='h2' style={{fontFamily:'ModernSans'}}>
                           Create A Mynd Account
                       </h1>
                   </Typography>
                   <form onSubmit={(e) => this.submitSignup(e)} className={classes.form}>
                       <FormControl required fullWidth margin='normal'>
                           <InputLabel htmlfor="signup-email-input" style={{fontFamily:'ModernSans'}}>Enter Your Email</InputLabel>
                           <Input autoComplete="email" onChange={(e) => this.userTyping('email', e)} autoFocus id="signup-email-input"></Input>
                       </FormControl>
                       <FormControl required fullWidth margin='normal'>
                           <InputLabel htmfor="signup-password-input" style={{fontFamily:'ModernSans'}}>Create A Password</InputLabel>
                           <Input type="password"  onChange={(e) => this.userTyping('password', e)} id="signup-password-input"></Input>
                       </FormControl>
                       <FormControl required fullWidth margin='normal'>
                           <InputLabel htmfor="signup-password-confirmation-input" style={{fontFamily:'ModernSans'}}>Confirm Your Password</InputLabel>
                           <Input type="password"  onChange={(e) => this.userTyping('passwordConfirmation', e)} id="signup-password-confirmation-input"></Input>
                       </FormControl>
                       <Button type='submit' fullWidth variant='contained' style={{backgroundColor: '#58D0E1'}} className={classes.submit}>Create An Account</Button>
                   </form>
                   {
                       this.state.SignupError ?
                       <Typography className={classes.errorText} component='h5' variant='h6'>
                           {this.state.SignupError}
                       </Typography> :
                       null
                   }
               </Paper>
               <Link className={classes.logInLink} to='/login' style={{fontFamily:'ModernSans', color: '#000000'}}>Already have an Account?</Link>
           </CssBaseline>
       </main>);
   }
 
   formIsValid = () => this.state.password === this.state.passwordConfirmation;
 
   userTyping = (type, e) => {
       switch (type) {
           case 'email':
               this.setState({ email: e.target.value });
           break;
           case 'password':
               this.setState({ password: e.target.value});
           break;
           case 'passwordConfirmation':
               this.setState({passwordConfirmation: e.target.value});
           break;
          
           default:
           break;
       }
   }
 
   submitSignup = (e) => {
       e.preventDefault();
 
       if(!this.formIsValid()) {
           this.setState({ SignupError: 'Password do not match' })
           return
       }
      
       firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
       .then(authRes => {
           const userObj = {
               email: authRes.user.email
           };
           firebase.firestore().collection('users').doc(this.state.email).set(userObj).then(() => {
               this.props.history.push('/dashboard')
           }, dbError => {
           console.log(dbError);
           this.setState({ SignupError: "Failed to add user"});
           })
       }, authError => {
           console.log(authError);
           this.setState({ SignupError: "Failed to add user"});
       })
   }
}
 
export default withStyles(styles)(SignupComponent);

