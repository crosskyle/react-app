import React, { Component } from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import PacksIndex from './packs_index'
import PacksShow from './packs_show'

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
            title="Sick App Bro!"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <Drawer
            docked={true}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <PacksIndex onPackSelect={this.handleClose}/>
          </Drawer>
          <PacksShow />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
