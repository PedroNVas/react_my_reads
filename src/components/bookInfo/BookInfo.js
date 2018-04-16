import React, { Component } from 'react'
import * as BooksApi from '../../BooksAPI'

import InfoTemplate from '../infoTemplate/InfoTemplate'

class BookInfo extends Component {

  state = {
    book: {},
    isLoading: false,
    error: false
  }

  componentDidMount () {
    const bookId = this.props.match.params.id

    this.setState({isLoading: true})

    BooksApi.get(bookId)
      .then(book => {
        this.setState({book: book, isLoading: false, error: false})
      })
      .catch(() => {
        this.setState({book: {}, isLoading: false, error: `ID (${bookId}) not found`})
      })
  }

  render () {

    const {book, isLoading, error} = this.state

    let content

    if (error) {
      content = <p>error</p>
    } else if (isLoading) {
      content = <div style={{marginTop: '100px'}} className='spinner'/>
    } else {
      content = <InfoTemplate book={book}/>
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default BookInfo