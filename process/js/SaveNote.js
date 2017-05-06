var React = require('react');
var bootstrap = require('bootstrap');
var Statistics = require('./Statistics');

var SaveNote = class SaveNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: false
        };

        this.saveNote = this.saveNote.bind(this);
    }

    textAnalytics() {

    }

    saveNote() {
        this.setState({
            saved: true
        })
    }

    render() {
        let container = null;
        if(this.state.saved) {
            container =
                <div id="myModal" className="modal fade" role="dialog">
                    <div id="statisticsDialog" className="modal-dialog">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Saved</h4>
                        </div>
                        <div className="modal-body">
                            <p>hehehe</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
        }

        return (
            <div>
            <div className="saveButton" onClick={this.saveNote}>
                <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Save</button>
            </div>
            {container}
            </div>
        );
    }

}
module.exports = SaveNote;
