var React = require('react'),
    stackBlurImage = require('./vendor/StackBlur.js');

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
        var Blur = this,
            {blurRadius} = Blur.props;

        var container = Blur.getDOMNode();

        Blur.height = container.offsetHeight;
        Blur.width = container.offsetWidth;

        Blur.canvas = Blur.refs.canvas.getDOMNode();
        Blur.canvas.height = Blur.height;
        Blur.canvas.width = Blur.width;

        var ctx = Blur.canvas.getContext('2d');
        Blur.img = new Image;
        Blur.img.onload = function(){
            stackBlurImage( Blur.img, Blur.canvas, blurRadius, Blur.width, Blur.height)
        };
        Blur.img.src = Blur.props.img;
    },

    componentWillReceiveProps(nextProps) {
        stackBlurImage(this.img, this.canvas, nextProps.blurRadius, this.width, this.height);
    },

    render() {
        var {img, className, children, ...other} = this.props,
            classes = 'react-blur';

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