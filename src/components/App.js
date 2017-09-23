import React, { Component } from 'react'
import './style/App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import NavMenu from 'material-ui/svg-icons/navigation/menu'
import PacksIndex from './PacksIndex'
import ItemsIndex from './ItemsIndex'
import TabSwipe from './TabSwipe'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

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
            iconElementLeft={<NavMenu style={{color: 'white', width: 28,
              height: 28,
              padding: 12}}/>}
            iconElementRight={<ExpandMore style={{color: 'white', width: 28,
              height: 28,
              padding: 12}}/>}
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

export default DragDropContext(HTML5Backend)(App)
