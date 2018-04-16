import { Divider } from 'material-ui'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import '../../css/hover-min.css'

import InfoTemplate, { shelfMap } from '../infoTemplate/InfoTemplate'
import './ResultItem.css'

const style = {
  selector: {
    textAlign: 'center',
    fontFamily: '\'Gamja Flower\', cursive',
    color: '#1d1202',
    margin: '15px 0px 5px 0px',
    a: {
      margin: '0px 60px 0px',
      fontSize: '23px',
      cursor: 'pointer'
    }
  },
  divider: {
    backgroundColor: '#1d1508'
  },
  p: {
    display: 'inline',
    fontSize: '23px',
    position: "relative",
    left: -170
  }
}

class ResultItem extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render () {

    const {book, updateBook} = this.props

    const bottom = (
      <div>
        <Divider style={style.divider}/>
        <div style={style.selector}>
          <p style={style.p}>Move to...</p>
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
      </div>
    )

    return <InfoTemplate book={book} child={bottom}/>

  }
}

export default ResultItem