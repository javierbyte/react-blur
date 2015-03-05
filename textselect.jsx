var React = require('react');

var TextSelect = React.createClass({

    propTypes: {
        options: React.PropTypes.array.isRequired,
        active: React.PropTypes.number.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    handleChange(event) {
        this.props.onChange(event, this.props.options.indexOf(event.target.value), event.target.value)
    },

    render() {
        return (
            <span className='react-textselect'>
                {this.props.options[this.props.active]}

                <select className='react-textselect-input' onChange={this.handleChange}>
                    {this.props.options.map(function(value, index) {
                        return (
                            <option key={index}>{value}</option>
                        )
                    })}
                </select>
            </span>
        );
    }

});

module.exports = TextSelect;