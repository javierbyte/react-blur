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
    children      : React.PropTypes.any,
    onLoadFunction: React.PropTypes.func
  };

  static defaultProps = {
    blurRadius    : 0,
    resizeInterval: 128,
    onLoadFunction: () => {}
  };

  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.loadImage(this.props);

    window.addEventListener('resize', this.resize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  componentDidUpdate() {
    if (!this.img) {
      this.loadImage(this.props);
    } else if (!this.isCurrentImgSrc(this.props.img)) {
      this.img.src = this.props.img;
      this.setDimensions();
    } else {
      // if some other prop changed reblur
      stackBlurImage(this.img, this.canvas, this.getCurrentBlur(), this.width, this.height);
    }
  }

  isCurrentImgSrc(newSrc) {
    // Handle relative paths
    if (this.img) {
      const newImg = new Image();
      newImg.src   = newSrc;

      // if absolute SRC is the same
      return newImg.src === this.img.src;
    }

    return false;
  }

  getCurrentBlur() {
    return this.props.blurRadius;
  }

  loadImage(props) {
    if (this.isCurrentImgSrc(props.img)) {
      stackBlurImage(this.img, this.canvas, props.blurRadius, this.width, this.height);
      return;
    }

    this.img             = new Image();
    this.img.crossOrigin = 'Anonymous';
    this.img.onload      = (event) => {
      stackBlurImage(this.img, this.canvas, this.getCurrentBlur(), this.width, this.height);
      props.onLoadFunction(event);
    };
    this.img.onerror     = (event) => {
      this.img.onerror = undefined; // Remove the onerror listener. Preventing recursive calls caused by setting this.img.src to a falsey value
      this.img.src     = '';
      props.onLoadFunction(event);
    };
    this.img.src         = props.img;

    this.setDimensions();
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

  setDimensions() {
    const container = ReactDOM.findDOMNode(this);

    this.height = container.offsetHeight;
    this.width = container.offsetWidth;

    this.canvas        = ReactDOM.findDOMNode(this.refs.canvas);
    this.canvas.height = this.height;
    this.canvas.width  = this.width;
  }

  doResize() {
    this.setDimensions();

    stackBlurImage(this.img, this.canvas, this.getCurrentBlur(), this.width, this.height);
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
