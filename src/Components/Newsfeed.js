import React, { Component } from 'react';
import News from './News'
import axios from 'axios'
import "../stylesheets/newsfeed.css"
import { BrowserRouter as Router, Route,Switch, Link, redirect, withRouter} from 'react-router-dom'
class Newsfeed extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { news: [], loggedIn:'' };
    console.log("this.state.loggedIn :" , this.state.loggedIn )
  }
  componentWillMount(){
    axios.get('/api/loadnews')
      .then(res =>{
        // console.log('res.data',res.data);
        // var data= res.data, tempArr =[];
        // data = data.replace('[{', '');
        // var arrayOfStrings = data.split('},{');
        // for (var i = 0; i < arrayOfStrings.length-1; i++) {
        //   arrayOfStrings[i] = '{'+ arrayOfStrings[i] + '}'
        //   console.log('aoS' ,arrayOfStrings[i])
        //   tempArr.push(JSON.parse(arrayOfStrings[i]));}
        // var lastEntry= '{' + arrayOfStrings[arrayOfStrings.length-1]
        // tempArr.push(JSON.parse(lastEntry));
        this.setState({news:res.data});
      }).catch(err => console.log(err));
  };
  render() {
    return (
      <div className ="main">
        <h5>Newsfeed v100</h5>
        <ul>
          <p>
        {this.state.news.map(news => {return( <News news= {news}/>)})}
        </p>
        </ul>
      </div>
  )};

}
export default withRouter(Newsfeed);
