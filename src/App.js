import Newsfeed from './Components/Newsfeed';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Searchbar from './Components/Searchbar';
import Timeline from './Components/Timeline';
import axios from 'axios';
import "./App.css"
import React from 'react'
import { BrowserRouter as Router, Route,Switch, Link, withRouter} from 'react-router-dom'
class Main extends React.Component {
  constructor() {
    super();
    this.state = {loggedIn:''};
  }
  componentWillMount(){
    axios.get('/auth/login')
    .then( res =>{
      console.log('res', res);
      this.setState({loggedIn:res});
    }).catch(err => console.log(err));
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
            <Route path="/" exact render={(props)=> <Newsfeed pass={props} state={this.state.loggedIn}/>}/>
            <Route path="/search" render={(props)=><Searchbar pass={props} state={this.state.loggedIn}/>}/>
            <Route path="/profile" render={(props)=><Timeline pass={props} state={this.state.loggedIn}/>}/>
            <Route path="/register" render={(props)=><Signup pass={props}/>}/>
            <Route path="/login" render={(props)=><Login pass={props} state={this.state.loggedIn}/>}/>
            <Route component= {Newsfeed}/>
          </Switch>
      </div>
    </Router>
    )
  }
}
// const PrivateRoute = ({ component: Component}) => (
//   <Route
//     render={props =>
//       fakeAuth.isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );
// const isAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };
export default withRouter(Main);
