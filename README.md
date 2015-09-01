# [React Blur](http://javierbyte.github.io/react-blur/)

React component for creating blurred backgrounds using canvas.

[Live demo](http://javierbyte.github.io/react-blur/)

[![react-blur](screenshot.png)](http://javierbyte.github.io/react-blur/)

## Installation

```js
npm install react-blur --save
```

## Usage

```js
var Blur = require('react-blur');
```

### Add styles

```js
@import url(node_modules/react-blur/dist.css);
```

### Example

```jsx
<Blur img='/directory/img.jpg' blurRadius={5}>
  The content.
</Blur>
```

For a complete example see the code in the [demo branch](https://github.com/javierbyte/react-blur/blob/gh-pages/src/js/app.jsx).

#### Props.

* `img`: The image path.
* `blurRadius`: The size of the blur radius.
* `resizeInterval`: Optional. How fast the canvas should re-render on resize? Defaults to 128ms.

Thanks to [Quasimodo](http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html) for the original stack blur algorithm.
