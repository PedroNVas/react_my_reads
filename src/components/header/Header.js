import AppBar from 'material-ui/AppBar'
import HomeIcon from 'material-ui/svg-icons/action/book'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { Tab, Tabs } from 'material-ui/Tabs'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import '../../css/Fonts.css'

const style = {
  link: {
    color: '#FFFFFF',
    textDecoration: 'none'
  },
  appBar: {
    title: {
      textAlign: 'center',
      fontFamily: '\'Gloria Hallelujah\', cursive',
      fontSize: 'xx-large'
    },
    body: {
      backgroundColor: '#eef5f0'
    }
  },
  tabs: {
    containerStyle: {
      backgroundColor: '#ffffff',
      margin: 'auto'
    },
    inkBarStyle: {
      backgroundColor: '#1d1508'
    },
    tab: {
      fontFamily: '\'Gloria Hallelujah\', cursive'
    }
  }
}

class Header extends PureComponent {

  render () {

    return (
      <div>
        <Link to="/" style={style.link}>
          <AppBar title="My Reads" showMenuIconButton={false}
                  style={style.appBar.body}
                  titleStyle={style.appBar.title}
          />
        </Link>
        <Tabs tabItemContainerStyle={style.tabs.containerStyle}
              inkBarStyle={style.tabs.inkBarStyle}>
          <Tab
            icon={<HomeIcon/>}
            label="My Library"
            containerElement={<Link to="/"/>}
            style={style.tabs.tab}/>
          <Tab
            icon={<SearchIcon/>}
            label="Search"
            containerElement={<Link to="/search"/>}
            style={style.tabs.tab}/>
        </Tabs>
      </div>
    )
  }
}

export default Header
