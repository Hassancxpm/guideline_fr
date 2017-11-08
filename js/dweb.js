$( document ).ready(function() {

 var k = [68, 87, 69, 66],
 n = 0;
 $(document).keydown(function (e) {
    if (e.keyCode === k[n++]) {
        if (n === k.length) {
            alert('Dweb mode activé !');
			$('body').fadeOut(200);
            $("<audio loop></audio>").attr({
    			/*'src':'http://jay.mobile9.com/download/media/3/yeahboy-sh_2TWzhF8c.mp3'*/ 'src':'/theme/guidelines_desktop/mp3/pokefluted.mp3' ,
   		 		'autoplay':'autoplay'
			}).appendTo("body");
			$('img').attr('src', 'http://i1.kym-cdn.com/photos/images/original/000/032/802/ninja-dance.gif');
            $('#zone1').css('background-image', "url('https://index.co/uploads/lists/a981c586ee454b2f0210d64d013870dab46332c8.jpeg')");
			$('body').fadeIn(2000);
            n = 0;
            return false;
        }
    }
    else {
        n = 0;
    }
 });

 var z = [72, 65, 83, 83, 65, 78],
 v = 0;
 $(document).keydown(function (e) {
    if (e.keyCode === z[v++]) {
        if (v === z.length) {
            alert('Hassan mode activé !');
		$("<a class='popup' href='/theme/guidelines_desktop/mp4/dance.mp4'>video</a>").appendTo("body");	
                   $('.popup').magnificPopup({
                     type: 'iframe',
                     mainClass: 'mfp-fade',
                     removalDelay: 160,
                     preloader: false,
                     fixedContentPos: false,
                     iframe: {
                     markup: '<div class="mfp-iframe-scaler">'+
                     '<div class="mfp-close"></div>'+
                     '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                     '</div>',

                     srcAction: 'iframe_src',
                     }
                   }).click();
            v = 0;
            return false;
        }
    }
    else {
        v = 0;
    }
 });
});