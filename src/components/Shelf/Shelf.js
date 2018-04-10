import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Book from '../Book/Book'

class Shelf extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render () {

    const {title, books, updateBook} = this.props

    return (
      <div>
        {/* Title Component*/}
        <div>
          <h3>{title}</h3>
        </div>
        {books.map(book => (
          <Book key={book.id} data={book} updateBook={updateBook}/>
        ))}
      </div>
    )
  }

}

export default Shelf