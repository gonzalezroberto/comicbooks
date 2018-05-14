import "../stylesheets/Signup.css"
import React from 'react';
import axios from 'axios';
class Login extends React.Component {
  state = {
    email: '',
    pass: '',
    redirect: false
  }
  handleChange = event => {
    this.setState({ email: event.target.value, pass:event.target.value, firstname:event.target.value , lastname:event.target.value });
  }
  handleSubmit = event => {
      var email= this.state.email,
      pass= this.state.pass;

    axios.post(`api/login`, { email, pass })
      .then(res => {
        window.location =res.data.redirect;ß
        //alert(res.data);
      })
  }


  render() {
    return (
      <div className ="login-field">
        <div>
          <h2>Login form</h2>
          <p>
            <input className ="form-email"
            type ="text"
            placeholder ="email"
            onChange = {event => this.setState({email: event.target.value})}
            />
          </p>
          <p>
            <input className ="form-password"
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
            Login
            </button>
          </p>
        </div>
      </div>
    )
  }
}

export default Login;
