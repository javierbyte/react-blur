import React from 'react';
import PropTypes from 'prop-types';

const stackBlurImage = require('../lib/StackBlur.js');

class ReactBlur extends React.PureComponent {
  static propTypes = {
    blurRadius: PropTypes.number,
    children: PropTypes.node,
    className: PropTypes.string,
    enableStyles: PropTypes.bool,
    img: PropTypes.string.isRequired,
    onLoadFunction: PropTypes.func,
    resizeInterval: PropTypes.number,
  };

  static defaultProps = {
    blurRadius: 0,
    children: null,
    className: '',
    enableStyles: false,
    onLoadFunction: () => {},
    resizeInterval: 128,
  };

  componentDidMount() {
    this.loadImage();
    window.addEventListener('resize', this.resize.bind(this));
  }

  componentDidUpdate() {
    if (!this.img) {
      this.loadImage(this.props);
    } else if (!this.isCurrentImgSrc(this.props.img)) {
      this.img.src = this.props.img;
      this.setDimensions();
    } else {
      // if some other prop changed reblur
      stackBlurImage(
        this.img,
        this.canvas,
        this.getCurrentBlur(),
        this.width,
        this.height
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  getCurrentBlur() {
    return this.props.blurRadius;
  }

  setDimensions() {
    this.height = this.container.offsetHeight;
    this.width = this.container.offsetWidth;
    this.canvas.height = this.height;
    this.canvas.width = this.width;
  }

  isCurrentImgSrc(newSrc) {
    // Handle relative paths
    if (this.img) {
      const newImg = new Image();
      newImg.src = newSrc;
      // if absolute SRC is the same
      return newImg.src === this.img.src;
    }

    return false;
  }

  loadImage() {
    if (this.isCurrentImgSrc(this.props.img)) {
      stackBlurImage(
        this.img,
        this.canvas,
        this.props.blurRadius,
        this.width,
        this.height
      );
      return;
    }

    this.img = new Image();
    this.img.crossOrigin = 'Anonymous';

    this.img.onload = event => {
      stackBlurImage(
        this.img,
        this.canvas,
        this.getCurrentBlur(),
        this.width,
        this.height
      );
      this.props.onLoadFunction(event);
    };

    this.img.onerror = event => {
      // Remove the onerror listener.
      // Preventing recursive calls caused by setting this.img.src to a falsey value
      this.img.onerror = undefined;

      this.img.src = '';
      this.props.onLoadFunction(event);
    };
    this.img.src = this.props.img;

    this.setDimensions();
  }

  resize() {
    const now = new Date().getTime();
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
    this.setDimensions();

    stackBlurImage(
      this.img,
      this.canvas,
      this.getCurrentBlur(),
      this.width,
      this.height
    );
  }

  render() {
    const {
      blurRadius,
      children,
      className,
      enableStyles,
      img,
      onLoadFunction,
      resizeInterval,
      ...other
    } = this.props;

    let classes = 'react-blur';
    if (className) {
      classes += ` ${className}`;
    }

    const containerStyle = enableStyles
      ? {
          position: 'relative',
        }
      : {};
    const canvasStyle = enableStyles
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
        }
      : {};

    return (
      <div
        className={classes}
        ref={ref => {
          this.container = ref;
        }}
        style={containerStyle}
        {...other}
      >
        <canvas
          className="react-blur-canvas"
          ref={ref => {
            this.canvas = ref;
          }}
          style={canvasStyle}
        />
        {children}
      </div>
    );
  }
}

export default ReactBlur;
