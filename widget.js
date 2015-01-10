(function(document) {
    var templates = {
            profile_link: '<a href={url} target="_blank" class="so-profile-link"></a>',
            logo: '<span class="so-logo">' +
                    '<img src="{url}" />' +
                  '</span>',
            profile_picture: '<div class="so-profile-picture-container">' +
                                '<img src="{url}" />' +
                             '</div>',
            display_name: '<h4 class="so-display-name">{name}</h4>',
            reputation: '<p class="so-reputation">{reputation}</p>' +
                        '<small class="so-reputation-label">{label}</small>',
            badges_label: '<span class="so-badges-label">{label}</span>',
            badge: '<span class="so-badge-wrapper">' +
                        '<span class="so-badge so-badge-{type}"></span>' +
                        '<span class="so-badge-count">{count}</span>' +
                   '</span>',
            header: '<div class="so-header">{html}</div>',
            content: '<div class="so-content">{html}</div>',
            footer: '<div class="so-footer">{html}</div>',
            layout: '<div class="so-card so-theme-{theme}">{html}</div>'
        },
        container = document.getElementById('so-card-widget'),
        config = container.dataset,
        request = new XMLHttpRequest(),
        request_url = "//api.stackexchange.com/2.2/users/" +
                      config.userid + '/?site=stackoverflow',
        widget_stylesheet_url = "//mudassir0909.github.io/stackoverflow-card/dist/so-card-widget.min.css?v=1.0.0";

    function compile(template, data) {
        return template.replace(
            /{([^{}]*)}/g,
            function (a, b) {
                var r = data[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    }

    function constructHeader(user_info) {
        var logo_url = "//cdn.rawgit.com/mudassir0909/stackoverflow-card/master/assets/img/so-icon.png",
            logo = compile(templates.logo, { url: logo_url }),
            profile_picture = compile(templates.profile_picture, {url: user_info.profile_image}),
            display_name = compile(templates.display_name, {name: user_info.display_name}),
            inner_html = [logo, profile_picture, display_name].join('');

        return compile(templates.header, {html: inner_html});
    }

    function constructContent(user_info) {
        var reputation = compile(templates.reputation, {
                reputation: user_info.reputation,
                label: 'Stackoverflow reputation'
            });

        return compile(templates.content, {html: reputation});
    }

    function constructFooter(user_info) {
        var i, inner_html, badges_html, badge_type,
            badges_label = compile(templates.badges_label, {label: 'Badges'}),
            badges = [],
            badge_names = ['gold', 'silver', 'bronze'];

        for (i=0; i<badge_names.length; i++) {
            badge_type = badge_names[i];

            badges.push(compile(templates.badge, {
                type: badge_type,
                count: user_info.badge_counts[badge_type]
            }));
        }

        badges_html = badges.join('');
        inner_html = [badges_label, badges_html].join('');

        return compile(templates.footer, {html: inner_html});
    }

    function constructCard(user_info) {
        var profile_url = '//stackoverflow.com/users/' + config.userid,
            profile_link = compile(templates.profile_link, {url: profile_url}),
            header = constructHeader(user_info),
            content = constructContent(user_info),
            footer = constructFooter(user_info),
            inner_html = [profile_link, header, content, footer].join('');

        return compile(templates.layout, {
            theme: config.theme || 'basic',
            html: inner_html
        });
    }

    function render(user_info) {
        container.innerHTML = constructCard(user_info);
    }

    // Inserting widget stylesheet
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