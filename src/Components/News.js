import React from 'react';
import "../stylesheets/News.css"
const News = (props) => {
return (
<li>
<div className="comicbook-element">
<div className ="coverart" />
 <img src={props.news.coverart} width = "10" height = "20"/>

<div className="date">
date: {props.news.dateposted}
</div>
<div className="content">
{props.news.content}
</div>
{/* <div className="coverart">
<img src={props.comics.coverArt} width = "130" height = "200"/>
</div> */}
</div>
</li>
);
}
export default News;
