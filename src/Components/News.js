import React from 'react';
import "../stylesheets/News.css"
const News = (props) => {
return (
  <p>
   <div className="pic"><p><span><img src={props.news.coverart}/></span></p></div>
   <div className="title"><h5 ><a href={props.news.newslink}>{props.news.content}</a></h5></div>

</p>
);
}
export default News;
