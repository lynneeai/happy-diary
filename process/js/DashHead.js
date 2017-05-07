var React = require('react');

var DashHead = class DashHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        var monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"
                         ];

        return(
                <div className="dashHead">
                    <div className="date">
                        <h3> {monthNames[this.state.date.getMonth()]}-{this.state.date.getDate()}, {this.state.date.getFullYear()}</h3>
                    </div>
                    <div className="time"><h3> {this.state.date.toLocaleTimeString()} </h3></div>
                </div>
        );
    }
};

module.exports = DashHead;
