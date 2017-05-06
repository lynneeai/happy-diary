var React = require('react');

var Toolbar = class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Meng",
            date: new Date(),
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

    createNewNote() {
        this.props.handleCreate();
    } //createAppointments

    toggleDash() {
        this.props.handleDash();
    } //toggleAbout

    render() {
        return(
          <div className="toolbar">
            <h4> Happy Diary, {this.state.name} </h4>
            <h4>It is {this.state.date.toLocaleTimeString()}.</h4>
            <div className="toolbar-item" onClick={(e) => this.toggleDash(e)}>
              <span className="toolbar-item-button glyphicon glyphicon-question-sign"></span>
              <span className="toolbar-item-text">Dashboard</span>
            </div>
            <div className="toolbar-item" onClick={(e) => this.createNewNote(e)}>
              <span className="toolbar-item-button glyphicon glyphicon-plus-sign"></span>
              <span className="toolbar-item-text">Add New Note</span>
            </div>
          </div>
        ) //return
    } //render
}; //Toolbar

module.exports = Toolbar;
