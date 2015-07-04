var React = require('react/addons');
var stackBlurImage = require('../lib/StackBlur.js');

var ReactBlur = React.createClass({

  mixins: [
    React.addons.PureRenderMixin
  ],

  propTypes: {
    img: React.PropTypes.string.isRequired,
    blurRadius: React.PropTypes.number,
    resizeInterval: React.PropTypes.number,
    className: React.PropTypes.string,
    children: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      blurRadius: 0,
      resizeInterval: 128
    };
  },

  componentDidMount() {
    var {blurRadius} = this.props;
    var container = React.findDOMNode(this);

    this.height = container.offsetHeight;
    this.width = container.offsetWidth;

    this.canvas = React.findDOMNode(this.refs.canvas);
    this.canvas.height = this.height;
    this.canvas.width = this.width;

    this.img = new Image();
    this.img.crossOrigin = 'Anonymous';
    this.img.onload = () => {
      stackBlurImage( this.img, this.canvas, blurRadius, this.width, this.height);
    };
    this.img.src = this.props.img;

    window.addEventListener('resize', this.resize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  },

  resize() {
    var now = new Date().getTime();
    var deferTimer;
    var threshhold = this.props.resizeInterval;

    if (this.last && now < this.last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        this.last = now;
        this.doResize();
      }, threshhold);
    } else {
      this.last = now;
      this.doResize();
    }
  },

  doResize() {
    var container = React.findDOMNode(this);

    this.height = container.offsetHeight;
    this.width = container.offsetWidth;

    stackBlurImage(this.img, this.canvas, this.props.blurRadius, this.width, this.height);
  },

  componentWillUpdate(nextProps) {
    stackBlurImage(this.img, this.canvas, nextProps.blurRadius, this.width, this.height);
  },

  render() {
    var {img, className, children, ...other} = this.props;
    var classes = 'react-blur';

    if (className) {
      classes += ' ' + className;
    }

    return (
      <div {...other} className={classes} onClick={this.clickTest} >
        <canvas className='react-blur-canvas' ref='canvas' />
        {children}
      </div>
    );
  }
});

module.exports = ReactBlur;
