# React Blur

React component for creating blurred backgrounds. Thanks to [Quasimodo](http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html) for the algorithm.

[Live demo](http://javierbyte.github.io/react-blur/)

![react-textselect screenshot](docs/screenshot.png)

## Installation

    npm install react-blur --save

## Usage

    var Blur = require('react-blur');

    <Blur img='../../assets/img.jpg' blurRadius={5}>
        The content.
    </Blur>

#### Props.

    img: The image path.
    blurRadius: The size of the blur radius.