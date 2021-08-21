import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import stackBlurImage from "./lib/StackBlur.js";

let animating = false;

const ReactBlur = (props) => {
  const {
    blurRadius = 0,
    children = null,
    className = "",
    enableStyles = false,
    onLoadFunction = () => {},
    shouldResize = false,
    resizeInterval = 64,
    img,
    ...other
  } = props;

  const containerRef = useRef();
  const canvasRef = useRef();
  const imgRef = useRef();
  const widthRef = useRef();
  const heightRef = useRef();

  useEffect(() => {
    loadImage();

    if (shouldResize) {
      window.addEventListener("resize", resize);
    }

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (!imgRef.current) {
      loadImage(props);
    } else if (!isCurrentImgSrc(img)) {
      imgRef.current.src = img;
      setDimensions();
    } else {
      // if some other prop changed reblur

      if (animating) {
        console.log("rejected");
        return;
      }

      animating = true;

      window.requestAnimationFrame(() => {
        stackBlurImage(imgRef.current, canvasRef.current, blurRadius, widthRef.current, heightRef.current, () => {
          animating = false;
        });
      });
    }
  });

  const setDimensions = () => {
    heightRef.current = containerRef.current.offsetHeight;
    widthRef.current = containerRef.current.offsetWidth;
    canvasRef.current.height = heightRef.current;
    canvasRef.current.width = widthRef.current;
  };

  const isCurrentImgSrc = (newSrc) => {
    // Handle relative paths
    if (imgRef.current) {
      const newImg = new Image();
      newImg.src = newSrc;
      // if absolute SRC is the same
      return newImg.src === imgRef.current.src;
    }

    return false;
  };

  const loadImage = () => {
    if (isCurrentImgSrc(imgRef.current)) {
      stackBlurImage(imgRef.current, canvasRef.current, blurRadius, widthRef.current, heightRef.current);
      return;
    }

    imgRef.current = new Image();
    imgRef.current.crossOrigin = "Anonymous";

    imgRef.current.onload = (event) => {
      stackBlurImage(imgRef.current, canvasRef.current, blurRadius, widthRef.current, heightRef.current);
      onLoadFunction(event);
    };

    imgRef.current.onerror = (event) => {
      // Remove the onerror listener.
      // Preventing recursive calls caused by setting this.img.src to a falsey value
      imgRef.current.onerror = undefined;

      imgRef.current.src = "";
      onLoadFunction(event);
    };
    imgRef.current.src = img;

    setDimensions();
  };

  let last;
  const resize = () => {
    const now = new Date().getTime();
    let deferTimer;
    const threshhold = resizeInterval;

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        doResize();
      }, threshhold);
    } else {
      last = now;
      doResize();
    }
  };

  const doResize = () => {
    setDimensions();

    stackBlurImage(imgRef.current, canvasRef.current, blurRadius, widthRef.current, heightRef.current);
  };

  let classes = "react-blur";
  if (className) {
    classes += ` ${className}`;
  }

  const containerStyle = enableStyles
    ? {
        position: "relative",
      }
    : {};
  const canvasStyle = enableStyles
    ? {
        position: "absolute",
        top: 0,
        left: 0,
      }
    : {};

  return (
    <div className={classes} ref={containerRef} style={containerStyle} {...other}>
      <canvas className="react-blur-canvas" ref={canvasRef} style={canvasStyle} />
      {children}
    </div>
  );
};

ReactBlur.propTypes = {
  blurRadius: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  enableStyles: PropTypes.bool,
  img: PropTypes.string.isRequired,
  onLoadFunction: PropTypes.func,
  shouldResize: PropTypes.bool,
  resizeInterval: PropTypes.number,
};

export default ReactBlur;
