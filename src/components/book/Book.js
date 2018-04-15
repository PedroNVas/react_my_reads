import { Card, CardMedia } from 'material-ui/Card'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../css/hover-min.css'

import { bookImage } from '../../utils/utils'
import './Book.css'

const style = {
  paperStyle: {
    margin: '25px 40px 25px',
    textAlign: 'center',
    display: 'inline-block',
  },
  cardStyle: {
    display: 'flex'
  },
  button: {
    margin: '5px 10px 5px',
    padding: '10px 15px',
    fontSize: '16px',
    lineHeight: '16px',
    borderRadius: '20px',
    fontFamily: '\'Gloria Hallelujah\', cursive',
  },
  link: {
    color: '#1d1508',
    textDecoration: 'none'
  },
}

const iconButtons = [
  {
    shelfName: 'Currently Reading',
    shelfId: 'currentlyReading'
  },
  {
    shelfName: 'Want to Read',
    shelfId: 'wantToRead'
  },
  {
    shelfName: 'Read',
    shelfId: 'read'
  }
]

class Book extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  state = {
    isLoading: false
  }

  componentWillReceiveProps () {
    this.setState({isLoading: false})
  }

  render () {
    const {data, updateBook} = this.props

    const {isLoading} = this.state

    return (
      <div className="tooltip">

        {!isLoading &&
        <div className="tooltipchild">
          {iconButtons.map(iconButton => (
            <button
              key={iconButton.shelfId}
              className='tooltip-button hvr-hang'
              style={{
                ...style.button,
                display: data.shelf === `${iconButton.shelfId}` ? 'none' : 'inline-block'
              }}
              onClick={() => {
                this.setState({isLoading: true})
                updateBook(data, `${iconButton.shelfId}`)
              }}
            >
              {iconButton.shelfName}
            </button>
          ))}
          <Link to={`/book/${data.id}`} style={style.link}>
            <p className='hvr-pulse-grow'>Additional info...</p>
          </Link>
        </div>
        }

        <div style={{...style.paperStyle, opacity: isLoading ? 0.5 : 1}}>
          <Card style={style.cardStyle}>
            <CardMedia>
              {bookImage(data)}
            </CardMedia>
          </Card>
        </div>
      </div>
    )
  }

}

export default Book