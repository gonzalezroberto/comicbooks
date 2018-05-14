import Newsfeed from './Components/Newsfeed';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Searchbar from './Components/Searchbar';
import Home from './Components/Home';
import Profile from './Components/Profile';
import "./App.css"
import React from 'react'
import { BrowserRouter as Router, Route, Link, redirect, withRouter} from 'react-router-dom'
const Main = () => (
        <Router>
            <div className ="main-background">
              <header>
                <div className = "top_header"></div>
              <nav>
              <ul>
                  <Link to="/">Home </Link>
                  <Link to="/search">Search </Link>
                  //<Link to="/profile">User Profile </Link>
                  <Link to="/register">Login/Signup </Link>
                  <Link to="/account">Account </Link>
              </ul>
              </nav>
              </header>
              <Route exact path="/" render={() => <Newsfeed/>}/>
              <Route  path="/search" render={() => <Searchbar/>}/>
              //<Route  path="/profile" render={() => <Profile/>}/>
              <Route exact path="/register" render={() =><Signup/>}/>
              <Route exact path="/login" render={() => <Login/>}/>
              <Route exact path="/home" render={() => <Home/>}/>
          </div>
        </Router>
    );

export default Main ;
