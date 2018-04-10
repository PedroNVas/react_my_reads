import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _ from 'underscore'
import * as BooksApi from '../../BooksAPI'
import SearchBook from '../../components/SearchBook/SearchBook'

const style = {
  paperStyle: {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center'
  }
}

class SearchPage extends Component {

  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchResult: []
  }

  // TODO - HANDLE MULTIPLE QUERIES
  // TODO - FIX BUG that when deleting input it will retrieve another batch of books
  populateResults = _.debounce(query => {
    BooksApi.search(query).then(books => {
      if (!books.error) {
        this.setState({searchResult: books})
      } else {
        this.setState({searchResult: []})
      }
    })
  }, 150)

  handleInputChange = (e) => {
    const value = e.target.value

    if (value) {
      this.setState({query: value})
      this.populateResults(value)
    } else {
      this.setState({searchResult: [], query: ''})
    }
  }

  updateBookShelf = (searchResult) => {
    searchResult.map(book => {
      let shelf = this.props.updateShelf(book)
      book.shelf = shelf ? shelf : ''
    })
  }

  render () {

    const {query, searchResult} = this.state

    this.updateBookShelf(searchResult)

    const ownedBooks = searchResult.filter(book => book.shelf !== '')
    const newBooks = searchResult.filter(book => book.shelf === '')

    const selector = (book) => (
      <select onChange={(event) => this.props.updateBook(book, event.target.value)} value='none'>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )

    return (
      <div>
        <input
          className="search-books-bar"
          type='text'
          placeholder='Search books'
          value={query}
          onChange={this.handleInputChange}
        />
        <div style={{display: ownedBooks.length > 0 ? 'block' : 'none'}}>
          <h3>Owned</h3>
          <ul style={{listStyleType: 'none', width: '70px'}}>
            {ownedBooks.map(book => (
              <li key={book.id}>
                <SearchBook data={book}/>
              </li>
            ))}
          </ul>
        </div>
        <div style={{display: newBooks.length > 0 ? 'block' : 'none'}}>
          <h3>New</h3>
          <ul style={{listStyleType: 'none', width: '100px'}}>
            {newBooks.map(book => (
              <li key={book.id}>
                <SearchBook data={book}/>
              </li>
            ))}
          </ul>
        </div>
        {/*<List>*/}
        {/*<Subheader*/}
        {/*inset={true}*/}
        {/*style={{backgroundColor: '#5C6BC0'}}*/}
        {/*>Owned</Subheader>*/}
        {/*{searchResult.filter(book => book.shelf !== '').map(book => (*/}
        {/*<ListItem key={book.id} primaryText={book.title} secondaryText={book.shelf}*/}
        {/*hoverColor="#F3E5F5"*/}
        {/*style={{backgroundColor: '#e3f9fc'}}*/}
        {/*children={selector(book)}/>*/}
        {/*))}*/}
        {/*</List>*/}
        {/*<Divider inset={true}/>*/}
        {/*<List>*/}
        {/*<Subheader*/}
        {/*inset={true}*/}
        {/*style={{backgroundColor: '#5C6BC0'}}*/}
        {/*>New</Subheader>*/}
        {/*{searchResult.filter(book => book.shelf === '').map(book => (*/}
        {/*<ListItem key={book.id} primaryText={book.title}*/}
        {/*hoverColor="#F3E5F5"*/}
        {/*style={{backgroundColor: '#B3E5FC'}}*/}
        {/*children={selector(book)}/>*/}
        {/*))}*/}
        {/*</List>*/}
      </div>
    )
  }

}

export default SearchPage