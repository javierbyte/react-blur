var React = require('react/addons'),
    stackBlurImage = require('./js/StackBlur.js');

var ReactBlur = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        img: React.PropTypes.string.isRequired,
        blurRadius: React.PropTypes.number,
        resizeSpeed: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            blurRadius: 0,
            resizeSpeed: 100
        }
    },

    componentDidMount() {
        window.addEventListener('resize', this.resize);

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

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    },

    resize() {
        var Blur = this;

        var now = +new Date,
            args = arguments,
            deferTimer,
            threshhold = Blur.props.resizeSpeed;

        if (this.last && now < this.last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                this.last = now;
                doResize();
            }, threshhold);
        } else {
            this.last = now;
            doResize();
        }

        function doResize() {
            var container = Blur.getDOMNode();

            Blur.height = container.offsetHeight;
            Blur.width = container.offsetWidth;

            stackBlurImage(Blur.img, Blur.canvas, Blur.props.blurRadius, Blur.width, Blur.height);
        }
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
                className={classes}
                onClick={this.clickTest} >

                <canvas className='react-blur-canvas' ref='canvas' />
                {children}
            </div>
        );
    }
});

module.exports = ReactBlur;