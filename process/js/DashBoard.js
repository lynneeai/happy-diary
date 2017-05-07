var React = require('react');
var AptList = require('./AptList');
var SimpleLineChart = require('./line');
var DashHead = require('./DashHead');
var $ = jQuery = require('jquery');
var DatePicker = require('react-datepicker').default;

var DashBoard = class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            filteredNote: this.props.notes,
            startDate:null,
            endDate: null
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
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

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        var myNotes = this.props.notes;
        console.log(myNotes);
        console.log(this.state.filteredNote);
        var monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"
                         ];
        let data = myNotes;

        return(
            <div className="dash">
                <DashHead className="dashHead" />
                <div className="plot"><SimpleLineChart data={data} width={this.props.width*0.58}/></div>
                <div className="row date-pickers">
                    <div className="col-sm-5">
                        <label>Start Date</label>
                        <DatePicker
                          selected={this.state.startDate}
                          selectsStart
                          startDate={this.state.startDate}
                          endDate={this.state.endDate}
                          onChange={this.handleChangeStart}
                        />
                    </div>

                    <div className="col-sm-5 col-offset-1">
                    <label id="DatePickerLabel">End Date</label>
                    <DatePicker id="CustomizeDayPicker"
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd}
                    />
                    </div>
                </div>
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
