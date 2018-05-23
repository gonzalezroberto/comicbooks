import "../stylesheets/Signup.css"
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
class Signup extends React.Component {
  constructor()
  {
    super();
    this.state = {  email: '',pass: '',firstname: '',lastname: ''
    }
  }
  handleSubmit = event => {
      var username= this.state.email,
          pass = this.state.pass,
          firstname= this.state.firstname,
          lastname=this.state.lastname
          console.log('email, pass, firstname, lastname', username, pass, firstname, lastname)
    axios.post(`api/signup`, { username, pass, firstname,lastname })
      .then(res => {
        alert(res.data);
      }).catch(error => {console.log("error")});
  }
  render() {
    var signupformcomp = signupform(this);
    return (
      <div className ="signup-field">
        {signupformcomp}
      </div>
    )
  }
}
const signupform =(props) =>
(

  <div>
    <h2>Signup Form</h2>
    <form>
        <input className ="firstname"
        type ="text"
        placeholder ="First Name"
        onChange = {event => props.setState({firstname: event.target.value})}
        />
        <input className ="lastname"
        type ="text"
        placeholder ="Last Name"
        onChange = {event => props.setState({lastname: event.target.value})}
        />
        <input className ="email"
        type ="text"
        placeholder ="username"
        onChange = {event => props.setState({email: event.target.value})}
        />
        <input className ="password"
        type ="password"
        placeholder ="password"
        onChange = {event => props.setState({pass: event.target.value})}
        />
        <button className ="submit-button"
        type ="button"
        onClick = {event => props.handleSubmit()}
        >
        Sign Up
      </button>
    </form>
  </div>
  );

export default Signup;
