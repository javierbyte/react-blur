var React = require('react');

var TextSelect = require('react-textselect');

var App = React.createClass({

    getInitialState() {
        return {
            selectedOption: 0
        }
    },

    onTextSelectChange(event, key, value) {
        this.setState({
            selectedOption: key
        })
    },

    render() {
        return (
            <div>
                This is a <TextSelect
                    options={['text select', 'react component', 'dropdown']}
                    active={this.state.selectedOption}
                    onChange={this.onTextSelectChange}/> inline with text.
            </div>
        );
    }

});

React.render(<App/>, document.getElementById('demo'));