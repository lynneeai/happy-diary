var React = require('react');
var bootstrap = require('bootstrap');
var $ = jQuery = require('jquery');
var Statistics = require('./Statistics');

var SaveNote = class SaveNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0.5
        };

        this.textAnalytics = this.textAnalytics.bind(this);
    }

    textAnalytics() {
        var params = {
            // Request parameters
        };

        var content = this.props.content;

        var requestText = {
            "documents": [
                {
                    "language": "en",
                    "id": "01",
                    "text": content
                }
            ]
        };
        var requestObj = JSON.stringify(requestText);
        console.log(requestText);

        var textScore = 0;

        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","f98e8c46836a4904b3d878d77667bb72");
            },
            type: "POST",
            // Request body

            data: requestObj,
        })
        .done(function(data) {
            console.log(data);
            var curScore = data['documents'][0]['score'];
            console.log(curScore);
            textScore = curScore;
            this.setState({
                score: textScore
            });
            $('#myModal').modal('show');
        }.bind(this))
        .fail(function() {
            alert("error");
        });


        console.log(this.state.score);
        console.log(textScore);
        console.log("hello");
    }

    render() {
        return (
            <div>
            <div className="saveButton" onClick={this.textAnalytics}>
                <button type="button" className="btn btn-info btn-lg" >Save</button>
            </div>
            <div id="myModal" className="modal fade" role="dialog">
                <div id="statisticsDialog" className="modal-dialog">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Saved</h4>
                    </div>
                    <div className="modal-body">
                        <p>{this.props.content} Your score is: {this.state.score}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }

}
module.exports = SaveNote;
