import React, { Component } from 'react';
import Login from './Components/Login';

class App extends Component {
  constructor() {
    super();
    this.state = { message: '' };
  }
  // componentDidMount() {
  //   fetch('/api/message')
  //     .then(response => response.json())
  //     .then(json => this.setState({ message: json }));
  // }
  render() {
    return (
      <div>
        <title>Layout Demo</title>
        {/* content goes here */}
        <header>
          <section>
            <div className="container">
              <label htmlFor="uname"><b>Username</b></label>
              <input type="text" placeholder="Enter Username" name="uname" required />
              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw" required />
              <button type="submit">Login</button>
              <button type="signup">Sign Up</button>
              <label>
                <input type="checkbox" defaultChecked="checked" name="remember" /> Remember me
              </label>
            </div>
            <nav>
              <ul>
                <li><a href="./App.js">Home</a></li>
                <li><a href="./search.js">Comic Search</a></li>
                <li><a href="./user.js">User Profile</a></li>
                <li><a href="./contact.js">Contact Us</a></li>
              </ul>
            </nav>
          </section>
        </header>
        <main>
        

                 
        </main>
        <footer />
      </div>
    );
  }
}

export default App;
