var React = require('react');

var Toolbar = class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Meng",
            date: new Date(),
        };
    }

    createNewNote() {
        this.props.handleCreate();
    } //createAppointments

    toggleDash() {
        this.props.handleDash();
    } //toggleAbout

    render() {
        return(
          <div className="toolbar">
            <h3 className="toolbar-title"> Happy Diary </h3>
            <div className="toolbar-item toolbar-first-item" onClick={(e) => this.toggleDash(e)}>
              <span className="toolbar-item-button glyphicon glyphicon-question-sign"></span>
              <span className="toolbar-item-text">Dashboard</span>
            </div>
            <div className="toolbar-item" onClick={(e) => this.createNewNote(e)}>
              <span className="toolbar-item-button glyphicon glyphicon-plus-sign"></span>
              <span className="toolbar-item-text">New Diary</span>
            </div>
          </div>
        ) //return
    } //render
}; //Toolbar

module.exports = Toolbar;
