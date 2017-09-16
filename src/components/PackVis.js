import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getPackVisData } from '../actions'
import '../../node_modules/react-vis/dist/style.css';
import FlatButton from 'material-ui/FlatButton'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalBarSeries,
  VerticalBarSeries,
  makeWidthFlexible,
  Hint
} from 'react-vis'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

class PackVis extends Component {
  constructor(props) {
    super(props)

    this.state = {
      flag: false,
      value: null,
      vertical: false
    }

    this.renderHorizontalChart = this.renderHorizontalChart.bind(this)
    this.renderVerticalChart = this.renderVerticalChart.bind(this)
  }


  renderHorizontalChart(seriesInstance) {
    let verticalData = []

    seriesInstance.forEach((plot) => {
      let obj = {}
      obj.x = plot['y']
      obj.y = plot['x']
      obj.weight = plot['x']
      obj.title = plot['title']
      verticalData.push(obj)
    })

    return(
      <HorizontalBarSeries
        key={Math.random()}
        data={seriesInstance}
        onValueMouseOver={v => this.setState({value: v})}
        onValueMouseOut={v => this.setState({value: null})}
      />
    )
  }

  renderVerticalChart(seriesInstance) {
    let verticalData = []

    seriesInstance.forEach((plot) => {
      let obj = {}
      obj.x = plot['y']
      obj.y = plot['x']
      obj.weight = plot['x']
      obj.title = plot['title']
      verticalData.push(obj)
    })

    return(
      <VerticalBarSeries
        key={Math.random()}
        data={verticalData}
        onValueMouseOver={v => this.setState({value: v})}
        onValueMouseOut={v => this.setState({value: null})}
      />
    )
  }

  componentWillUpdate(nextProps) {

    if (nextProps.pack && this.state.flag === false) {
      this.setState({flag: true})
      this.props.getPackVisData(nextProps.pack)
    }
    else if (this.props.pack && this.props.pack.id !== nextProps.pack.id) {
      this.props.getPackVisData(nextProps.pack)
    }
  }


  render() {
    const { pack, packVisData } = this.props
    const {value} = this.state

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

    if (!this.state.vertical) {
      return (
        <div>
          <FlexibleXYPlot
            stackBy="x"
            margin={{left: 125, right: 100}}
            yType={'ordinal'}
            height={300}
          >
            <XAxis />
            <YAxis style={{text: {marginLeft: 20}}}/>
            {packVisData.map(this.renderHorizontalChart)}
            {value ?
              <Hint value={value}>
                <div style={{color: 'black'}}>
                  <div style={{
                    borderBottom: '1px solid #717171',
                    fontWeight: 'bold',
                    marginBottom: 5,
                    paddingBottom: 5,
                    textTransform: 'uppercase'
                  }}>{value.title}
                  </div>
                  <div style={{position: 'relative', height: '15px', width: '100%'}}>
                    <div style={{position: 'absolute'}}>{value.weight} oz.</div>
                  </div>
                </div>
              </ Hint>
              : null}
          </FlexibleXYPlot>
          <FlatButton
            onClick={() => { this.setState({vertical: !(this.state.vertical)})}}
            label="orientation"
            primary={true}
            style={{marginTop: 12, marginLeft: 12}}
          />
        </div>
      )
    }

    return (
      <div>
        <FlexibleXYPlot
          stackBy="y"
          margin={{left: 125, right: 100}}
          xType={'ordinal'}
          height={300}
        >
          <XAxis />
          <YAxis style={{text: {marginLeft: 20}}}/>
          {packVisData.map(this.renderVerticalChart)}
          {value ?
            <Hint value={value}>
              <div style={{color: 'black'}}>
                <div style={{
                  borderBottom: '1px solid #717171',
                  fontWeight: 'bold',
                  marginBottom: 5,
                  paddingBottom: 5,
                  textTransform: 'uppercase'
                }}>{value.title}
                </div>
                <div style={{position: 'relative', height: '15px', width: '100%'}}>
                  <div style={{position: 'absolute'}}>{value.weight} oz.</div>
                </div>
              </div>
            </ Hint>
            : null}
        </FlexibleXYPlot>
        <FlatButton
          onClick={() => { this.setState({vertical: !(this.state.vertical)})}}
          label="orientation"
          primary={true}
          style={{marginTop: 12, marginLeft: 12}}
        />
      </div>
    )
  }
}

function mapStateToProps({ packs, selectedPack, packVisData }) {
  return { pack: packs[selectedPack], packVisData: packVisData }
}


export default connect(mapStateToProps, { getPackVisData })(PackVis)