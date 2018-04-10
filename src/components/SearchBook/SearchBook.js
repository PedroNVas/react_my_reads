import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const style = {
  paperStyle: {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    backgroundColor: '#c3d8f5'
  }
}

class SearchBook extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render () {

    const {data} = this.props

    console.log(data)

    return (
      <Paper style={style.paperStyle} zDepth={5}>
        <h2>{data.title}</h2>
        <div>
          <img src={`${data.imageLinks.thumbnail}`}/>

        </div>
      </Paper>
    )
  }
}

export default SearchBook