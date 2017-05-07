var React = require('react');
var firebase = require('firebase');

var AptList = class AptList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        console.log(this.props.singleItem.objKey);
        var fb = firebase.database().ref('notes');
        fb.child(this.props.singleItem.objKey).remove();
    }

    render() {
        return(
            <li className="note-item media">
                <div className="media-left">
                    <button className="pet-delete btn btn-xs btn-danger" onClick={(e) => this.handleDelete(e)}>
                    <span className="glyphicon glyphicon-remove"></span></button>
                </div>
                <div className="note-info media-body">
                   <div className="note-head">
                     <span className="note-date">{this.props.singleItem.date}</span>
                     <div className="owner-name pull-right"><span className="label-item">Happiness:</span>
                     {this.props.singleItem.happiness}</div>
                   </div>
                   <span className="note-keyword">{this.props.singleItem.keyword}</span>
                   <div className="note">{this.props.singleItem.note}</div>
                 </div>
            </li>
        );
    }
};

module.exports = AptList;
