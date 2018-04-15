import { CircularProgress, Divider } from 'material-ui'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _ from 'underscore'
import * as BooksApi from '../../BooksAPI'
import Item from '../item/Item'

import '../../css/Fonts.css'

const style = {
  h3Style: {
    fontFamily: '\'Gloria Hallelujah\', cursive',
    fontSize: 'xx-large',
    marginLeft: '10px'
  },
  input: {
    width: '80%',
    padding: '15px',
    margin: '50px 10%',
    display: 'inline-block',
    border: '2px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '20px',
    fontFamily: '\'Gloria Hallelujah\', cursive',
    outline: 'none'
  }
}

class Search extends Component {

  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchResult: [],
    isLoading: false,
  }

  handleInputChange = (e) => {
    const value = e.target.value

    if (value) {
      this.setState({query: value})
      this.populateResults(value)
    } else {
      this.setState({searchResult: [], query: ''})
    }
  }

  populateResults = _.debounce(query => {

    this.setState({isLoading: true})

    BooksApi.search(query.trim()).then(books => {
      if (!books.error) {

        if (query !== this.state.query.trim()) {
          this.setState({searchResult: [], isLoading: false})
          return
        }

        books.map(book => {
          let shelf = this.props.updateShelf(book)
          book.shelf = shelf ? shelf : ''
        })

        this.setState({searchResult: books, isLoading: false})
      } else {
        this.setState({searchResult: [], isLoading: false})
      }
    })
  }, 600)

  render () {

    const {query, searchResult, isLoading} = this.state

    const ownedBooks = searchResult.filter(book => book.shelf !== '')
    const newBooks = searchResult.filter(book => book.shelf === '')

    return (
      <div>
        <input
          type='text'
          placeholder='Search books by title'
          value={query}
          onChange={this.handleInputChange}
          style={style.input}
        />

        {isLoading && (
          <div style={{margin: 'auto'}}>
            <CircularProgress size={60} thickness={7}/>
          </div>
        )}

        <div style={{display: ownedBooks.length > 0 ? 'block' : 'none'}}>
          <h3 style={style.h3Style}>Owned</h3>
          <ul style={{listStyleType: 'none'}}>
            {ownedBooks.map(book => (
              <li key={book.id}>
                <Item book={book} updateBook={this.props.updateBook}/>
              </li>
            ))}
          </ul>
        </div>
        <Divider inset={true} style={{
          backgroundColor: '#1d1508',
          display: ownedBooks.length > 0 ? 'block' : 'none'
        }}/>
        <div style={{display: newBooks.length > 0 ? 'block' : 'none'}}>
          <h3 style={style.h3Style}>New</h3>
          <ul style={{listStyleType: 'none'}}>
            {newBooks.map(book => (
              <li key={book.id}>
                <Item book={book} updateBook={this.props.updateBook}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

}

export default Search