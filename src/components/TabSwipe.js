import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import PollIcon from 'material-ui/svg-icons/social/poll'
import LibraryIcon from 'material-ui/svg-icons/av/library-books'

import PacksShow from './PacksShow'
import PackVis from './PackVis'

class TabSwipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab icon={<LibraryIcon style={{color: 'white'}}/>} value={0} />
          <Tab icon={<PollIcon style={{color: 'white'}}/>} value={1} />
        </Tabs>
        <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
          <div>
            <PacksShow />
          </div>
          <div>
            <PackVis/>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default TabSwipe
