var React = require('react');
var ReactDOM = require('react-dom');
var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
var _ = require('lodash');
var firebase = require('firebase');

var Toolbar = require('./Toolbar');
var DashBoard = require('./DashBoard');
var SaveNote = require('./SaveNote');
var LineChart = require('./line');

var electron = eRequire('electron');
var ipc = electron.ipcRenderer;

var fs = eRequire('fs');
var loadApts = JSON.parse(fs.readFileSync(dataLocation));

class MainInterface extends React.Component {
    initFireBase() {
      var config = {
          apiKey: "AIzaSyC-SFpGbrwLH5qDCB0-p9fLEkge-JqiJbk",
          authDomain: "diary-1984a.firebaseapp.com",
          databaseURL: "https://diary-1984a.firebaseio.com",
          projectId: "diary-1984a",
          storageBucket: "diary-1984a.appspot.com",
          messagingSenderId: "576158485349"
      };
      firebase.initializeApp(config);
    }

    constructor(props) {
        super(props);
        this.initFireBase();
        this.state = {
            notes: [],
            dashBoard: true,
            inputNote: 'Hello World',
            inputTitle: 'Title',
            width: window.innerWidth,
            height: window.innerHeight,
        };

        this.addNewNote = this.addNewNote.bind(this);
        this.showDashBoard = this.showDashBoard.bind(this);
        this.updateInputNote = this.updateInputNote.bind(this);
        this.updateInputTitle = this.updateInputTitle.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillMount() {
        var fb = firebase.database().ref('notes');

        fb.on("value", function(dataSnapshot) {
            console.log(dataSnapshot.val());
            this.setState({
                notes: Object.keys(dataSnapshot.val()).map(function (key) { return dataSnapshot.val()[key]; })
            });
        }.bind(this));

        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentDidUpdate() {
        fs.writeFile(dataLocation, JSON.stringify(this.state.notes), 'utf8',
        function(err) {
            if(err) {
                console.log(err);
            }
        });
    }

    updateWindowDimensions() {
        this.setState({
            width: $(window).width(),
            height: $(window).height()
        });
    }

    addNewNote() {
        this.setState({
            dashBoard: false
        })
    } //toggleAptDisplay

    showDashBoard() {
        this.setState({
            dashBoard: true
        })
    } //DashBoard

    updateInputNote(event) {
        this.setState({
            inputNote: event.target.value
        });
    }

    updateInputTitle(event) {
        this.setState({
            inputTitle: event.target.value
        });
    }

    render() {
        var myNotes = this.state.notes;
        var currentNote = this.state.inputNote;
        var currentTitle = this.state.inputTitle;

        let container = null;
        if(this.state.dashBoard) {
            container = <DashBoard notes={myNotes} width={this.state.width} />
        }
        else {
            container =
                <div id="editor">
                    <textarea className="input-title" value={currentTitle} onChange={this.updateInputTitle} />
                    <textarea className="input-content" value={currentNote} onChange={this.updateInputNote} />
                    <SaveNote content={this.state.inputNote} title={this.state.inputTitle}/>
                </div>
        }

        return (
            <div className="interface">
                <Toolbar handleCreate={this.addNewNote} handleDash={this.showDashBoard} />
                {container}
                </div>
        );
    }
} // MainInterface

ReactDOM.render(
    <MainInterface />,
    document.getElementById('window')
); //render
