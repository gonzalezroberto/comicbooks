import React from 'react';
import "../stylesheets/News.css"
const News = (props) => {
return (
  <div className= "row">
    <div className="date-area"><h7 className="date">posted: {props.news.dateposted}</h7></div>
   <div className="pic-area"><p><span><img src={props.news.coverart}/></span></p></div>
   <div className="title-area"><h5 className="title"><a href={props.news.newslink}>{props.news.content}</a></h5></div>

   </div>
);
}
export default News;
