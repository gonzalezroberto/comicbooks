import React, { Component } from 'react';
import Comicbook from './Comicbook';
import axios from 'axios';
class Profile extends Component {
  constructor() {
    super();
    this.state = {redirect:''};
  }
  componentDidMount(){

  }
  logout()
  {
    fetch('api/logout', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  }).then(res => res.json()).then( json =>
    {
      console.log(json);
      this.setState({redirect:json})
  }).then(this.forceUpdate());
  }

  render() {
    return (
      <div className="feed">
        <h4> Profile Coming soon...</h4>
          <button className ="submit-button"
          type ="button"
          onClick = {event => this.logout()}
          >
          Logout
          </button>
      </div>
    );
  }
}
export default Profile;
