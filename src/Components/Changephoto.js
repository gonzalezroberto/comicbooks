import "../stylesheets/Signup.css"
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
class Changephoto extends React.Component {
  constructor(props)
  {
    super(props);
    console.log('CP prop',props);
    this.state = {url:''}
  }
  handleSubmit = event => {
      var url=this.state.url
      axios.post(`changephoto`, {url})
        .then(res => {
          window.location='/profile';
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
    <h2>Change Photo Form</h2>
    <form>
        <p><input className ="profile-img-url"
        type ="text"
        placeholder ="New Image URL"
        onChange = {event => props.setState({url: event.target.value})}
        />
        <button className ="submit-button"
        type ="button"
        onClick = {event => props.handleSubmit()}
        >
        change
      </button>
    </p>
    </form>
  </div>
  );
export default withRouter(Changephoto);
