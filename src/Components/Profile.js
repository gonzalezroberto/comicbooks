import React, { Component } from 'react';
import Comicbook from './Comicbook';
import axios from 'axios';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn:props.state.data};
    console.log("this.state.loggedIn :" , this.state.loggedIn )
  }
  componentDidMount(){

  }
  logout()
  {
    axios.get('auth/logout').then( res => {
      console.log('res:',res);
      this.setState({redirect:false})
    }).catch(error => {console.log(error.res);});
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
export default withRouter(Profile);
