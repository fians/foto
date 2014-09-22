# Foto

Foto is a javascript library that help you to load images on your responsive website based on screen width of user device. So, it will help you to make your site faster than ever!

## How to use

Foto is designed to be easy to use, has no dependency and zero configuration. To use it, you just include foto.js inside your HTML, and add put `ft-*-src` attributes on `<img>` tag.

Example:

```html
<!DOCTYPE>
<html>
  <head>
    <title>Sample website</title>
    <script src="path/to/foto.js"></script>
  </head>
  <body>
    <img ft-480-src="path/to/image-that-will-be-loaded-when-screen-width-size-is-480px.jpg">
  </body>
</html>
```

You can define more than one `ft-*-src` on `<img>` tag, as long as the attribute's structure follow this convention: 

```
ft-(number-pixel)-src
```

`number-pixel` must be numeric characters (0-9). If it contains any non-numeric characters, Foto will not load the specified image.

Another example:

```html
<!DOCTYPE>
<html>
  <head>
    <title>Sample website</title>
    <script src="path/to/foto.js"></script>
  </head>
  <body>
    <img 
      ft-320-src="image-for-320px-screen-width.jpg"
      ft-480-src="image-for-480px-screen-width.jpg"
      ft-640-src="image-for-640px-screen-width.jpg"
      ft-768-src="image-for-768px-screen-width.jpg"
      ft-1024-src="image-for-1024px-screen-width.jpg"
    >
  </body>
</html>
```

By default, if there is no `src` tag on `<img>`, Foto will show white 1x1 pixels gif using base64 data-URI while load the specified image. It also detect `onresize` event, so when user resize their browser or rotate their phone/tablet, it will load image that has been specified by `ft-*-src`.

## Demo

Need comparison? Here we go:

- [Foto](http://fian.my.id/foto/demo/)
- [CSS width](http://fian.my.id/foto/demo/full-image.html)
- [CSS background-image](http://fian.my.id/foto/demo/background-image.html)

## Browser Support

- IE 6+
- Chrome 26+
- Firefox 2+
- Opera 9+
- Safari 5+

Note: Thanks for [SauceLabs](https://saucelabs.com/) for providing testing platform!

## License

Marka is released under the [MIT license](https://github.com/fians/foto/blob/master/LICENSE). 2014 (c) Alfiana Sibuea. All right reserved.
