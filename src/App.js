import News from './Components/Newsfeed';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Searchbar from './Components/Searchbar';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Timeline from './Components/Timeline';
import "./App.css"
import React from 'react'
import { BrowserRouter as Router, Route, Link, redirect, withRouter} from 'react-router-dom'
{
  this.state = {redirect: ''}
}
class Main extends React.Component {
  constructor() {
    super();
    this.state = {redirect:''};
  }
  componentDidMount(){
    console.log("in componentDidMount")
    fetch('api/login', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  }).then(res => res.json()).then( json =>
    {
      console.log('json', json);
      this.setState({redirect:json});
    })
  }
  switchView(props){
    if(props.state.redirect === false)
    return Mainlog();
    else {
      return loggedinMain();
    }
  }
  render(){
    var view = this.switchView(this);
    return (
      <div className ="login-view">
        {view}
      </div>
    );
  }
}

const Mainlog = () => (
        <Router>
            <div className ="main-background">
              <header>
                <div className = "top_header"></div>
              <nav>
              <ul>
                  <Link to="/">Home </Link>
                  <Link to="/search">Search </Link>
                  <Link to="/register">Login/Signup </Link>
                  <Link to="/account">Account </Link>
              </ul>
              </nav>
              </header>
              <Route exact path="/" render={() => <News/>}/>
              <Route  path="/search" render={() => <Searchbar/>}/>
              <Route exact path="/register" render={() =><Signup/>}/>
              <Route exact path="/login" render={() => <Login/>}/>
          </div>
        </Router>
    );
    const loggedinMain = () => (
            <Router>
                <div className ="main-background">
                  <header>
                    <div className = "top_header"></div>
                  <nav>
                  <ul>
                      <Link to="/">Home </Link>
                      <Link to="/search">Search </Link>
                      <Link to="/profile">Profile </Link>
                      <Link to="/account">Account </Link>
                  </ul>
                  </nav>
                  </header>
                  <Route exact path="/" render={() => <News/>}/>
                  <Route  path="/search" render={() => <Searchbar/>}/>
                  <Route exact path="/register" render={() =><Signup/>}/>
                  <Route exact path="/login" render={() => <Login/>}/>
                  <Route exact path="/profile" render={() => <Timeline/>}/>
              </div>
            </Router>
        );
export default Main;
