import Newsfeed from './Components/Newsfeed';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Searchbar from './Components/Searchbar';
//import Timeline from './Components/Timeline';
import axios from 'axios';
import "./App.css"
import React from 'react'
import { BrowserRouter as Router, Route,Switch, Link, withRouter} from 'react-router-dom'
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
  render(){
    return(
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
            <Route path="/" exact component={Newsfeed}/>
            <Route path="/search" component={Searchbar}/>
            <Route path="/register" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route component= {Newsfeed}/>
          </Switch>
      </div>
    </Router>
)
  }
}

export default withRouter(Main);
