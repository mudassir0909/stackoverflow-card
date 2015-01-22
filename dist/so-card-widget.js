var so_tmpl = (function(){
function encodeHTMLSource() {  var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },  matchHTML = /&(?!#?w+;)|<|>|"|'|\//g;  return function() {    return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;  };};
String.prototype.encodeHTML=encodeHTMLSource();
var tmpl = {};
  tmpl['so-card-template']=function anonymous(it) {
var out='<div class="so-card"><a href="'+(it.profile_url)+'" target="_blank" class="so-profile-link"></a><div class="so-header"><span class="so-logo"><img src="'+(it.logo_url)+'" alt=""></span><div class="so-profile-picture-container"><img src="'+(it.profile_image)+'" alt=""></div><h4 class="so-display-name">'+(it.display_name)+'</h4></div><div class="so-content"><p class="so-reputation">'+(it.reputation)+'</p><small class="so-reputation-label">Stackoverflow reputation</small></div><div class="so-footer"><span class="so-badges-label">Badges</span><span class="so-badge-wrapper"><span class="so-badge so-badge-gold"></span><span class="so-badge-count">'+(it.badge_counts.gold)+'</span></span><span class="so-badge-wrapper"><span class="so-badge so-badge-silver"></span><span class="so-badge-count">'+(it.badge_counts.silver)+'</span></span><span class="so-badge-wrapper"><span class="so-badge so-badge-bronze"></span><span class="so-badge-count">'+(it.badge_counts.bronze)+'</span></span></div></div>';return out;
};
return tmpl;})();
(function(document) {
    var container = document.getElementById('so-card-widget'),
        userid = container.getAttribute('data-userid'),
        theme = container.getAttribute('data-theme'),
        request = new XMLHttpRequest(),
        request_url = "//api.stackexchange.com/2.2/users/" +
                      userid + '/?site=stackoverflow',
        widget_stylesheet_url = "//mudassir0909.github.io/stackoverflow-card/dist/1.0.0/so-card-widget.min.css",
        logo_url = "//cdn.rawgit.com/mudassir0909/stackoverflow-card/master/assets/img/so-icon.png",
        profile_url = '//stackoverflow.com/users/' + userid;

    function render(user_info) {
        var theme_class = "so-card-theme-" + (theme || 'default');

        container.className += theme_class;
        container.innerHTML = window.so_tmpl['so-card-template']({
            profile_url: profile_url,
            profile_image: user_info.profile_image,
            display_name: user_info.display_name,
            logo_url: logo_url,
            reputation: user_info.reputation,
            badge_counts: user_info.badge_counts
        });
    }

    // Inserting widget stylesheet
    if (theme !== 'custom') {
        (function(document, tag_name) {
            var existing_stylesheet_tags, last_stylesheet_tag,
                widget_stylesheet_tag = document.createElement(tag_name);

            widget_stylesheet_tag.rel = "stylesheet";
            widget_stylesheet_tag.href = widget_stylesheet_url;
            widget_stylesheet_tag.type = "text/css";
            existing_stylesheet_tags = document.head.getElementsByTagName(tag_name);
            last_stylesheet_tag = existing_stylesheet_tags[existing_stylesheet_tags.length - 1];

            if (last_stylesheet_tag) {
                last_stylesheet_tag.parentNode
                                    .insertBefore(widget_stylesheet_tag,
                                                  last_stylesheet_tag.nextSibling);
            } else {
                document.head.insertBefore(widget_stylesheet_tag, null);
            }
        })(document, 'link');
    }

    request.onreadystatechange = function() {
        var data;

        if (request.readyState === 4) {
            if (request.status === 200) {
                data = JSON.parse(request.responseText).items[0];
                render(data);

                if (typeof window.soAsyncInit === 'function') {
                    window.soAsyncInit(data);
                }
            }
        }
    };

    request.open('GET', request_url, true);
    request.send();
})(document);