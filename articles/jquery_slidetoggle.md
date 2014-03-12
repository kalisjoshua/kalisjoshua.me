Title: jQuery slideToggle Frustration [DRAFT]
Date: ?
Tags: jQuery, JavaScript

I want there to be a built-in version of this function...

    function slideToggle(el, bool) {
      el[bool ? 'slideDown' : 'slideUp'](bool ? 400 : 250);
    }
