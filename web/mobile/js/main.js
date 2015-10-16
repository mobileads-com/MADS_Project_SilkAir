/*
 *
 * mads - version 2.00.01
 * Copyright (c) 2015, Ninjoe
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://en.wikipedia.org/wiki/MIT_License
 * https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 *
 */
var mads = function () {
    /* Get Tracker */
    if (typeof custTracker == 'undefined' && typeof rma != 'undefined') {
        this.custTracker = rma.customize.custTracker;
    } else if (typeof custTracker != 'undefined') {
        this.custTracker = custTracker;
    } else {
        this.custTracker = [];
    }

    /* Unique ID on each initialise */
    this.id = this.uniqId();

    /* Tracked tracker */
    this.tracked = [];

    /* Body Tag */
    this.bodyTag = document.getElementsByTagName('body')[0];

    /* Head Tag */
    this.headTag = document.getElementsByTagName('head')[0];

    /* RMA Widget - Content Area */
    this.contentTag = document.getElementById('rma-widget');

    /* URL Path */
    this.path = typeof rma != 'undefined' ? rma.customize.src : '';
};

/* Generate unique ID */
mads.prototype.uniqId = function () {
    return new Date().getTime();
};

/* Link Opner */
mads.prototype.linkOpener = function (url) {
    if(typeof url != "undefined" && url !=""){
        if (typeof mraid !== 'undefined') {
            mraid.open(url);
        }else{
            window.open(url);
        }
    }
};

/* tracker */
mads.prototype.tracker = function (tt, type, name) {
    /* 
     * name is used to make sure that particular tracker is tracked for only once
     * there might have the same type in different location, so it will need the name to differentiate them
     */
    name = name || type;

    if ( typeof this.custTracker != 'undefined' && this.custTracker != '' && this.tracked.indexOf(name) == -1 ) {
        for (var i = 0; i < this.custTracker.length; i++) {
            var img = document.createElement('img');

            /* Insert Macro */
            var src = this.custTracker[i].replace('{{type}}', type);
            src = src.replace('{{tt}}', tt);
            /* */
            img.src = src + '&' + this.id;

            img.style.display = 'none';
            this.bodyTag.appendChild(img);

            this.tracked.push(name);
        }
    }
};

/* Load JS File */
mads.prototype.loadJs = function (js, callback) {
    var script = document.createElement('script');
    script.src = js;
    if (typeof callback != 'undefined') {
        script.onload = callback;
    }
    this.headTag.appendChild(script);
};

/* Load CSS File */
mads.prototype.loadCss = function (href) {
    var link = document.createElement('link');
    link.href = href;
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');

    this.headTag.appendChild(link);
};

//SilkAir Application
var video;

var SilkAirAd = function () {
    var app = new mads();

    app.loadCss(app.path + 'css/style.css');

    app.contentTag.innerHTML =
        '<div class="wrapper"> \
            <div class="button-top"></div> \
           <div class="yt_cap"></div> \
           <div id="yt_frame"></div> \
           <a class="button"></a> \
        </div>';

    var loadEvent = function(){
        //load the video
        $('#yt_frame, .button-top').click(function(){
            video = new ytComponent({
                'container' : 'yt_frame',
                'width' : '320',
                'height' : '180',
                'videoId' : 'bX-Kw0FbrMM',
                'autoplay' : true,
                 'tracker' : app
            });
        });

        //redirect to the site
        $('.button').click(function(){
            app.linkOpener('http://www.silkair.com/');
            app.tracker('CTR','sia_site');
        });
    };

    var playVideo = function(){
        app.loadJs(app.path+'js/ninjoe.ytComponent.js', loadEvent);
    };

    app.loadJs('https://code.jquery.com/jquery-1.11.3.min.js', playVideo);
};

function onYouTubeIframeAPIReady() {
    video.loadVideo();
}

SilkAirAd();