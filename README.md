# stackoverflow-card
Embed your Stackoverflow account summary into your website using these beautiful cards.

# Usage
Insert the following tag in your document where you wish to include the card. This card occupies available parent container's `width`, so give some meaningful width to the parent element.
```html
<div id="so-card-widget" data-userid="1482899" data-theme="basic"></div>
```

* `data-userid` must be your stackoverflow user id(you can find that in your stackoverflow profile url).
* `data-theme` is the name of the theme you wish to use (right now only one theme is supported, will add more themes soon). If no theme is specified the default theme `basic` is used.

In addition to that you need to include the following `script` tag & voila !
```html
<script type="text/javascript" src="//cdn.rawgit.com/mudassir0909/stackoverflow-card/master/dist/so-card-widget.min.js"></script>
```

# I don't like the card look and feel, I want my own styles !!
These cards are not inserted using `iframe`, so change the look and feel as you like using your website's css. You can find the css [here](https://github.com/mudassir0909/stackoverflow-card/blob/master/widget.css). Feel free to override them classes !
