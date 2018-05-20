import "../stylesheets/Signup.css"
import React from 'react';
import { BrowserRouter as Router,Route, Redirect,Switch, withRouter, Link } from 'react-router-dom'
import axios from 'axios';
class Login extends React.Component {
  constructor(props){
    super(props);
    console.log(props)
    this.state = {username: '',password: '',loggedIn: props.state.data }
    if(this.state.loggedIn)
      <Redirect to='/profile'/>
  }
  handleSubmit = event => {
    event.preventDefault();
    var username= this.state.username,password= this.state.password;
    axios.post(`auth/login`, { username, password })
    .then(res =>{
      this.setState({loggedIn:res.data});
      if(res.data){this.props.pass.history.push("/")}
      else{this.props.pass.history.push("/login")}
    })
  }
  componentWillMount(){
    axios.get('auth/login')
    .then( res =>{ console.log('axio.get:',res.data);this.setState({loggedIn:res.data});})
    .catch(error => {console.log("axios.get error");});
  };

  logout(){
    axios.get('auth/logout')
    .then( res =>{this.setState({loggedIn:false})})
    .catch(error => {console.log(error.res);});}

  render()
  {
    return(  <div>
        <h2>logged in</h2>
        <form onSubmit={this.handleSubmit}>
            <input className ="username"
            type ="text"
            placeholder ="username"
             onChange = {event => this.setState({username: event.target.value})}/>
          <p><input className ="password"
            type ="password"
            placeholder ="password"
             onChange = {event => this.setState({password: event.target.value})}/>
          </p>
          <p><button className ="submit" type ="submit">Login</button></p>
        </form>
          <Link to="/register">Don't have an account? Signup! </Link>
      </div>
    );
  }
}
export default withRouter(Login);
