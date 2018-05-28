import React from 'react';
import "../stylesheets/News.css"
import { BrowserRouter as Router, Route,Switch, Link, withRouter, Redirect} from 'react-router-dom'
const News = (props) => {
return (
  <div className= "row">
<div className="title-area"><h5 className="title"><Link to={'/news/' + props.news.id}>{props.news.content}</Link></h5></div>
  <div className="date-area">date:<p1>{props.news.dateposted}</p1></div>

 <div className="pic-area"><p><span><img src={props.news.coverart} alt= "newspic"/></span></p></div>


   </div>
);
}
export default News;
