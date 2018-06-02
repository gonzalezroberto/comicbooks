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
class Popup extends React.Component{
  constructor(props)
  {
    console.log('popup props:' , props)
    super(props);
  }
  render(){
    return(

      <div className='popup'>
        <div className='popup_inner'>
          <div className='inputs'>
         <input className="img" id="img"type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
           placeholder="img URL"/>
         <input className="title" id="title"type="text"
           onChange =  {event => {this.props.change(event.target.value,event.target.id)}}
           placeholder="Title"/>
         <input className="series" id="series"type="text"
           onChange =  {event => {this.props.change(event.target.value,event.target.id)}}
           placeholder="Series"/>
         <input className="writer" id="writer"type="text"
           onChange = {event => this.props.change(event.target.value,event.target.id)}
           placeholder="Writer"/>
         <input className="artist" id="artist"type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
           placeholder="Cover Artists"/>
         <input className="editor" id="editor"type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
           placeholder="Editor"/>
         <input className="publish" id="publisher"type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
           placeholder="Publisher"/>
         <input className="date" id="datepublished" type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
            placeholder="Data Published"/>
          <input className="characters" id="characters"type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
            placeholder="Characters"/>
          <input className="synopsis" id="synopsis"type="text"
           onChange = {event => this.props.change(event.target.value,event.target.id)}
            placeholder="Synopsis"/>
        </div>
        <button onClick = {this.props.submit}type="button">Submit Form</button>
        <button onClick={this.props.closePopup}>Close</button>
      </div>
    </div>
    );
  }
}
class Searchbar extends React.Component {
  constructor()
  {
    super();
    this.state = {
      items: [],
      query: '',
      showPopup: false,
      img:'',
      title:'',
      series:'',
      writer:'',
      artist:'',
      editor:'',
      publisher:'',
      datepublished:'',
      characters:'',
      synopsis:''

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  togglePopup(){
  this.setState({
    showPopup: !this.state.showPopup
  });
}
handleChange =(event, value)=>{
  console.log('event', event)
  console.log('value', value)
  this.setState({[value]: event});
  console.log('this.state.title', this.state.title)
}
handleSubmit = event => {
  event.preventDefault()
  console.log('handle');
  var comic ={img:this.state.img,title:this.state.title,
  series:this.state.series,writer:this.state.writer,
  artist:this.state.artist, editor:this.state.editor,
  publisher:this.state.publisher,datepublished:this.state.datepublished,
  characters:this.state.characters,synopsis:this.state.synopsis}
  console.log(comic);
    axios.post(`data/submitcomic`, {comic})
      .then(res => {
        console.log('submitcomic',res);
      }).catch(error => {console.log("error")});
  fetch('/data/comics')
  .then( res => res.json() )
  .then( items => this.setState({items}) )
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
          <button className ="editCom"
                type ="button"
                onClick = {this.togglePopup.bind(this)}
                >
                Add Comic
                </button>
                {this.state.showPopup? <Popup text ='close'
                  change={this.handleChange.bind(this)}
                  submit={this.handleSubmit.bind(this)}
                  closePopup={this.togglePopup.bind(this)}/>
                  :null}
      <List {...this.state} />
    </div>
)
}
export default Searchbar;
