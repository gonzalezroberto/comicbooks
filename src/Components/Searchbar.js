import React from 'react';
import axios from 'axios';
import "../stylesheets/Searchbar.css";
import Comicbook from "../Components/Comicbook"
const Item = ({item}) =>  <li alt="searchres"><a href={'/' + item.cid} > <pp>{item.title}</pp> by {item.writers} </a> <a href={"/"+item.cid}> <img src={item.coverArt} alt="searchpic"/> </a> </li>
//const Item = ({item}) =>  <li><a href={'/comic/'+ String(item.id)}> {item.title} by {item.writers} </a> <a href={'/comic/'+String(item.id)}> <img src={item.coverArt}/> </a> </li>
const List = ({items,query}) => {
  let filteredItems = items.filter( item => item.title.includes(query));
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
        <input onChange={this.search} ref={ el => this.searchEl = el } />
        <List {...this.state} />
    </div>
)
}
export default Searchbar;
