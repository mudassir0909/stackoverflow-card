(function(document) {
    var container = document.getElementById('so-card-widget'),
        config = container.dataset,
        request = new XMLHttpRequest(),
        request_url = "//api.stackexchange.com/2.2/users/" +
                      config.userid + '/?site=stackoverflow',
        widget_stylesheet_url = "//mudassir0909.github.io/stackoverflow-card/dist/1.0.0/so-card-widget.min.css",
        logo_url = "//cdn.rawgit.com/mudassir0909/stackoverflow-card/master/assets/img/so-icon.png",
        profile_url = '//stackoverflow.com/users/' + config.userid;

    function render(user_info) {
        var theme_class = "so-card-theme-" + (config.theme || 'default');

        container.className += theme_class;
        container.innerHTML = window.JST['so-card-template']({
            profile_url: profile_url,
            profile_image: user_info.profile_image,
            display_name: user_info.display_name,
            logo_url: logo_url,
            reputation: user_info.reputation,
            badge_counts: user_info.badge_counts
        });
    }

    // Inserting widget stylesheet
    if (config.theme !== 'custom') {
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
        if (request.readyState === 4) {
            if (request.status === 200) {
                render(JSON.parse(request.responseText).items[0]);
            }
        }
    };

    request.open('GET', request_url, true);
    request.send();
})(document);