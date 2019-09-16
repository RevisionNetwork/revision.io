
var currScroll = 0;
var prevScroll = 0;

var margin = 0;
var menuFontSize = 0;

var isMobile = false;



$("document").ready(function(){

	init();
	$(window).resize(resizeHandler);

	$(".page--wrapper").on('mousedown', '.collapse--button', function(){
		var that = $(this);
		if(that.parent().hasClass("open")){
			that.text("+");
			that.parent().removeClass("open");
			that.siblings(".collapse--content").css("height", "");
		} else {
			collapse();
			that.text("–");
			that.parent().addClass("open");
			that.siblings(".collapse--content").css("height", that.siblings(".collapse--content")[0].scrollHeight + "px");
		}
	});

	$(".page--wrapper").on('mousedown', '.block--collapse h2', function(){
		var that = $(this);
		if(!that.parent().hasClass("open")){
			collapse();
			that.siblings(".collapse--button").text("–");
			that.parent().addClass("open");
			var h = that.siblings(".collapse--content")[0].scrollHeight;
			// if(h < window.innerHeight * 0.75){
			// 	h = window.innerHeight * 0.75;
			// }
			that.siblings(".collapse--content").css("height", h + "px");
		}
	});

	

	refresh();


	$(".site--title, .link--home").click(function(e){
		e.preventDefault();
		pageHandler('home');
	});

	$(".menu > a, .menu--1 a:not(.link--home), .link--internal").click(function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		$(".menu > a").removeClass("selected");
		$(this).addClass("selected");
		pageHandler(href);
	});

	$(".page--wrapper").on('click', 'a', function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		if(url.includes('http')){
			window.open(url, '_blank');
		} else if(url.includes('mailto')){
			window.open(url);
		} else {
			$(".menu > a").removeClass("selected");
			$(".menu > a").each(function(){
				var dest = $(this).attr("href").replace("window.location.hostname", "");
				if(dest.includes(url) && url != ''){
					$(this).addClass("selected");
				}
			})
			pageHandler(url);
		}
	});


	$(".menu--mobile--bar").mousedown(function(){
		if($(".menu--mobile").hasClass('open')){
			$(".menu--mobile--bar span").text("MENU");
			$(".menu--mobile").removeClass("open");
			$(".menu--mobile").css({"bottom": "0px"});
		} else {
			$(".menu--mobile").addClass("open");
			$(".menu--mobile--bar span").text("CLOSE");
			var h = $(".menu--mobile--list").outerHeight();
			$(".menu--mobile").css({"bottom": h + "px"});
		}
	});


	// submenu
	$(".page--wrapper").on('mouseover', '.submenu', function(){
		if(!isMobile){
			$(this).css({"height": ($(this).children(".submenu--list").outerHeight() + margin) + "px"}).addClass("open");
		}
	});

	$(".page--wrapper").on('mousedown', '.submenu', function(){
		if(isMobile){
			$(this).css({"height": ($(this).children(".submenu--list").outerHeight() + (margin*2)) + "px"}).addClass("open");
		}
	});

	$(".page--wrapper").on('mousedown', '.submenu--list li', function(e){
		$(".submenu--list li").removeClass("selected");
		var index = $(".submenu--list li").index($(this));
		var sub =  margin + menuFontSize;
		if(index == 0){
			sub = $(".submenu").children(".submenu--list").outerHeight() + margin;
		}
		var offsetTop = $(".page .block:eq(" + index + ")").offset().top - sub + 1;
		$("body, html").animate({"scrollTop": offsetTop}, 1000);
	});

	$(window).scroll(function(){
		currScroll = $(window).scrollTop();
		if(currScroll - prevScroll > 100 && currScroll > 50){
			var h = margin + menuFontSize;
			if(isMobile){
				$(".submenu").css({"height": "6.5vh"}).removeClass("open");
			} else {
				$(".submenu").css({"height": h + "px"}).removeClass("open");
			}
			prevScroll = currScroll;
		} else if(currScroll - prevScroll < -100){
			var h = ($(".submenu").children(".submenu--list").outerHeight() + margin);
			if(isMobile){
				h += margin;
			}
			$(".submenu").css({"height": h + "px"}).addClass("open");
			prevScroll = currScroll;
		}


		for(var i = 0; i < $(".page .block").length; i++){
			var top = $(".page .block:eq(" + i + ")").offset().top - 100;
			var h = $(".page .block:eq(" + i + ")").outerHeight();
			if(currScroll >  top && currScroll < top + h){
				$(".submenu--selected").html("<span style='display:inline-block;width:1.3em'>" + (i + 1) + "</span>" + $(".submenu--list li:eq(" + i + ")").text());
				$(".submenu--list li").removeClass("selected");
				$(".submenu--list li:eq(" + i + ")").addClass("selected");
			}
		}

	});

	$(".page").css({"padding-top": $(".submenu").outerHeight() - 1 + "px"});

});


function init(){

	if(window.innerWidth < 900){
		isMobile = true;
	}

	margin = 0.008 * window.innerWidth;
	menuFontSize = 0.022 * window.innerWidth;
	if(isMobile){
		margin = 0.015 * window.innerHeight;
		menuFontSize = 0.035 * window.innerHeight;
	}
	
}



function pageHandler(dest){

	if(dest == 'home'){
		$('body').removeClass('page--open');
		window.history.pushState("", "home" ,"/");
		$(".menu > a").removeClass("selected");
		if(isMobile){
			$("canvas").removeClass("stop");
			$(".page--wrapper").addClass('hide');
			setTimeout(function(){
				$(".page--wrapper").html('');
			}, 500);
		}
	} else {
		var n = dest.replace("window.location.hostname", "");
		$(".submenu, main, .page--title").addClass('hide');
		setTimeout(function(){
			$(".page--wrapper").load(dest, function(response){
				subMenuHeight();
				window.history.pushState("", n ,dest);
				subMenuHeight();
				$("body, html").scrollTop(0);
				if(isMobile){
					$(".page--wrapper").removeClass('hide');
					setTimeout(function(){
						$("canvas").addClass("stop");
					}, 500);
				}
				$(".submenu, main, .page--title").removeClass('hide');
				$('body').addClass('page--open');
				refresh();
			});
		}, 500);
	}

	if(isMobile){
		$(".menu--mobile--bar span").text("MENU");
		$(".menu--mobile").removeClass("open");
		$(".menu--mobile").css({"bottom": "0px"});
	}
}


function resizeHandler(){
	if(window.innerWidth < 900){
		isMobile = true;
	} else {
		isMobile = false;
	}

	margin = 0.008 * window.innerWidth;
	menuFontSize = 0.022 * window.innerWidth;
	if(isMobile){
		margin = 0.015 * window.innerHeight;
		menuFontSize = 0.035 * window.innerHeight;
	}

	subMenuHeight();
}


function refresh(){

	if(!isMobile){
		$(".col3").each(function(){
			console.log(this);
			if($(this).children().length < 2){
				$(this).addClass('col3--single');
			}
		});
	}

	$('.gallery').each(function(){
		$(this).slick({
			nextArrow: $(this).siblings(".gallery--next"),
			prevArrow: $(this).siblings(".gallery--prev")
		});
	});


	if($(".submenu").length == 0){
		$(".page").css({"padding-top": "0px"});
	}

}

function collapse(){
	$(".block--collapse").each(function(){
		$(this).removeClass('open');
		$(this).children('.collapse--button').text("+");
		$(this).children(".collapse--content").css("height", "");
	});
}


function subMenuHeight(){
	var h = ($(".submenu").children(".submenu--list").outerHeight() + margin);
	$(".page").css({"padding-top": $(".submenu").outerHeight() - 1 + "px"});
	if(isMobile){
		h += margin;
	}
	$(".submenu").css({"height": h + "px"}).addClass("open");
}