import { Avatar, Divider } from 'material-ui'
import Chip from 'material-ui/Chip'
import Paper from 'material-ui/Paper'
import LibraryBooks from 'material-ui/svg-icons/av/library-books'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import '../../css/hover-min.css'
import './Item.css'

const style = {
  paperStyle: {
    width: 1000,
    margin: '40px 100px',
    color: '#1d1202',
    display: 'block',
    background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(240,247,252,1))',
    padding: '5px 20px 10px 20px'
  },
  chip: {
    backgroundColor: '#e5e8f5',
    margin: 10,
    avatar: {
      backgroundColor: '#e5e8f5',
    },
    labelStyle: {
      fontFamily: '\'Gloria Hallelujah\', cursive',
      color: '#1d1202',
      fontWeight: 'bold'
    }
  },
  titleStyle: {
    textAlign: 'center',
    fontFamily: '\'Gloria Hallelujah\', cursive',
    margin: -15
  },
  description: {
    fontFamily: '\'Gamja Flower\', cursive',
    fontSize: '16px',
    display: 'inline-flex',
    marginBottom: '20px',
    image: {
      margin: '0px 20px 0px 0px',
    }
  },
  chipInfo: {
    details: {
      margin: 4,
      fontFamily: '\'Gamja Flower\', cursive',
      backgroundColor: '#f5e8dc',
      fontSize: '15px',
      labelStyle: {
        color: '#1d1202'
      }
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    }
  },
  selector: {
    textAlign: 'center',
    fontFamily: '\'Gamja Flower\', cursive',
    color: '#1d1202',
    margin: '15px 0px 5px 0px',
    cursor: 'pointer',
    a: {
      margin: '0px 60px 0px',
      fontSize: '20px'
    }
  },
  divider: {
    backgroundColor: '#1d1508'
  }
}

const shelfMap = new Map()

shelfMap.set('currentlyReading', 'Currently Reading')
shelfMap.set('wantToRead', 'Want to Read')
shelfMap.set('read', 'Read')
shelfMap.set('none', 'None')

class Item extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render () {

    const {book, updateBook} = this.props

    const bookImage = (book) => {
      return (book.imageLinks && book.imageLinks.thumbnail) ?
        <img src={`${book.imageLinks.thumbnail}`} alt="Book Cover"/> :
        null
    }

    const bookDescription = (book) => {
      return book.description ? book.description : 'No description available'
    }

    const publishedDate = (book) => {
      const regex = /[1,2]\d{3}/i
      return book.publishedDate.match(regex)
    }

    return (
      <Paper style={style.paperStyle} zDepth={5}>
        <Chip style={style.chip} labelStyle={style.chip.labelStyle}>
          <Avatar style={style.chip.avatar} color="#1d1202" icon={<LibraryBooks/>}/>
          {book.shelf !== '' ? shelfMap.get(book.shelf) : 'No bookshelf'}
        </Chip>
        <div style={style.titleStyle}>
          <h2>{book.title}</h2>
          <h3>{book.subtitle}</h3>
        </div>
        <div style={style.description}>
          <div style={style.description.image}>
            {bookImage(book)}
          </div>
          <div>
            <div style={style.chipInfo.wrapper}>
              {book.categories && book.categories.length > 0 &&
              <Chip style={style.chipInfo.details} labelStyle={style.chipInfo.details.labelStyle}>
                <b>Categories: </b> {book.categories.join(', ')}
              </Chip>
              }
              {book.authors && book.authors.length > 0 &&
              <Chip style={style.chipInfo.details} labelStyle={style.chipInfo.details.labelStyle}>
                <b>Authors: </b> {book.authors.join(', ')}
              </Chip>
              }
              <Chip style={style.chipInfo.details} labelStyle={style.chipInfo.details.labelStyle}>
                <b>Publish Date: </b> {publishedDate(book)}
              </Chip>
              {book.pageCount &&
              <Chip style={style.chipInfo.details} labelStyle={style.chipInfo.details.labelStyle}>
                <b>Page count: </b> {book.pageCount}
              </Chip>
              }
              {book.publisher &&
              <Chip style={style.chipInfo.details} labelStyle={style.chipInfo.details.labelStyle}>
                <b>Publisher: </b> {book.publisher}
              </Chip>
              }
            </div>
            {bookDescription(book)}
          </div>
        </div>
        <Divider style={style.divider}/>
        <div style={style.selector}>
          {Array.from(shelfMap).map(shelf => (
            <a
              className='hvr-bob'
              key={shelf[0]}
              style={style.selector.a}
              onClick={() => updateBook(book, `${shelf[0]}`)}
            >
              {shelf[1]}
            </a>
          ))}
        </div>
      </Paper>
    )
  }
}

export default Item