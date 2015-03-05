var React = require('react');

var Blur = require('react-blur');

var App = React.createClass({

    getInitialState() {
        return {
            radius: 0
        }
    },

    onChangeRadius(event) {
        this.setState({
            radius: parseInt(event.target.value, 10)
        })
    },

    render() {
        return (
            <div>
                <Blur className='blur-demo' img='../assets/img.jpg' blurRadius={this.state.radius}>
                    Blur radius: {this.state.radius}
                </Blur>

                <input className='blur-input' type='range' value={this.state.radius} onChange={this.onChangeRadius} min={0} max={100} range={1}/>
            </div>
        );
    }

});

React.render(<App/>, document.getElementById('demo'));