import React from 'react';
import "../stylesheets/Posts.css"
    console.log('props', props);
    // variables used for date format
    var date = props.posts.dateposted //Type: String; FORMAT: 2018-05-16T11:10:38.000Z
    var month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    // var hour = parseInt(date.substring(11,2))
    var amPm = "AM"
    // if(hour >= 12 && hour <= 23){
    //     hour = parseInt(hour/12)
    //     amPm = "PM"
    // }else if(hour == 0) hour = 12
    // //

    return (
        <li>
            <div className = "statNews">
               <section className="statUser">

                <h2>{
                    // date in custome format "hh:mm:ss month day, year"
                  //  hour + date.substr(13,3) + amPm + " " + month[parseInt(date.substr(5,2)) - 1] + " " + date.substr(8,2) + ", " + date.substr(0,4)
                    }</h2>
                <p>
                    {props.posts.content}
                </p>
                <button type = "button" className = "likeButton">Like</button>
                <button type = "button" className = "commButton">Comment</button>
                </section>
              </div>
        </li>
    );
}

export default Posts;
