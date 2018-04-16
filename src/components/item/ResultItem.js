import { Divider } from 'material-ui'
import CircularProgress from 'material-ui/CircularProgress'
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
  progress: {
    left: '50%'
  }
}

class ResultItem extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  state = {
    isLoading: false
  }

  componentWillReceiveProps () {
    this.setState({isLoading: false})
  }

  render () {

    const {book, updateBook} = this.props

    const {isLoading} = this.state

    const bottom = (
      <div>
        <Divider style={style.divider}/>
        <div style={style.selector}>
          {Array.from(shelfMap).map(shelf => (
            <a
              className='hvr-bob'
              key={shelf[0]}
              style={style.selector.a}
              onClick={() => {
                this.setState({isLoading: true})
                updateBook(book, `${shelf[0]}`)
              }}
            >
              {shelf[1]}
            </a>
          ))}
        </div>
      </div>
    )

    let content

    if (isLoading) {
      content = (
        <div style={{opacity: 0.5}}>
          <InfoTemplate book={book}
                        child={
                          <CircularProgress style={style.progress}
                                            color="#dd8200"
                                            size={60}
                                            thickness={5}/>
                        }
          />
        </div>
      )
    } else {
      content = <InfoTemplate book={book} child={bottom}/>
    }

    return content

  }
}

export default ResultItem