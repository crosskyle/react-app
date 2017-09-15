import React, { Component } from 'react';
import { connect } from 'react-redux'
import { packVis } from '../actions'
import '../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalBarSeries
} from 'react-vis'

class PackVis extends Component {
  constructor(props) {
    super(props)

    this.state = {
      flag: false
    }
  }


  renderChart(seriesInstance) {
    return(
      <HorizontalBarSeries key={Math.random()}
        data={seriesInstance}
      />
    )
  }

  componentWillUpdate(nextProps) {

    if (nextProps.pack && this.state.flag === false) {
      this.setState({flag: true})
      this.props.packVis(nextProps.pack)
    }
    else if (this.props.pack && this.props.pack.id !== nextProps.pack.id) {
      this.props.packVis(nextProps.pack)
    }
  }


  render() {
    const { pack, packVisData } = this.props

    if (!pack) {
      return (
        <div style={{textAlign: 'center', marginTop: 20}}>
          Select a pack
        </div>
      )
    }

    if (packVisData.length === 0) {
      return (
        <div style={{textAlign: 'center', marginTop: 20}}>
          Pack is empty
        </div>
      )
    }


    return (
      <div>
        <XYPlot stackBy="x" margin={{left: 125, right: 100}}
                yType={'ordinal'}
                width={600}
                height={300}>
          <XAxis />
          <YAxis style={{text: {marginLeft: 20}}}/>
          {packVisData.map(this.renderChart)}
        </XYPlot>
      </div>
    )
  }
}

function mapStateToProps({ packs, selectedPack, packVisData }) {
  return { pack: packs[selectedPack], packVisData: packVisData }
}


export default connect(mapStateToProps, { packVis })(PackVis)