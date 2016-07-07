import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
const stackBlurImage = require('../lib/StackBlur.js');

export default class ReactBlur extends React.Component {
  static propTypes = {
    img           : React.PropTypes.string.isRequired,
    blurRadius    : React.PropTypes.number,
    resizeInterval: React.PropTypes.number,
    className     : React.PropTypes.string,
    children      : React.PropTypes.any
  };

  static defaultProps = {
    blurRadius    : 0,
    resizeInterval: 128
  };

  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    const { blurRadius } = this.props;
    const container = ReactDOM.findDOMNode(this);

    this.height = container.offsetHeight;
    this.width  = container.offsetWidth;

    this.canvas        = ReactDOM.findDOMNode(this.refs.canvas);
    this.canvas.height = this.height;
    this.canvas.width  = this.width;

    this.img             = new Image();
    this.img.crossOrigin = 'Anonymous';
    this.img.onload      = () => {
      stackBlurImage(this.img, this.canvas, blurRadius, this.width, this.height);
    };
    this.img.src         = this.props.img;

    window.addEventListener('resize', this.resize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  componentWillUpdate(nextProps) {
    if (this.img.src !== nextProps.img) {
      this.img.src = nextProps.img;
    }
    stackBlurImage(this.img, this.canvas, nextProps.blurRadius, this.width, this.height);
  }

  resize() {
    const now        = new Date().getTime();
    let deferTimer;
    const threshhold = this.props.resizeInterval;

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
  }

  doResize() {
    const container = ReactDOM.findDOMNode(this);

    this.height = container.offsetHeight;
    this.width  = container.offsetWidth;

    stackBlurImage(this.img, this.canvas, this.props.blurRadius, this.width, this.height);
  }

  render() {
    var { className, children, ...other } = this.props;
    var classes = 'react-blur';

    if (className) {
      classes += ' ' + className;
    }

    return (
      <div {...other} className={classes} onClick={this.clickTest}>
        <canvas className='react-blur-canvas' ref='canvas' />
        {children}
      </div>
    );
  }
};
