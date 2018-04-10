import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui/svg-icons/action/book'
import SearchIcon from 'material-ui/svg-icons/action/search'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { Tab, Tabs } from 'material-ui/Tabs'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import './Header.css'

class Header extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired
  }

  checkSearchPage = (location) => {
    return location.pathname === '/search'
  }

  render () {

    const {location} = this.props

    const returnIcon = this.checkSearchPage(location) ?
      <IconButton>
        <ArrowBack/>
      </IconButton>
      : null

    // TODO - CHANGE CSS
    return (
      <div>
        <Link to="/">
          <AppBar title="My Reads" showMenuIconButton={this.checkSearchPage(location)}
                  style={{backgroundColor: '#E8F5E9'}}
                  titleStyle={{textAlign: 'center', font: 'app-title'}}
                  iconElementLeft={returnIcon}/>
        </Link>
        <Tabs tabItemContainerStyle={{
          backgroundColor: '#E8F5E9',
          margin: 'auto'
        }}
              inkBarStyle={{backgroundColor: '#1d1508'}}>
          <Tab
            icon={<HomeIcon/>}
            label="My Library"
            containerElement={<Link to="/"/>}
          />
          <Tab
            icon={<SearchIcon/>}
            label="Search"
            containerElement={<Link to="/search"/>}
          />
        </Tabs>
      </div>
    )
  }
}

export default withRouter(Header)
