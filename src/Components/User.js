import React from 'react';
const User = (props) => {
return (
  <div className= "blah">
    <p>
      <img src={props.profilepicture} width = "130" height = "130"/>
      <p>name: {props.firstname + " " + props.lastname}</p>
      <p>email: {props.username}</p>
    </p>
   </div>
);
}
export default User;
