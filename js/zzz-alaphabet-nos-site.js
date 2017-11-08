var triAlphaa = $('.tri-alpha-box-nossites').offset();
var bougeboxnossite = $('#container-box-nossites').offset();


$(window).scroll(function(){
        if($(window).scrollTop() > triAlphaa.top){
		      $('.tri-alpha-box-nossites').css('position','fixed').css('top','0');
              $('.tri-alpha-box-nossites').css('position','fixed').css('margin-top','70px');
			  $('#container-box-nossites').css('margin-left','3%');
        } else {
            $('.tri-alpha-box-nossites').css('position','static').css('margin-top','0px');
            $('#container-box-nossites').css('margin-left','0');
        }    
});