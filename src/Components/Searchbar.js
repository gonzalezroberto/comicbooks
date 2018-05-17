import React from 'react';
import axios from 'axios';
import "../stylesheets/Searchbar.css";
import Comicbook from "../Components/Comicbook"
class Searchbar extends React.Component {
  constructor() {
    super();
    this.state = { comics: [], comicsThatMatch: [], searchQuery: '' };
  }
  componentDidMount(){
    fetch('/api/comics')
      .then(result => result.json())
      .then(json => {
        this.setState({comics:json});
      });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.comics != nextState.comics;
  }
  handleSubmit = event => {
    event.preventDefault()
    const { comics, searchQuery, } = this.state
    let allSearchAbleStrings = []
    comics.map((comic, index) => {
        let strings = []
        const searchAbleKeys = [
          'title',
          'writers',
          'characters',
        ]
        searchAbleKeys.map((key) => {
          const name = comic[key]
            strings.push({ string: name, id: index })
        })
        allSearchAbleStrings = allSearchAbleStrings.concat(strings)
    })
    let comicsThatMatch = []
    allSearchAbleStrings.map(({string, id}) => {
      const _string = string.toLowerCase()
      const _searchQuery = searchQuery.toLowerCase()
      //console.log(_searchQuery, _string, _string.indexOf(_searchQuery))
      if (_string.indexOf(_searchQuery) > -1) {
        console.log(searchQuery, id)
        if (comicsThatMatch.indexOf(id) === -1) {
          comicsThatMatch.push(id)
        }
      }
    })
    this.setState({
      comicsThatMatch,
    })
};
  render() {
    return (
      <div className ="search">
        <h4>Comicbook Search</h4>
        <form onSubmit={this.handleSubmit}>
        <p>
        <input className ="form-search"
        type ="text"
        value='searchQuery'
        placeholder ="Search by title, author, or characters"
        />
        </p>
      <p>
        <button className ="search-button"
        type ="submit"
        >
        search
        </button>
      </p>
      </form>
      {this.state.comicsThatMatch.map((id) => {
        const comic = this.state.comics[id]
        console.log('Result: ', id, comic.title)
        return <div key={id}>{comic.title}</div>
      })}
      </div>
    )
  }
}

export default Searchbar;
