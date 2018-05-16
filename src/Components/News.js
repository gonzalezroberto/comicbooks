import React from 'react';

const News = (props) => {
return (
<li>
<div className="comicbook-element">
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
