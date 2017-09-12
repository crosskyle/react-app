import React, { Component } from 'react'
import './style/App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'


import PacksIndex from './Packs_index'
import ItemsIndex from './Items_index'
import PacksShow from './Packs_show'

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
            docked={false}
            width={250}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <PacksIndex onPackSelect={this.handleClose}/>
            <ItemsIndex/>
          </Drawer>
          <PacksShow />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
