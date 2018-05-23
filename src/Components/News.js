import React from 'react';
import "../stylesheets/News.css"
const News = (props) => {
return (
  <div className= "row">
<div className="title-area"><h5 className="title"><a href={props.news.newslink}>{props.news.content}</a></h5></div>
  <div className="date-area">date:<p1>{props.news.dateposted}</p1></div>

 <div className="pic-area"><p><span><img src={props.news.coverart} alt= "newspic"/></span></p></div>


   </div>
);
}
export default News;
