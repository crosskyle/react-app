import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

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
          <Tab label="Pack" value={0} />
          <Tab label="Data" value={1} />
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
