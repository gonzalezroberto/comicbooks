import React from 'react';
import axios from 'axios';
import "../stylesheets/Searchbar.css";
import Comicbook from "../Components/Comicbook"
import { BrowserRouter as Router, Route,Switch, Link, withRouter, Redirect} from 'react-router-dom'
const Item = ({item}) =>  <li className="searchres"><Link to={'/comic/' + item.cid} > <pp>{item.title}</pp> by {item.writers} </Link> <Link to={"/comic/"+item.cid}> <img src={item.coverArt} alt="searchpic"/> </Link> </li>
//const Item = ({item}) =>  <li><a href={'/comic/'+ String(item.id)}> {item.title} by {item.writers} </a> <a href={'/comic/'+String(item.id)}> <img src={item.coverArt}/> </a> </li>
const List = ({items,query}) => {
  let filteredItems = items.filter( item => item.title.toLowerCase().includes(query) || item.writers.toLowerCase().includes(query) || item.characters.toLowerCase().includes(query));
  if(!filteredItems.length && query) return <div> No Match for "{query}"</div>
  return (
    <ul2>
      {
        filteredItems.map( item => <Item key = {item.id} {...{item}}
        />)
      }
     </ul2>
  )
}

class Searchbar extends React.Component {
  state = {
    items: [],
    query: ''
  }
componentWillMount(){
  fetch('/data/comics')
  .then( res => res.json() )
  .then( items => this.setState({items}) )
}
search = e => this.setState({ query: this.searchEl.value });
render = () => (
    <div>
        <input className="searchbar"onChange={this.search} ref={ el => this.searchEl = el } placeholder="search by title, author, or publisher" />
        <List {...this.state} />
    </div>
)
}
export default Searchbar;
