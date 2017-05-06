var React = require('react');

var Statistics = class Statistics extends React.Component {
    constructor(props) {
        super(props);
    }

    temp() {
        console.log("hello");
    }

    render() {
        return (
            <div className="row">
                <h5>Saved</h5>
            </div>
        );
    }

}
module.exports = Statistics;
