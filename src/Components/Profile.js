import React from 'react';
import axios from 'axios';
import "../stylesheets/Timeline.css"
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

class Profile extends React.Component {
constructor(props){
  super(props);
  this.state = {accounts:'', posts:[], followers:[], following:[], isAuthenticated:props.isAuthenticated};
}

componentWillMount(){
  var user = {first:'',last:'',id: '',username: '',pic: ''}
  axios.get('/api/getuser')
      .then(res =>{
        user.first = res.data.firstname;
        user.last = res.data.lastname;
        user.id = res.data.id;
        user.username = res.data.username;
        user.pic = res.data.profilepicture;
        console.log(user.first)
        this.setState({accounts: user});
        console.log(this.state.accounts.pic)
    });
    axios.get('profile/loadposts')
        .then(res =>{
          console.log('post data:',res.data)
          this.setState({posts: res.data});
      });
}
render()
{
  return(<Router>
    <div style={{ display: "flex" }}>
      <div
        style={{
          padding: "10px",
          width: "40%",
          background: "#f0f0f0"
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <img src={this.state.accounts.pic} />
          <li>
            <Link to={`${this.props.match.url}/timeline`}>Timeline</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/followers`}>Followers</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/following`}>Following</Link>
          </li>
        </ul>
      </div>

      <div style={{ flex: 1, padding: "10px" }}>
          <Route exact path={this.props.match.url + '/timeline'}  render={() => <Timeline state={this.state}/>} />
      </div>
    </div>
  </Router>)
}
}
const Timeline =(props) =>{
  console.log(props.state.posts)
  return(
  <div>
    {props.state.posts.map(post => {return(<Posts key= {post.id} post= {post}/>)})}
  <h2>this is where the timeline list goes</h2>
  </div>
);
}
const Posts =(props) =>{
  return(<div> {props.post.dateposted}<h4>{props.post.content}</h4></div>);
}


export default withRouter(Profile);
