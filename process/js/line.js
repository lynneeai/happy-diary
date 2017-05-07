var React = require('react');
var  LineChart = require('recharts').LineChart;
var Line = require('recharts').Line;
var XAxis = require('recharts').XAxis;
var YAxis = require('recharts').YAxis;
var CartesianGrid = require('recharts').CartesianGrid;
var Tooltip = require('recharts').Tooltip;
var Legend = require('recharts').Legend;


var SimpleLineChart = class SimpleLineChart extends React.Component {
    constructor(props) {
        super(props);
    }

	render () {
    	return (
        	<LineChart width={this.props.width} height={300} data={this.props.data}
                margin={{top: 5, right: 30, left: 0, bottom: 0}}>
           <XAxis dataKey="date"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Line type="monotone" dataKey="happiness" stroke="#8884d8" activeDot={{r: 8}}/>
          </LineChart>
    );
    }
}


module.exports = SimpleLineChart;
