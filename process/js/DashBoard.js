var React = require('react');
var AptList = require('./AptList');

var DashBoard = class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var myNotes = this.props.notes;

        return(
            <div className="row">
                <div className="notes col-sm-12">
                    <h2 className="notes-headline">Footprints</h2>
                    <ul className="item-list media-list">
                        {myNotes.map((item, index) =>
                                <AptList key={index} singleItem={item}
                                whichItem={item} onDelete={this.deleteMessage} />
                        )}
                    </ul>
                </div>
            </div>
        );
    }
};

module.exports = DashBoard;
