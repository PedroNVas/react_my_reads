import { CardTitle, Paper } from 'material-ui'
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _ from 'underscore'

// collect = (connect, monitor) => {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   }
// }

const style = {
  paperStyle: {
    margin: '25px 75px 25px',
    textAlign: 'center',
    display: 'inline-block',
  },
  cardStyle: {
    display: 'flex'
  }
}

class Book extends Component {

  state = {
    expanded: false
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  mouseEnter = _.debounce(() => {
    this.setState({expanded: true})
  }, 100)

  mouseLeave = _.debounce(() => {
    this.setState({expanded: false})
  }, 100)

  render () {
    const {data, updateBook, isDragging, connectDragSource} = this.props

    const bookTitle = (
      <CardTitle
        title={data.title}
        subtitle={data.subtitle}
        style={{display: this.state.expanded ? 'inline' : 'none'}}
        titleStyle={{fontSize: 'medium'}}/>
    )

    return (
      <Paper style={style.paperStyle}>
        <Card style={style.cardStyle}
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}>
          <CardMedia overlay={bookTitle}>
            <img src={`${data.imageLinks.thumbnail}`}/>
          </CardMedia>
          <CardText expandable={!this.state.expanded}>
            {/*{data.description}*/}
          </CardText>

          <CardActions expandable={!this.state.expanded}>
            <div>
              <IconButton
                touch={true}
                tooltipPosition="bottom-right"
                tooltip="Currently Reading"
                disabled={data.shelf === 'currentlyReading'}
                onClick={() => (
                  updateBook(data, 'currentlyReading')
                )}>
                <ContentAdd/>
              </IconButton>
              <IconButton
                touch={true}
                tooltipPosition="bottom-center"
                tooltip="Want to Read"
                disabled={data.shelf === 'wantToRead'}
                onClick={() => (
                  updateBook(data, 'wantToRead')
                )}>
                <ContentAdd/>
              </IconButton>
              <IconButton
                touch={true}
                tooltipPosition="bottom-left"
                tooltip="Read"
                disabled={data.shelf === 'read'}
                onClick={() => (
                  updateBook(data, 'read')
                )}>
                <ContentAdd/>
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </Paper>
    )
  }

}

// export default DragSource()

export default Book