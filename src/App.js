import Newsfeed from './Components/Newsfeed';
//import Login from './Components/Login';
import Signup from './Components/Signup';
import Searchbar from './Components/Searchbar';
import Timeline from './Components/Timeline';
import axios from 'axios';
import "./App.css"
import React from 'react'
import { BrowserRouter as Router, Route,Switch, Link, withRouter, Redirect} from 'react-router-dom'

  class Main extends React.Component{
    constructor()
    {
      super();
      this.state = {isAuthenticated:false}
    }
    render()
    {
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
                <Route path="/" exact render={(props)=> <Newsfeed/>}/>
                <Route path="/search" render={(props)=><Searchbar/>}/>
                <PrivateRoute auth={this.state.isAuthenticated} path="/profile" component={Public}/>
                <Route path="/register" render={(props)=><Signup/>}/>
                <Route path="/login" render={props=><Login state={this.state.isAuthenticated}{...props}/>}/>
                //<Route component= {Newsfeed}/>
              </Switch>
          </div>
        </Router>
      )
    }


}
const AlreadyLoggedIn = () => <h3>You already logged in!</h3>;
const Public = () => <h3>Please log in..</h3>;
 function showData(data){
   console.log('showData',data);
 }

function checkAuth()  {
  const buildResult = (succeeded: boolean) => ({ succeeded});

  var isAuthenticated = false;
    axios.get('auth/login')
    .then(res =>buildResult(res.data)).then(res => {
        isAuthenticated = res.data ;
        showData(isAuthenticated);
        return isAuthenticated;
      })
      console.log('buildResult:',buildResult);
};
class Login extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      redirectToReferrer: (false || props.state.isAuthenticated),
      username:'', password: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("handleSubmit")
    var username= this.state.username,password= this.state.password;
    axios.post(`auth/login`, { username, password })
    .then(res => { console.log(res.data);
      this.setState({ redirectToReferrer: res.data });
    });
    }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
          <div>
              <h2>Log In</h2>
              <form onSubmit={this.handleSubmit}>
                  <input className ="username"
                  type ="text"
                  placeholder ="username"
                   onChange = {event => this.setState({username: event.target.value})}/>
                <p><input className ="password"
                  type ="password"
                  placeholder ="password"
                   onChange = {event => this.setState({password: event.target.value})}/>
                </p>
                <p><button className ="submit" disabled={!this.validateForm()} type ="submit">Login</button></p>
              </form>
                <Link to="/register">Don't have an account? Signup! </Link>
            </div>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component,auth, ...rest}) => (
  <Route
    {...rest}
    render={(props) => auth === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
export default withRouter(Main);
