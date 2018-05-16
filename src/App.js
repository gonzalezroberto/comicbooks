import News from './Components/Newsfeed';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Searchbar from './Components/Searchbar';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Timeline from './Components/Timeline';
import "./App.css"
import React from 'react'
import { BrowserRouter as Router, Route,Switch, Link, redirect, withRouter} from 'react-router-dom'
{
  this.state = {redirect: ''}
}
class Main extends React.Component {
  constructor() {
    super();
    this.state = {redirect:''};
  }
  componentWillMount(){
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
    if(this.state.redirect === false)
      return (Mainlog());
    else {
      return (loggedinMain());
    }

  }
}

const Mainlog = () => (
        <Switch>
            <div className ="main-background">
              <header>
                <div className = "top_header"></div>
              <nav>
              <ul>
                  <a href="/">Home </a>
                  <a href="/search">Search </a>
                  <a href="/login">Login/Signup </a>
                  <a href="/account">Account </a>
              </ul>
              </nav>
              </header>
              <Route exact path="/" render={() => <News/>}/>
              <Route  path="/search" render={() => <Searchbar/>}/>
              <Route exact path="/register" render={() =><Signup/>}/>
              <Route exact path="/login" render={() => <Login/>}/>
          </div>
        </Switch>
    );
    const loggedinMain = () => (
            <Switch>
                <div className ="main-background">
                  <header>
                    <div className = "top_header"></div>
                  <nav>
                  <ul>
                      <Link to="/">Home </Link>
                      <Link to="/search">Search </Link>
                      <Link to="/profile">Profile </Link>
                  </ul>
                  </nav>
                  </header>
                  <Route exact path="/" render={() => <News/>}/>
                  <Route  path="/search" render={() => <Searchbar/>}/>
                  <Route exact path="/register" render={() =><Signup/>}/>
                  <Route exact path="/login" render={() => <Login/>}/>
                  <Route exact path="/profile" render={() => <Timeline/>}/>
              </div>
            </Switch>
        );
export default Main;
