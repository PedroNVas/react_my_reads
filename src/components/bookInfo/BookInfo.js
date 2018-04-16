import { IconButton } from 'material-ui'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksApi from '../../BooksAPI'

import InfoTemplate from '../infoTemplate/InfoTemplate'

const style = {
  error: {
    textAlign: 'center',
    fontFamily: '\'Gamja Flower\', cursive',
    color: '#1d1202',
    position: 'relative',
    top: '20%'
  }
}

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
        this.setState({book: {}, isLoading: false, error: true})
      })
  }

  render () {

    const {book, isLoading, error} = this.state

    let content

    if (error) {
      content = (
        <div style={style.error}>
          <h1>So terribly sorry. </h1>
          <h2>Book not found! <i className="em-svg em-cry"/></h2>
          <Link to="/">
            <IconButton className='hvr-backward' tooltip="Go back home">
              <ArrowBack color="#1d1202"/>
            </IconButton>
          </Link>
        </div>
      )
    } else if (isLoading) {
      content = <div style={{marginTop: '100px'}} className='spinner'/>
    } else {
      content = <InfoTemplate book={book}/>
    }

    return content

  }
}

export default BookInfo