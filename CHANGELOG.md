# 1.0.1
* Fix resizing

# 1.0.0
* Add `requestAnimationFrame` to prevent extra work.
* Update dependencies.

# 0.6.0
* Add conditional flag for resizing by @TheHaff

# 0.5.2
* Fix issue when the child canvas didn't fill the parent container. Thank @getmicah !

# 0.5.1
* Prevents recursive calls caused by setting this.img.src to a falsey value. eg. an empty string. (thanks @joshgillies!).

# 0.5.0
* Fix gitignore for MAC
* Fix undeclared vars
* add onLoadFunction prop for hook into the blur loading.
* make sure changing src keeps correct blurRadius
* Do not reload image if the img src prop is relative (because it won't match this.img.src which is absolute)

Thanks @iamJoeTaylor!

# 0.3.1
* Fix `react-addons-pure-render-mixin` dependency bug. (thanks @bogas04!).

# 0.3.0
* Added support for react 0.14.x (thanks @voronianski!).

# 0.2.5
* Update image if a new image src is passed in props [ab54d60d]

# 0.2.4
* Prevent the component to crash if there was a CORS error.

# 0.2.3
* Stop wasting renders on componentWillReceiveProps, using componentWillUpdate instead.

# 0.2.0
* Assets are now precompiled.
* Changed `resizeSpeed` for `resizeInterval`.

# v0.1.0
* Added `resizeSpeed` prop.
