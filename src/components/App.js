import React, { Component } from 'react'
import './style/App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import FontIcon from 'material-ui/FontIcon'

import PacksIndex from './PacksIndex'
import ItemsIndex from './ItemsIndex'
import TabSwipe from './TabSwipe'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {open: false}
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="BackPack"
            style={{textAlign: 'center'}}
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={<ExpandMore style={{color: 'white'}}/>}
          />
          <TabSwipe />
          <Drawer
            docked={false}
            width={250}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <PacksIndex onPackSelect={this.handleClose}/>
            <ItemsIndex/>
          </Drawer>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
