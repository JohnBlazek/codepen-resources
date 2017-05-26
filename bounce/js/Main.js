// global vars
var w = window;
var d = document;
var body = document.body,
    html = document.documentElement;

// javascript document height
var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

// element vars
var pageWrapper 	= document.getElementById('pageWrapper');
var wrapper 		= document.getElementById('wrapper');
var bkg 			= document.getElementById('bkg');
var bkgBlur 		= document.getElementById('bkgBlur');
var content 		= document.getElementById('content');
var title 			= document.getElementById('title');

// changeable variables
var maxBlur 		= 10; // maximum amount of blur
var stopBlur = .25;// stop at the half way point of the doc
var mobileMultiplier = .5;
var desktopMultiplier = .35;
var offset = 1;

// iScroll variable
var iScroll;

// return true if on a device
function getDevice()
{
	var check = false;
	(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;	
}

function init()
{
	TweenLite.set( bkg, { transformOrigin:'50% 0'  } );
	TweenLite.set( bkgBlur, { '-webkit-filter': 'blur(8px) contrast(2)', transformOrigin:'50% 0'  } );
	bkg.style.left = -maxBlur + 'px';
	bkgBlur.style.left = -maxBlur + 'px';

	pageWrapper.style.width =  (w.innerWidth + (maxBlur * 2)) ;

	if ( getDevice() )
	{
		pageWrapper.style.height = w.innerHeight + 'px';
		pageWrapper.style.overflow = 'hidden';
		wrapper.style.overflow = 'hidden';

		iScroll = new IScroll('#pageWrapper', { scrollbars:true });
	}	
}


resizer = function()
{
	// resize the full screen page objects
	
	bkg.style.height = (w.innerHeight * offset) + 'px';
	bkg.style.width = (w.innerWidth + (maxBlur * 2)) + 'px';
	
	bkgBlur.style.height = (w.innerHeight * offset) + 'px';
	bkgBlur.style.width = (w.innerWidth + (maxBlur * 2)) + 'px';
	
	title.style.top = (w.innerHeight * offset - title.offsetHeight) + 'px';
	content.style.top = (Number(w.innerHeight * offset) ) + 'px';

	height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

	pageWrapper.style.width =  (w.innerWidth + (maxBlur * 2)) ;
	
	if ( getDevice() )
	{
		pageWrapper.style.height = w.innerHeight + 'px';	
		if ( iScroll ) iScroll.refresh();
	};	
};

scrollr = function()
{
	// get the Y property of the scroller
	
	var $y = pageYOffset;

	if ( getDevice() )
	{
		var $ny = wrapper.style.webkitTransform.split(',')[1];
		$y = -$ny.split('px')[0]// get the Y property from iScroll
	}

	// set the opacity of the blurred layer based off the position of the 
	var $o = ($y / (height - w.innerHeight))/stopBlur
	
	// fade in the blurred filter
	if ( $o >= 1 ) $o = 1;
	TweenLite.to( bkgBlur, 1, { autoAlpha:$o, ease:Quint.easeOut } );
	 
	 console.log( $o )
	 
	// overscrolling 
	 
	if ( $y < 0 ) 
	{
		TweenLite.to( bkg, .15, { scale: 1 + ($y * -.005), ease:Expo.easeOut } );
		TweenLite.to( bkgBlur, .15, { scale: 1 + ($y * -.005), ease:Expo.easeOut } );
	}
	else 
	{	
		TweenLite.to( bkg, .25, { scale: 1, ease:Expo.easeOut } );
		TweenLite.to( bkgBlur, .25, { scale: 1, ease:Expo.easeOut } );
	}

	// parallax

	if ( getDevice() )
	{	
		TweenLite.to( bkg, .75, { top: $y * .5, ease:Quint.easeOut } )
		TweenLite.to( bkgBlur, .75, { top: $y * .5, ease:Quint.easeOut } )
	}
	else 
	{	
		TweenLite.set( bkg,  { top: $y * -.25 } )
		TweenLite.set( bkgBlur,  { top: $y * -.25 } )
	}	
	
}




w.onresize = resizer;
if ( !getDevice() ) w.onscroll = scrollr;
else setInterval( scrollr, 1000/60 )
resizer();

init();






