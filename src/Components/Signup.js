import "../stylesheets/Signup.css"
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
class Signup extends React.Component {
  state = {
    email: '',
    pass: '',
    firstname: '',
    lastname: ''
  }

  handleChange = event => {
    this.setState({ email: event.target.value,
      pass:event.target.value,
      firstname:event.target.value ,
      lastname:event.target.value });
  }

  handleSubmit = event => {
      var email= this.state.email,
          pass = this.state.pass,
          firstname= this.state.firstname,
          lastname=this.state.lastname


    axios.post(`api/signup`, { email, pass, firstname,lastname })
      .then(res => {
        alert(res.data);
      }).catch(error => {console.log("error")});
  }
  render() {
    var signupformcomp = signupform();
    return (
      <div className ="signup-field">
        {signupformcomp}
      </div>
    )
  }
}
const signupform =() =>
(

  <div>
      <h2>Signup Form</h2>
  <form>
  <p>
  <input className ="firstname"
  type ="text"
  placeholder ="First Name"
  onChange = {event => this.setState({firstname: event.target.value})}
  />
  </p>
  <p>
  <input className ="lastname"
  type ="text"
  placeholder ="Last Name"
  onChange = {event => this.setState({lastname: event.target.value})}
  />
  </p>
<p>
<input className ="email"
type ="text"
placeholder ="email"
onChange = {event => this.setState({email: event.target.value})}
/>
</p>
<p>
<input className ="password"
type ="password"
placeholder ="password"
onChange = {event => this.setState({pass: event.target.value})}
/>
</p>
<p>
<button className ="submit-button"
type ="button"
onClick = {event => this.handleSubmit()}
>
Sign Up
</button>
</p>
</form>
<Link to ="/login"> Already a user? Login </Link>
</div>
);

export default Signup;
