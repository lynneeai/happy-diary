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
        let data = {
           points: [
             [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 },
               { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
             [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 },
               { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
             [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 },
               { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
           ],
           xValues: [0,1,2,3,4,5,6],
           yMin: 0,
           yMax: 30
        };


        return(
            <div className="dash">
                <div className="dashHead">
                    <div className="date">
                        <h3> {monthNames[this.state.date.getMonth()]}-{this.state.date.getDate()}, {this.state.date.getFullYear()}</h3>
                    </div>
                    <div className="time"><h3> {this.state.date.toLocaleTimeString()} </h3></div>
                </div>
                <div className="plot"><LineChart data={data} /></div>
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
