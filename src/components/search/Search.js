import { Badge, Divider } from 'material-ui'

import SearchIcon from 'material-ui/svg-icons/action/search'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _ from 'underscore'
import * as BooksApi from '../../BooksAPI'

import '../../css/Fonts.css'
import Item from '../item/Item'
import './Search.css'

const style = {
  input: {
    width: '80%',
    padding: '15px',
    margin: '30px 10%',
    display: 'inline-block',
    border: '2px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '20px',
    fontFamily: '\'Gloria Hallelujah\', cursive',
    outline: 'none'
  },
  h3Style: {
    fontFamily: '\'Gloria Hallelujah\', cursive',
    fontSize: 'xx-large',
    marginLeft: '10px'
  },
  badge: {
    fontSize: 'large',
    top: 40,
    backgroundColor: '#f0f7fc',
    fontFamily: '\'Gloria Hallelujah\', cursive'
  },
  emptyResult: {
    left: '50%',
    textAlign: 'center',
    fontFamily: '\'Gloria Hallelujah\', cursive',
    fontSize: '20px',
    span: {
      display: 'inline-block',
      marginRight: '10px'
    }
  },
  ul: {
    listStyleType: 'none'
  },
  divider: {
    backgroundColor: '#1d1508'
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
    isEmpty: false
  }

  removeWhiteSpaces = (str) => {
    return str.replace(/ {2}/g, ' ').trim()
  }

  handleInputChange = (e) => {
    const value = e.target.value
    this.setState({query: value})
    this.populateResults(value)
  }

  populateResults = _.debounce(query => {

    const queryCleaned = this.removeWhiteSpaces(query)

    if (queryCleaned === '') {
      this.setState({searchResult: [], isEmpty: false, isLoading: false})
      return
    }

    this.setState({isLoading: true})

    BooksApi.search(queryCleaned)
      .then(response => {

        if (queryCleaned !== this.removeWhiteSpaces(this.state.query)) return

        const emptyResponse = !!response.error
        const searchResult = emptyResponse ? [] : response

        searchResult.forEach(book => {
          let shelf = this.props.updateShelf(book)
          book.shelf = shelf ? shelf : ''
        })

        this.setState({searchResult: searchResult, isEmpty: emptyResponse, isLoading: false})
      })
  }, 600)

  render () {

    const {query, searchResult, isLoading, isEmpty} = this.state

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

        {isLoading &&
        <div className='spinner'/>
        }

        {isEmpty &&
        <div style={style.emptyResult}>
          <p>No results found!</p>
          <div>
            <span style={style.emptyResult.span}>Trying searching something else!</span>
            <SearchIcon color="#1d1508"/>
          </div>
        </div>
        }

        {!isLoading && !isEmpty &&
        <div>
          {ownedBooks.length > 0 &&
          <div>
            <Badge
              primary={true}
              badgeContent={ownedBooks.length}
              badgeStyle={style.badge}
            >
              <h3 style={style.h3Style}>Already Owned</h3>
            </Badge>
            <ul style={style.ul}>
              {ownedBooks.map(book => (
                <li key={book.id}>
                  <Item book={book} updateBook={this.props.updateBook}/>
                </li>
              ))}
            </ul>
            <Divider inset={true} style={style.divider}/>
          </div>
          }

          {newBooks.length > 0 &&
          <div>
            <Badge
              primary={true}
              badgeContent={newBooks.length}
              badgeStyle={style.badge}
            >
              <h3 style={style.h3Style}>Newly Fetched</h3>
            </Badge>
            <ul style={style.ul}>
              {newBooks.map(book => (
                <li key={book.id}>
                  <Item
                    book={book}
                    updateBook={this.props.updateBook}
                  />
                </li>
              ))}
            </ul>
          </div>
          }
        </div>
        }
      </div>
    )
  }

}

export default Search