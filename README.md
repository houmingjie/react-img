# react-img

## Usage
just like React img tag but some additional props.

## features
* `placeholderSrc,loadingSrc,errorSrc,src` props match 4 stage of an image.
1. render to dom : placeholderSrc
2. begin load : loadingSrc,if not set,use placeholderSrc
3. img load success : src,
4. img load error : errorSrc

* `onError,onLoad` event behave like broswer default.
* `getElement` return the img element that this component rendered. 