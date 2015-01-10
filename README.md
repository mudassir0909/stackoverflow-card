# stackoverflow-card
Embed your Stackoverflow account summary into your website using these beautiful cards.
![screenshot](https://raw.githubusercontent.com/mudassir0909/stackoverflow-card/master/assets/img/so-card.png)
# Usage
Insert the following tag in your document where you wish to include the card. **_This card occupies available parent container's `width`, so give some meaningful width to the parent element._**
```html
<div id="so-card-widget" data-userid="1482899" data-theme="default"></div>
```

* `data-userid` must be your stackoverflow user id(you can find that in your stackoverflow profile url).
* `data-theme` is the name of the theme you wish to use (default or minimal or custom). If no theme is specified the default theme `default` is used.

In addition to that you need to include the following `script` tag & voila !
```html
<script type="text/javascript" src="//mudassir0909.github.io/stackoverflow-card/dist/so-card-widget.min.js"></script>
```

# Look and feel Customization
The card supports two themes out of the box

### default
![Default Theme](https://raw.githubusercontent.com/mudassir0909/stackoverflow-card/master/assets/img/so-card.png)

### minimal
This removes profile picture from the card

![screenshot](https://raw.githubusercontent.com/mudassir0909/stackoverflow-card/master/assets/img/so-card-theme-minimal.png)

### custom
When you specify this as an option. The stylesheet related to this card is not downloaded. You have to specify your own styles based on the class names(Find out using chrome element inspector)


#### Note
These cards are not inserted using `iframe`, so change the look and feel as you like using your website's css. You can find the css [here](https://github.com/mudassir0909/stackoverflow-card/blob/master/widget.less). Feel free to override them classes !
