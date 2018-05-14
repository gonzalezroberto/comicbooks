import React, { Component } from 'react';
import Comicbook from './Comicbook';
import axios from 'axios';
class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async getData() {
       const res = await axios('/profile');
       return await res.json(); // (Or whatever)
   }
  render() {
    return (
      <div className="feed">
        <h4> Profile Coming soon...</h4>
      </div>
    );
  }
}
export default Profile;
