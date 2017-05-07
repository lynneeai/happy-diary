var React = require('react');
var AptList = require('./AptList');
var LineChart = require('./line');

var DashBoard = class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            filteredNote: null
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
        var myNotes = this.props.notes;
        var monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"
                         ];

        return(
            <div className="dash">
                <div className="dashHead">
                    <div className="date">
                        <h3> {monthNames[this.state.date.getMonth()]}-{this.state.date.getDate()}, {this.state.date.getFullYear()}</h3>
                    </div>
                    <div className="time"><h3> {this.state.date.toLocaleTimeString()} </h3></div>
                </div>
                <div className="plot"><LineChart /></div>
                <div className="footprint">
                    <div className="row">
                        <div className="notes col-sm-12">
                            <h3 className="notes-headline">Footprints</h3>
                            <ul className="item-list media-list">
                                {myNotes.map((item, index) =>
                                    <AptList key={index} singleItem={item}
                                     whichItem={item} onDelete={this.deleteMessage} />
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

module.exports = DashBoard;
