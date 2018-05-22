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
      console.log("in Main");
      this.handleAuthChange = this.handleAuthChange.bind(this);
    }
    componentWillMount(){
      axios.get('auth/login')
      .then( res =>
        {
          console.log('axio.get:',res.data);
          this.setState({isAuthenticated:res.data});
        })
      .catch(error => {console.log("axios.get error");});
    };
    handleAuthChange(status)
    {
      console.log('status', status);
      console.log("this.location", this.location);
      this.setState({isAuthenticated:status});
      console.log('this.isAuthenticated(main)',this.isAuthenticated);
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
                <PrivateRoute authStatus={this.state.isAuthenticated} authCheck={this.handleAuthChange} path="/profile" component={Timeline}/>
                <Route path="/register" render={(props)=><Signup/>}/>
                <Route path="/login"  render={(props)=> <Login state={this.state.isAuthenticated} authCheck={this.handleAuthChange}{...props}/>}/>

              </Switch>
          </div>
        </Router>
      )
    }


}
const AlreadyLoggedIn = () => <h3>You already logged in!</h3>;
const Public = () => <h3>Please log in..</h3>;

class Login extends React.Component {
  constructor(props)
  {
    super(props);
    console.log('login Props:', props);
    this.state = {
      redirectToReferrer: (false || props.state.isAuthenticated),
      isAuthenticated: props.state,
      username:'', password: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("handleSubmit")
    var username= this.state.username,password= this.state.password;
    axios.post(`auth/login`, { username, password })
    .then(res => { console.log('logged in successful? ',res.data);
      this.props.authCheck(res.data);
      this.setState({ redirectToReferrer: res.data,  isAuthenticated: res.data});
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
function showData(data) {
  return console.log ('showData:', data);
}
const PrivateRoute = ({ component: Component,authStatus,authCheck, ...rest}) => (
showData(authStatus),
  <Route {...rest} render={(props) => authStatus === true ? ( <Component state = {authStatus} authCheck= {authCheck}{...props} />)
    : (<Redirect to={{pathname: "/login", state: { from: props.location },}}/>)}/>
);
export default withRouter(Main);
