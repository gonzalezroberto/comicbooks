import React from 'react';
import axios from 'axios';
import "../stylesheets/Timeline.css"
import "../stylesheets/Posts.css"
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
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { posts: props.state.posts, newPost:''};
  }
componentWillMount(){
  axios.get('loadposts')
      .then(res =>{
        console.log('post data:',res.data)
        this.setState({posts: res.data});
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    var content = this.state.newPost;
    axios.post(`makepost`, {content}).then(()=> {console.log("in handleSubmit")})
    .catch(err => console.log(err));

    axios.get('loadposts')
        .then((res) => {
          console.log('post data:',res.data)
          this.setState({posts: res.data});
      });
    }
  validateForm() {
    return this.state.newPost.length > 0;
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input className ="user-post"
        type ="text"
        placeholder ="What is on your mind?"
        onChange = {(event) => this.setState({newPost: event.target.value})}
         />

       <button className ="submit" disabled={!this.validateForm()} type ="submit">Post</button>
       </form>
        {this.props.state.posts.map(post => {return(<Posts key= {post.id} post= {post}/>)})}
      </div>
  )
};

}
const Posts =(props) =>{
  return(
    <div className="postblock">
      {props.post.dateposted}
      <h4>{props.post.content}</h4>
      <button>comment</button>
    </div>);
}


export default withRouter(Profile);
