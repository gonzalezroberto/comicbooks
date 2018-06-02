import Newsfeed from './Components/Newsfeed';
import Signup from './Components/Signup';
import Searchbar from './Components/Searchbar';
import Profile from './Components/Profile';
import ComicProfile from './Components/ComicProfile';
import SeriesProfile from './Components/SeriesProfile';
import Users from './Components/Users';
import NewsProfile from './Components/NewsProfile';
import ProfileVisit from './Components/ProfileVisit';
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

    componentDidMount(){
      axios.get('auth/login', {
      baseURL: 'http://fizzcomics.herokuapp.com'
      //baseURL: 'http://localhost:3000'
      })
      .then( res =>
        { console.log('axio.get in main:',res.data);
          this.setState({isAuthenticated:res.data});  })
      .catch(error => {console.log("axios.get error");});
    };

    handleAuthChange(status)
    {
      this.setState({isAuthenticated:status});
    }
    render()
    {
      return(
        <div className="mainlayer">
        <Router>
            <div className ="main-background">
              <header>
                <div className = "top_header"></div>
              <nav>
              <ul className="navbar">
                <Link to="/">Home </Link>
                <Link to="/search">Catalog</Link>
                <Link to="/users">Users </Link>
                <Link to="/profile">Profile </Link>
                <Link to="/login">Login </Link>
              </ul>
              </nav>
              </header>
              <Switch>
                <Route exact path="/" exact render={(props)=> <Newsfeed/>}/>
                <Route exact path="/search" render={(props)=><Searchbar/>}/>
                <PrivateRoute authStatus={this.state.isAuthenticated} authCheck={this.handleAuthChange} exact path="/profile" component={Profile}/>
                <Route path="/register" render={(props)=><Signup state={this.state.isAuthenticated} authCheck={this.handleAuthChange}{...props}/>}/>
                <Route exact path="/login"  render={(props)=> <Login state={this.state.isAuthenticated} authCheck={this.handleAuthChange}{...props}/>}/>
              <Route exact path="/comic/:id"  render={(props) =><ComicProfile  authCheck={this.handleAuthChange}{...props}/>}/>
              <Route exact path="/series/:series"  render={(props) =><SeriesProfile  authCheck={this.handleAuthChange}{...props}/>}/>
              <Route exact path="/news/:id"  render={(props) =><NewsProfile/>}/>
              <Route exact path="/users/:id"  render={(props) =><ProfileVisit state={this.state.isAuthenticated} {...props}/>}/>
              <Route exact path="/users"  render={(props) =><Users {...props}/>}/>
              </Switch>

          </div>

        </Router>
        <div className ="footer"><p className="footer-companyname">FizzBuzz LLC Copyright 2018 | 123 First Ave PO BOX #332</p></div>
        </div>
      )
    }


}
class Login extends React.Component {
  constructor(props)
  {
    super(props);
    console.log('login Props:', props);
    this.state = {
      redirectToReferrer: props.state,
      isAuthenticated: props.state,
      username:'', password: ''
    };
  }
  componentWillMount(){
    axios.get('/auth/login') // authenticing
      .then(res =>{
        console.log('res:',res)
          this.setState({isAuthenticated:res.data, redirectToReferrer:res.data});
          this.props.authCheck(res.data);
          console.log('isauthinlogin', this.state.isAuthenticated);
      }).catch(err => console.log(err));
  };
  handleSubmit = event => {
    event.preventDefault();
    var username= this.state.username,password= this.state.password;
    axios.post(`auth/login`, { username, password })
    .then(res => {
      console.log('auth/login', res)
      if(!res.data)
      {alert('Account not found!')}
      else{
      this.props.authCheck(res.data);
      this.setState({ redirectToReferrer: res.data,isAuthenticated: res.data});
    }
    }).catch(err => console.log(err));
    }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/profile" } };
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
                <input className ="password"
                  type ="password"
                  placeholder ="password"
                   onChange = {event => this.setState({password: event.target.value})}/>
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
