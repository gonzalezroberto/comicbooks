import React from 'react';
import "../stylesheets/News.css"
const News = (props) => {
return (
<div>
   <p><img src={props.news.coverart}/></p>

  <p>date: {props.news.dateposted}</p>

  <p>{props.news.content}</p>
  </div>
);
}
export default News;
