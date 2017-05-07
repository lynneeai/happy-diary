var React = require('react');

class Line extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { path, stroke, fill, strokeWidth } = this.props;
        return (
          <path
            d={path}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            />
        );
    }

};

Line.defaultProps = {
    stroke:       'blue',
    fill:         'none',
    strokeWidth:  3
};

class DataSeries extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { data, colors, xScale, yScale, interpolationType } = this.props;

        let line = d3.line()
          .x((d) => { return xScale(d.x); })
          .y((d) => { return yScale(d.y); });

        let lines = data.points.map((series, id) => {
          return (
            <Line
              path={line(series)}
              seriesName={series.name}
              stroke={colors(id)}
              key={id}
              />
          );
        });

        return (
          <g>
            <g>{lines}</g>
          </g>
        );
    }

};

DataSeries.defaultProps = {
    data:               {},
    interpolationType:  'cardinal',
    colors:             d3.scaleOrdinal(d3.schemeCategory10),
    xScale:             React.PropTypes.func,
    yScale:             React.PropTypes.func
};

class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    let { width, height, data} = this.props;

    let xScale = d3.scalePoint()
      .domain(data.xValues)
      .range([0, width]);

    let yScale = d3.scaleLinear()
      .range([height, 10])
      .domain([data.yMin, data.yMax]);

    return (
      <svg width={width} height={height}>
        <DataSeries
          xScale={xScale}
          yScale={yScale}
          data={data}
          width={width}
          height={height}
          />
      </svg>
    );
  }

};

LineChart.defaultProps = {
    width :  900,
    height : 300
};

module.exports = LineChart;
