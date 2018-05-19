import Newsfeed from './Components/Newsfeed';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Searchbar from './Components/Searchbar';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Timeline from './Components/Timeline';
import axios from 'axios';
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
    axios.get('/auth/login').then( res =>
    {
      console.log('res', res);
      this.setState({redirect:res});
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
        <Router>
            <div className ="main-background">
              <header>
                <div className = "top_header"></div>
              <nav>
              <ul>
                <Link to="/">Home </Link>
                <Link to="/search">Search </Link>
                <Link to="/profile">Profile </Link>
                <Link to="/login">Login </Link>
                  <Link to="/register">Signup </Link>
              </ul>
              </nav>
              </header>
              <Switch>
                <Route path="/" exact render={() => <Newsfeed/>}/>
                <Route path="/search" render={() => <Searchbar/>}/>
                <Route path="/register" render={() =><Signup/>}/>
                <Route path="/login" render={() => <Login/>}/>
                <Route render = {() => <Newsfeed/>}/>
              </Switch>
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
                        <Link to="/login">Login </Link>
                          <Link to="/register">Signup </Link>
                  </ul>
                  </nav>
                  </header>
                  <Route exact path="/" render={() => <Newsfeed/>}/>
                  <Route  path="/search" render={() => <Searchbar/>}/>
                  <Route exact path="/register" render={() =><Signup/>}/>
                  <Route exact path="/login" render={() => <Login/>}/>
                  <Route exact path="/profile" render={() => <Timeline/>}/>
              </div>
            </Router>
        );
export default Main;
