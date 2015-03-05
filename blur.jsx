var React = require('react');

var stackBlurImage = require('./vendor/StackBlur.js');

var ReactBlur = React.createClass({

    propTypes: {
        img: React.PropTypes.string.isRequired,
        blurRadius: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            blurRadius: 0
        }
    },

    componentDidMount() {
        var Blur = this;
        var {blurRadius} = Blur.props;

        var container = Blur.getDOMNode();

        Blur.height = container.offsetHeight;
        Blur.width = container.offsetWidth;

        console.log(Blur.height, Blur.width);

        Blur.canvas = Blur.refs.canvas.getDOMNode();
        Blur.canvas.height = Blur.height;
        Blur.canvas.width = Blur.width;

        var ctx = Blur.canvas.getContext('2d');
        Blur.img = new Image;
        Blur.img.onload = function(){
            stackBlurImage( Blur.img, Blur.canvas, blurRadius, true, Blur.width, Blur.height)
        };
        Blur.img.src = Blur.props.img;
    },

    componentWillReceiveProps(nextProps) {
        var Blur = this;
        var {blurRadius} = nextProps;

        console.log(blurRadius);

        stackBlurImage( Blur.img, Blur.canvas, blurRadius, true, Blur.width, Blur.height)
    },

    render() {
        var {img, className, children, ...other} = this.props;
        var classes = 'react-blur';

        if(className) {
            classes += ' ' + className;
        }

        return (
            <div
                {...other}
                className={classes} >

                <canvas className='react-blur-canvas' ref='canvas'/>
                {children}
            </div>
        );
    }

});

module.exports = ReactBlur;