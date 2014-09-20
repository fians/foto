# Foto

Foto is a javascript library that help you to load images on your responsive website based on user device's sreen width. It means it will help you to make your site faster than ever!

## Why?

Well, image size has been a generral issue when you tried to build a resposive website, because you shouldn't load same image resources when user visit your site from smartphone, as you did when they visit from desktop.

You might said _"Just make the images being cached, dude!"_. 

So what happen if there is a guy who searching a product on Google through his phone and when they click your website they're quickly frustated and leave because your site has big welcome image which have size about 2MB.

A common quickfix for this problem is using combination of CSS `background-image` and `media query`. But when it comes to dynamic images, it will make your HTML looks so dirty, and may be other people will have problem when they trying to fix other bugs on it.

That's why I created Foto to solve this problem.

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
