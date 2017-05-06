var React = require('react');
var ReactDOM = require('react-dom');
var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
var _ = require('lodash');
var AptList = require('./AptList');

var fs = eRequire('fs');
var loadApts = JSON.parse(fs.readFileSync(dataLocation));

class MainInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Meng",
            date: new Date(),
            notes: loadApts
        };
        this.deleteMessage = this.deleteMessage.bind(this);
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

    componentDidUpdate() {
        fs.writeFile(dataLocation, JSON.stringify(this.state.notes), 'utf8',
        function(err) {
            if(err) {
                console.log(err);
            }
        });
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    deleteMessage(item) {
        var myNotes = this.state.notes;
        var newNotes = _.without(myNotes, item);
        this.setState({
            notes: newNotes
        })
    }

    render() {
        var myNotes = this.state.notes;

        return (
            <div>
            <h2> Happy Diary, {this.state.name} </h2>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>

            <div className="container">
                <div className="row">
                    <div className="appointments col-sm-12">
                        <h2 className="appointments-headline">Current Notes</h2>
                        <ul className="item-list media-list">
                            {myNotes.map((item, index) =>
                                <AptList key={index} singleItem={item}
                                         whichItem={item} onDelete={this.deleteMessage} />
                            )}
                        </ul>
                    </div>{/* col-sm-12 */}
                </div>{/* row */}
            </div>{/* container */}
            </div>
        );
    }
} // MainInterface

ReactDOM.render(
    <MainInterface />,
    document.getElementById('notes')
); //render
