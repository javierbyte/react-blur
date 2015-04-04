var React = require('react'),
    Blur = require('react-blur');

var App = React.createClass({

    getInitialState() {
        return {
            radius: 0
        }
    },

    componentDidMount() {
        (function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}})(document, 'script', 'twitter-wjs');
    },


    onChangeRadius(event) {
        this.setState({
            radius: parseInt(event.target.value, 10)
        })
    },

    render() {
        return (
            <div>
            <a href="https://twitter.com/share" className="twitter-share-button" data-url="http://javierbyte.github.io/react-blur/" data-via="javierbyte" data-size="large">Tweet</a>

                <iframe src="https://ghbtns.com/github-btn.html?user=javierbyte&repo=react-blur&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>

                <Blur className='blur-demo' img='assets/img.jpg' blurRadius={this.state.radius}>
                    BLUR RADIUS: {this.state.radius}px
                </Blur>

                <input className='blur-input' type='range' value={this.state.radius} onChange={this.onChangeRadius} min={0} max={100} range={1}/>
            </div>
        );
    }

});

React.render(<App/>, document.getElementById('demo'));