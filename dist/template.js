(function() {
	window.JST = window.JST || {};
	JST["so-card-template"] = function(data) {
		return "<div class='so-card'>" 	+
 "<a href='" + data.profile_url + "' target='_blank' class='so-profile-link'></a>" 	+
 "<div class='so-header'>" 	+
 "<span class='so-logo'>" 	+
 "<img src='" + data.logo_url + "' alt=''>" 	+
 "</span>" 	+
 "<div class='so-profile-picture-container'>" 	+
 "<img src='" + data.profile_image + "' alt=''>" 	+
 "</div>" 	+
 "<h4 class='so-display-name'>" + data.display_name + "</h4>" 	+
 "</div>" 	+
 "<div class='so-content'>" 	+
 "<p class='so-reputation'>" + data.reputation + "</p>" 	+
 "<small class='so-reputation-label'>Stackoverflow reputation</small>" 	+
 "</div>" 	+
 "" 	+
 "<div class='so-footer'>" 	+
 "<span class='so-badges-label'>Badges</span>" 	+
 "" 	+
 "<span class='so-badge-wrapper'>" 	+
 "<span class='so-badge so-badge-gold'></span>" 	+
 "<span class='so-badge-count'>" + data.badge_counts.gold + "</span>" 	+
 "</span>" 	+
 "" 	+
 "<span class='so-badge-wrapper'>" 	+
 "<span class='so-badge so-badge-silver'></span>" 	+
 "<span class='so-badge-count'>" + data.badge_counts.silver + "</span>" 	+
 "</span>" 	+
 "" 	+
 "<span class='so-badge-wrapper'>" 	+
 "<span class='so-badge so-badge-bronze'></span>" 	+
 "<span class='so-badge-count'>" + data.badge_counts.bronze + "</span>" 	+
 "</span>" 	+
 "</div>" 	+
 "</div>";
	};
})();