import Badge from 'material-ui/Badge'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import '../../css/Fonts.css'
import Book from '../book/Book'

const style = {
  title: {
    marginBottom: '20px'
  },
  h3Style: {
    fontFamily: '\'Gloria Hallelujah\', cursive',
    fontSize: 'x-large',
    marginLeft: '10px',
  },
  books: {
    marginLeft: '45px',
  },
  badge: {
    fontSize: 'large',
    top: 40,
    backgroundColor: '#f0f7fc',
    fontFamily: '\'Gloria Hallelujah\', cursive'
  }
}

class Shelf extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render () {

    const {title, books, updateBook} = this.props

    books.sort((thisObj, thatObj) => {
      if (thisObj.title > thatObj.title) {
        return 1
      }

      if (thisObj.title < thatObj.title) {
        return -1
      }

      return 0
    })

    return (
      <div>
        <div style={style.title}>
          <Badge
            primary={true}
            badgeContent={books.length}
            badgeStyle={style.badge}
          >
            <h3 style={style.h3Style}>{title}</h3>
          </Badge>
        </div>
        <div style={style.books}>
          {books.map(book => (
            <Book
              key={book.id}
              data={book}
              updateBook={updateBook}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Shelf