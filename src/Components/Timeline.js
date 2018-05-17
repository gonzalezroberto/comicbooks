import React from 'react';
import axios from 'axios';
import "../stylesheets/Timeline.css"
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect,Switch, withRouter } from 'react-router'

class Timeline extends React.Component {
constructor(){
  super();
  this.state = {accounts:[], loggedIn:''};
}

componentWillMount(){
  var user = {
    first:'',
    last:'',
    id: '',
    username: '',
    pic: ''
  }
  axios.get('/api/getuser')
      .then(res =>{
        user.first = res.data.firstname;
        user.last = res.data.lastname;
        user.id = res.data.id;
        user.username = res.data.username;
        user.pic = res.data.profilepicture;
        console.log('user:',user);
        this.setState({accounts: [user]});
        console.log('isarray?: ', Array.isArray(this.state.accounts))
    });
}
makePost(){
  this.props.router.push('/makepost');
}
// makeComment(){
// }
logout()
{
  axios.get('api/logout').then( res =>
  {this.setState({loggedIn:res})
}).then(()=> {return window.location.href='/login';});
}
render()
{ console.log('this.state.accounts: ', this.state.accounts)
  return(
    <div className = "pageContainer">
      <div className = "row">
        <div className = "column">
          <div className ="leftColumn">
            <div className = "profileForm">
              <div className = "proContainer">
              <h1 className = "proTitle" > My Profile </h1>

              <p>
              {this.state.accounts.map(user => { return <User user={user}/>})}
              <button className ="submit-button"
              type ="button"
              onClick = {event => this.logout()}
              >
              Logout
              </button>
              </p>
              </div>
            </div>

            <div className = "centerColumn">
              <div className = "inputForm">
              <input className ="statInput"
              type ="text"
              placeholder ="Status"
              name = "content"
              />
              <button type = "button" className = "statButton"
              onClick = {() => this.makePost()}>
              Post</button>
              </div>

              <div className = "statNews">
                <section className="statUser">
                  <h2>Bryan Rivera</h2>
                    <p>
                    I went to hiking
                    </p>
                    <button type = "button" className = "likeButton">Like</button>
                    <button type = "button" className = "commButton">Comment</button>
                    </section>
            </div>

            <div className = "statNews">
              <section className="statUser">
                <h2>Bryan Rivera</h2>
                  <p>
                  Roberto, Jong, Adrian, and Jordan
                  </p>
                  <button type = "button" className = "likeButton">Like</button>
                  <button type = "button" className = "commButton"
                  onClick = {() => this.makeComment()} >Comment</button>
                  </section>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
}
export default Timeline;

const User = (props) =>
{
  return (<p>
    <img src={props.user.pic} width = "130" height = "130"/>
    <p>name: {props.user.first + " " + props.user.last}</p>
  <p>email: {props.user.username}</p>

  </p>)

}
