var React = require('react');
var ReactDOM = require('react-dom');
var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
var _ = require('lodash');
var firebase = require('firebase');

var Toolbar = require('./Toolbar');
var DashBoard = require('./DashBoard');

var electron = eRequire('electron');
var ipc = electron.ipcRenderer;

var fs = eRequire('fs');
var loadApts = JSON.parse(fs.readFileSync(dataLocation));

class MainInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            dashBoard: true
        };

        this.addNewNote = this.addNewNote.bind(this);
        this.showDashBoard = this.showDashBoard.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    componentWillMount() {
        var config = {
            apiKey: "AIzaSyC-SFpGbrwLH5qDCB0-p9fLEkge-JqiJbk",
            authDomain: "diary-1984a.firebaseapp.com",
            databaseURL: "https://diary-1984a.firebaseio.com",
            projectId: "diary-1984a",
            storageBucket: "diary-1984a.appspot.com",
            messagingSenderId: "576158485349"
        };
        firebase.initializeApp(config);
        var fb = firebase.database().ref('notes');

        fb.once("value").then(function(dataSnapshot) {
            console.log(dataSnapshot.val());
            this.setState({
                notes: dataSnapshot.val()
            });
        }.bind(this));
    }

    componentDidUpdate() {
        fs.writeFile(dataLocation, JSON.stringify(this.state.notes), 'utf8',
        function(err) {
            if(err) {
                console.log(err);
            }
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

    deleteMessage(item) {
        var myNotes = this.state.notes;
        var newNotes = _.without(myNotes, item);
        this.setState({
            notes: newNotes
        })
    }

    render() {
        var myNotes = this.state.notes;

        let container = null;
        if(this.state.dashBoard) {
            container = <DashBoard notes={myNotes} />
        }
        else {
            container = <div id="editor"><textarea defaultValue="Hello World"></textarea>

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
