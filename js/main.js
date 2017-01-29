$('.play_btn').hide();
$('.arrow').hide();
$('.engl').hide();
$('.china').hide();




$(document).ready(function() {
//DETECT MOB DEVICE
    if (screen.width <= 480) {
        window.location = "http://webdev-pages.esy.es/r-safer/mobile/";
        }


var loaderHide = new TweenMax($('.loader'), 1,{alpha:0, onComplete:function(){
	$('.loader').hide();
	var secShow = new TweenMax($('section'), 1,{alpha:1, onComplete: first_kadr_animate()});
}})

var shineTL = TweenMax.to($('.puls'), 1, {alpha:.7, repeat:-1, yoyo:true});


var annot_active = true;
var slideAlpha = false;
var klientWindow = $(window).width();
$('.slide').css('left', klientWindow);

function first_kadr_animate(){

	var firstTL = new TimelineMax();

	firstTL.to($("#line"), .5,{width:860})
		.to($('.slash'), .5, {alpha:1})
		.to($('#f_slash'), .3, {x:-41})
		.to($('#s_slash'), .3, {x:41, delay:-.3})

        .to($('#c_lang'), .4, {top:0, delay:-.2})
		.to($('#e_lang'), .4, {left:0, delay:-.4})

		.to($('#r_lang'), .4, {right:0, delay:-.4})
		.to($('.logos'), 2, {alpha:1})
		.to($('.text_below'), 0.5, {alpha:1, y:20, delay:-1.5})
}

$('.logos').on('click', function(){
    if(!annot_active){
    	annot_active = true;
    	slideAlpha = true;
    	var videMove = new TweenMax.to($('.background-wrap'), 0.01, {y:500, alpha:0, onComplete: function(){
    		var windowTL = new TimelineMax();
				 $('.background-wrap').show();
    		windowTL.to($('.slider'), 0.5, {alpha:0})
    				.to($('.background-wrap'), 0.5, {alpha:1, y:0, delay:-0.2, onComplete: function(){
    					$('.slider').hide();
    					$('.play_btn').show();
    				}})
    	}})
        $('.arrow').hide();
    }

});


var activeLang = 'rus';

// Choose Languages
$(".lang a").on("click", function(e) {
        e.preventDefault();


        var r_line = 860;

        var fl = false;

        if($(this)[0].id == 'rush_lang'){
        	$('.rus').show();
            $('.engl').hide();
            $('.china').hide();
            r_line = 810;
            fl = true;
            activeLang = 'rus';
        }

        if($(this)[0].id == 'engl_lang'){
        	$('.engl').show();
            $('.rus').hide();
        	$('.china').hide();
        	r_line = 560;
        	fl = true;
        	activeLang = 'en';
        }

        if($(this)[0].id == 'china_lang'){
            $('.china').show();
            $('.rus').hide();
            $('.engl').hide();
            r_line = 450;
            fl = true;
            activeLang = 'ch';
        }


        if(annot_active){
        	// смена первого екрана
        	annot_active = false;
        	$('.puls').hide();

        	var kw = document.documentElement.clientWidth;
        	var kh = document.documentElement.clientHeight;

        	var obj = document.getElementById("lang");
        	var br= obj.getBoundingClientRect();
			kw = kw - br.left - 240;
			kh = kh - br.top - 50;

        	var first_closeTL = new TimelineMax();

        		first_closeTL.to($('.logos'), 1, {top:-5, scale: 0.55, y: -5})
        				.to($('.footer'), 1, {bottom:-20, scale: 0.7, delay:-1})
        				.to($('.pre_line'), 1, {width:75, delay:-1})
        				.to($('.post_line'), 1, {width:75, delay:-1})
        				.to($('#line'), 0.5, {alpha:0, delay:-1})
        				.to($('.lang'), 0.5, {alpha:0, delay:-1, ease:Linear.easeNone})
        				.to($('.menu_wrap'), 0.5, {alpha:1})
        				.to($('#line_menu'), 1, {width: r_line, delay: -0.3})
        				.to($('.background-wrap'), 1, {alpha:1, delay: -0.5, onComplete: function(){
        					$('.play_btn').show();
        				}})
        				.to($('.lang'), 0.5, {x:kw, y:kh, scale:0.6})
        				.to($('.lang'), 0.5, {alpha:1})

            $('.logos').css('cursor','pointer');                        
            $('#puls').css('display','none');                        
        }
        else if(!annot_active && fl) {
        	var menuLineMove = new TweenMax.to($('#line_menu'), 1, {width: r_line})
        	if(active_slide==5){
        		var prW;

	       		if(activeLang == 'rus') prW = 300;
	       			else if(activeLang == 'en') prW = 320;
	       				else prW = 260;
        	// console.log('слайд = ', active_slide, prW);
        		var titleLineMOve = new TweenMax.to($('.line_news'), 0.5, {width: prW, delay: 0.2});
        	}
        }
    });




window.onresize = function(event){
	if(!annot_active){
			var kw = document.documentElement.clientWidth;
     		var kh = document.documentElement.clientHeight;
			kw = kw - 240;
			kh = kh - 50;
			TweenMax.to($('.lang'), 0.001, {x: 0, y: 0, onComplete:function(){
				$('.lang').css('position','absolute').css('top', kh+'px').css('left', kw+'px');
			}})
		}
		moveSlide();
};

$('.play_btn a').click(function(e){
	// console.log('стоп видео');
	e.preventDefault();
	var vidos = document.getElementById('video-bg-elem');
	vidos.paused ? vidos.play():vidos.pause();
    var vidos_blur = document.getElementById('video-bg-elem1');
    vidos_blur.paused ? vidos_blur.play():vidos_blur.pause();
});

var active_slide = 0;
var prev_slide = -1;

var slideFlag = true;

//MENU CLICK FUNC
$(".menu ul li a").on("click", function(e) {
	annot_active = false;
				e.preventDefault();
				slideFlag = true;
                $('.slider').show();

				prev_slide = active_slide;
                $('.background-wrap').hide();
				$('.play_btn').hide();
				$('.arrow').show();

				if(slideAlpha){
					slideAlpha = false;
					TweenMax.to($('.slider'), 0.5, {alpha:1})
				}
				$(".menu ul li a").removeClass('current');
				$(this).addClass('current');
        var $this = $(this);
        var id = $this.attr("data-id");
        active_slide = id;

				if(prev_slide != active_slide && active_slide != 0){
					moveSlide();
        }
});    


$('.arrow').on("click", function(e) {
	slideFlag = false;
	prev_slide = active_slide;
	
	if($(this)[0].id == 'l_arrow'){
		
		active_slide --;
		if(active_slide < 2) active_slide = 6;
	}

	if($(this)[0].id == 'r_arrow'){
		
		active_slide ++;
		if(active_slide > 6) active_slide = 2;

	}
	$(".menu ul li a").removeClass('current');
	$(".menu ul li a[data-id= '" + active_slide +"']").addClass('current');
	moveSlide();
});


function moveSlide(){

	var kw = $(window).width();
	var sh_podl5 = $('.clear_win img').outerWidth();
	// console.log('ширина екрана11 = ', kw, sh_podl5);

	if(sh_podl5 > kw){
		sh_podl5 = kw *.95;
		$('.clear_win img').css('width', sh_podl5);
	}

	// console.log('ширина екрана', kw, sh_podl5);
	
	var w_podl5 = $('.clear_win').outerHeight();

	var widthScr_win = $('.scroll_window').outerWidth();
	var heightScr = $('.scroll_window').outerHeight();


	var topPos = $('.scroll_window').position().top*0.85 + 22;
	var sm = (sh_podl5-widthScr_win)/2;

	$('.blur_win').css('width', sh_podl5*0.8+'px').css('height', w_podl5*0.8+'px').css('top', topPos+'px');
	$('#blur_img').css('width', sh_podl5+'px').css('left', -sm + 'px').css('top', -topPos+'px');


	$('.blur_win').css('width', widthScr_win+'px').css('height', heightScr).css('margin-left', -widthScr_win/2+'px').css('left','50%')




        if(active_slide<5){
        var pageTL = new TimelineMax();
                    pageTL
                        .fromTo($('#slide'+active_slide).find('.line_vertical'),.4, {y:300, height: 0}, {height: 300, y: 0, delay: 0.5, ease:Linear.easeNone})
                        .fromTo($('#slide'+active_slide).find('.line_gorizontal'),.4, {width:0}, {width: 400, delay: -0.2, ease:Linear.easeNone})
                        .fromTo($('#slide'+active_slide).find('.text_block'),1, {alpha:0, x:50}, {x:0, alpha:1, delay: -0.2})
        } else if(active_slide==5){
       		var prW;

       		if(activeLang == 'rus') prW = 300;
       			else if(activeLang == 'en') prW = 320;
       				else prW = 260;

        	$("#slider").slider("values", 0, 100);

            var sliderHeight = document.getElementById('page_five').offsetHeight*0.95;
            var scale_winscroll = new TimelineMax();
                   scale_winscroll.fromTo($('.line_news'), 0.5,{width:0},{width: prW, delay: 0.8})
                   				.fromTo($('.h1_news_title'), 0.5,{alpha:0, y:10},{y:0, alpha: 1, delay: -0.2})
                   				.fromTo($('.scroll_window'), 1, {scale:0.001, alpha:0}, {alpha:1, scale: 1, delay: -0.8})
                   				.fromTo($('.blur_win'), 1, {alpha:0}, {alpha: 1, delay: -0.8})
                   				.fromTo($('#scroll_win_wrap'), 1, {y:500}, {y:0, delay: -0.8})
                                .fromTo($('#slider'), 1, {top: sliderHeight/2, height:0, alpha:0}, {top:5, alpha:1, height: sliderHeight, delay: -1.2}) 
        } else if(active_slide==6){
            
            
            var inpW1 = $('.form').outerWidth();
            var inpW = inpW1*.45;

            var x1 = 0;
            var x2 = inpW1-inpW;

            // console.log('ширина ',inpW)

            var slide6TL = new TimelineMax();

            slide6TL.fromTo($('.line_name'), 0.5, {left:x1, width:0}, {width: inpW, delay: 0.5})
            		.fromTo($('.line_mail'), 0.5, {left:x2, width:0}, {width: inpW, delay: -0.5})
            		.fromTo($('.line_tema'), 0.5, {width:0}, {width: inpW1, delay: -0.5})
            		.fromTo($('.line_txt'), 0.5, {width:0}, {width: inpW1, delay: -0.5})

            		.fromTo($('.inp1'), 0.5, {alpha:0}, {alpha:1, delay: -0.2})
            		.fromTo($('.inp2'), 0.5, {alpha:0}, {alpha:1, delay: -0.2})
            		.fromTo($('.input_long'), 0.5, {alpha:0}, {alpha:1, delay: -0.2})
            		.fromTo($('textarea'), 0.5, {alpha:0}, {alpha:1, delay: -0.2})
            		.fromTo($('.button'), 0.5, {alpha:0}, {alpha:1, delay: -0.2})


        }
        
	$('#slide'+active_slide).css('z-index','1');
	$('#slide'+prev_slide).css('z-index','0');


    	if(slideFlag || (prev_slide < active_slide && !(prev_slide == 2 && active_slide ==6)) || (prev_slide == 6 && active_slide==2)){
    		// перейшли из меню
    		// console.log('правая стрелка')
    		TweenMax.to($('#slide'+active_slide),0.002,{left:kw, onComplete: function(){
	        	TweenMax.to($('#slide'+active_slide),0.45,{left:0});
	        	TweenMax.to($('#slide'+prev_slide),0.5,{left:-kw});
	    	}});
    	}
    	else{
    		// перешли по стрелкам слайдера
    		if((prev_slide > active_slide) || (prev_slide == 2 && active_slide==6)){
    			// console.log('левая стрелка')
    			TweenMax.to($('#slide'+active_slide),0.002,{left:-kw, onComplete: function(){
		        	TweenMax.to($('#slide'+active_slide),0.45,{left:0});
		        	TweenMax.to($('#slide'+prev_slide),0.5,{left:kw});
		    	}});
    		}

    	}

}

//PRESS PAGE - SHOW POPUP WITH IMAGE  
$(".img_news").on("click", function(e) {
        e.preventDefault();
        $(".popup_news").toggle();
        $('.details_big').html('<img src=' + this.src + ' class="img_big">');
    });

$(".popup_news").on("click", function(e) {
        $(".popup_news").toggle();
    });



var value = 0;
var h_scroll = 0;
$("#slider").on( "slide", function get_value( event, ui ) {
    value = 100-ui.values[0];
    var win_height = $('#scroll_win').outerHeight();
    var wrap_height = $('#scroll_win_wrap').outerHeight();
    h_scroll = (wrap_height - win_height + 80)*value/100;
    var tween_scroll = new TweenMax.to($('#scroll_win_wrap'), 0.2, {y: -h_scroll}); 

} );


document.getElementById('scroll_win').onwheel = function(e){
 h_scroll +=  e.deltaY;
 if(h_scroll<0) h_scroll = 0;
 
 var win_height = $('#scroll_win').outerHeight();
    var wrap_height = $('#scroll_win_wrap').outerHeight();



 if(h_scroll> (wrap_height - win_height)) h_scroll = wrap_height - win_height + 80;

 var sl_value = 100-h_scroll/(wrap_height - win_height + 80)*100;


 $("#slider").slider("values", 0, Math.floor(sl_value));

 var tween_scroll = new TweenMax.to($('#scroll_win_wrap'), 0.2, {y: -h_scroll, ease:Linear.easeNone}); 
};


  $("#slider").slider({
    orientation: "vertical",
    animate: "fast",
    min: 0, 
    max: 100, 
    values: [100], 
  });

 
 $('form').submit(function(e) {
        e.preventDefault();
        $('form').find('input[type="text"]').trigger('red');
        $('form').find('textarea').trigger('blur');
        if (!$(this).find('input[type="text"]').hasClass('error_input') && !$(this).find('textarea').hasClass('error_input')) {
            var type = $(this).attr('method');
            var url = $(this).attr('action');
            var lang = $(this).attr('value');
            var data = $(this).serialize();
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function() {
                    if(lang =='rus'){
                        $("#popup_eng").show();
                    }
                    if(lang =='eng'){
                       $("#popup_rus").show();
                    }
                    if(lang =='ch'){
                       $("#popup_china").show();
                    }
                }
            });
        }
        $(this).trigger("reset");
    });

// Popup window for success step 
$(".popup_success").click(function(){
        $(".popup_success").hide();
    }); 




});