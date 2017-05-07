var React = require('react');
var AptList = require('./AptList');
var SimpleLineChart = require('./line');
var DashHead = require('./DashHead');

var DashBoard = class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            filteredNote: this.props.notes
        };
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
