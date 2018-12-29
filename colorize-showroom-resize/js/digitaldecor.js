/* blp_getInBetween */
// ----------------------------------------------------------------------------------------
// anything below should have the new convention blp_  
// example: blp_isSafari blp_getInBetween  blp_inStr   blp_leftOf .... 
// the rule is start with "blp_" and then follow js naming styles ( pascalCase )
// ----------------------------------------------------------------------------------------
// detect various browsers
// ----------------------------------------------------------------------------------------

//----------------------------------------------------
// not sure where these are being used, somebody made a mistake -_-
// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var _isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var _isFirefox = typeof InstallTrigger !== 'undefined';   
// At least Safari 3+: "[object HTMLElementConstructor]"
var _isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// Chrome 1+
var _isChrome = !!window.chrome && !_isOpera;
// At least IE6
var _isIE = /*@cc_on!@*/false || !!document.documentMode; 
// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var blp_isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var blp_isFirefox = typeof InstallTrigger !== 'undefined';
// At least Safari 3+: "[object HTMLElementConstructor]"
var blp_isSafari =  /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
// Internet Explorer 6-11
var blp_isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
var blp_isEdge = !blp_isIE && !!window.StyleMedia;
// Chrome 1+
var blp_isChrome = !!window.chrome && !!window.chrome.webstore;

var console_log_debug_messages_are_on = true;
// Blink engine detection
// blp_isSafari is first used by the overwriting-scripts.js and also in cells like cell_team.php and also in functions.php's blp_wrap's title area
// ----------------------------------------------------------------------------------------

function blp_getDivScrollTop( el ) {
	//used when window.scrollTop does not work or yields 0.
	for (var pos=[0,0];el;el=el.offsetParent){
		pos[1] +=  el.offsetTop-el.scrollTop;
	}
	return -1 * pos[1]; 
} // see overwriting-scripts.js for a fair usage

/* wrapper */
function blp_getInBetween(sContents, sBeginningKey, sEndingKey) {
	return blp_get_in_between(sContents, sBeginningKey, sEndingKey);
}	

/* wrapper */
function blp_getInBetween(sContents, sBeginningKey, sEndingKey) {
	return blp_get_in_between(sContents, sBeginningKey, sEndingKey);
}	

function clearLocalStorageCache(){
  //triggered by the login/logout links ( see dashboard->appearances->widgets->header sidebar 2nd and 5th text widgets
  if(hasStorageSupport()) {
    window.localStorage.setItem("localStorageCache",'' ); //
  } else {
    alert('clearLocalStorageCache: none HTML5 browser. No local Storage support. cannot set cache');
    console.error ('none HTML5 browser. No local Storage support. cannot set cache');
    return '';
  }
}

function getLocalStorageCache(){
  if( hasStorageSupport() ) 
  {
    var cacheMaybe = window.localStorage.localStorageCache;
    if ( ! cacheMaybe ) {
      console.info ('getLocalStorageCache: localStorage is supported but it has nothing for cache');
      return '';
    } else {
      return cacheMaybe;
    }
  } 
  else 
  {
    return '';
  }
}

function setLocalStorageCache(localStorageCache){
  if(hasStorageSupport()) {
    window.localStorage.setItem("localStorageCache",localStorageCache ); //
  } else {
    alert('setLocalStorageCache: none HTML5 browser. No local Storage support. cannot set cache');
    console.error ('none HTML5 browser. No local Storage support. cannot set cache');
    return '';
  }
}

function hasStorageSupport(){
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
}

///-------------------------------------------------

function setSessionCookie(cname, cvalue) {

  var d = new Date();

  var expires = "expires=0";

  document.cookie = cname + "=" + cvalue + "; " + expires;

}

function getSessionCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');

  for ( var i = 0; i < ca.length; i++ ) {
    var c = ca[i];

    while (c.charAt(0)==' ') c = c.substring(1);

    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }

  return "";
}

//library functions - these evnetually should go into javascript library
function isMobile(forcedCase) {
  // returns true or false depending on the client.
  // console.info('navigator.userAgent:' + navigator.userAgent);
  // sample: navigator.userAgent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36
  // alert('ismobile reports... ' + navigator.userAgent);
  if( navigator.userAgent.match(/Android/i)

      || navigator.userAgent.match(/webOS/i)

      || navigator.userAgent.match(/iPhone/i)

      || navigator.userAgent.match(/iPad/i)

      || navigator.userAgent.match(/iPod/i)

      || navigator.userAgent.match(/BlackBerry/i)

      || navigator.userAgent.match(/Windows Phone/i)

  ){
      return true;
  } else {
      return false;
  }

}

function blp_how_many(input_str,search_str){
  //counts the occurances of the search string in input - case insensitive
  // returns 0 if no match.
  return input_str.split( new RegExp( search_str, "gi" ) ).length-1;
}

function blp_get_in_between(sContents, sBeginningKey, sEndingKey) {
    var sText                 = sContents,
        vbTextCompare         = true;

    var iBeginningKeyStartsAt = blp_instr(1, sContents, sBeginningKey, vbTextCompare),
        sEndingKeyStartsAt    = blp_instr(1, sContents, sEndingKey, vbTextCompare);
    
    var sCapturedResult = "";

    if (iBeginningKeyStartsAt > 0 && sEndingKeyStartsAt > 0) {
      sText = blp_right(sText, (blp_len(sText) - (iBeginningKeyStartsAt + (blp_len(sBeginningKey) - 1))));
      sText = blp_left(sText, (blp_instr(1, sText, sEndingKey, vbTextCompare) - 1));
      
      sCapturedResult = sText == "" ? "" : sText;
    }

    return sCapturedResult;
}

function blp_contains(lrgstring,smstring)  {
  return blp_instr(1,lrgstring,smstring,true ) >= 1 ? true : false;
}

function blp_instr(iStartingFrom,lrgstring,smstring,bolNotCaseSensitive) {
  lrgstring=lrgstring.substring(iStartingFrom-1,lrgstring.length)
  if ( bolNotCaseSensitive ) {
      lrgstring=lrgstring.toLowerCase();
      smstring=smstring.toLowerCase();
  }
  // this function has a bug, when the searched word is found at the beginning of the large word , it returns 0!..
  // following fix is just for that !...
  if ( smstring == lrgstring.substring(0,smstring.length) ) {
      //set foundat to 1 and return immediately since smstring is found at the beginning of the lrgstring already !...
      foundat=1;
      return foundat;
  }
  strlen1 = smstring.length;
  strlen2 = lrgstring.length;

  foundat = 0

  for (i=0;i<=strlen2;i++) {
    comp=lrgstring.substring(i-1,strlen2);
    comp = comp.substring(0,strlen1);
    if (comp == smstring) {
        foundat = i;
        break;
    }
  }

  return (iStartingFrom != 1) ? foundat-(iStartingFrom-1) : foundat;
}

function blp_len(str) {
  return String(str).length;
}

function blp_left_of(lrgstring,smstring) {
  if (smstring == "") {smstring = " "}

  strlen1 = smstring.length;
  strlen2 = lrgstring.length;
  foundat = 0;

  for (i=0;i<=strlen2;i++) {
      comp=lrgstring.substring(i-1,strlen2);
      comp = comp.substring(0,strlen1);

      if (comp == smstring) {
          foundat = i;
          break;
      }
  }
  
  return lrgstring.substring(0,(foundat-1))

}

function blp_right_of(lrgstring,smstring) {
  return blp_get_in_between(lrgstring + '^@`',smstring,'^@`')
}

function blp_right(str,n) {
  strlen = str.length
  return str.substring(strlen-n,strlen)
}

function blp_trim ( input ){
  return input ? input.trim() : '';
}

function blp_left(str,n) {
  return str.substring(0,n)
}

function blp_title_case(str){
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function blp_replace(subject,search,replace){
    //does a case insensitive replacement of 'search' with the 'replace' on the 'subject'
    //uses the utility function str_ireplace (http://phpjs.org/functions/str_ireplace/)
    count = 0;
    return str_ireplace(search, replace, subject, count)
}

function str_ireplace(search, replace, subject, count) {
  //  discuss at: http://phpjs.org/functions/str_ireplace/
  //  original by: Glen Arason (http://CanadianDomainRegistry.ca)

  //        note: Case-insensitive version of str_replace()
  //        note: Compliant with PHP 5.0 str_ireplace() Full details at:
  //        note: http://ca3.php.net/manual/en/function.str-ireplace.php
  //        note: The count parameter (optional) if used must be passed in as a
  //        note: string. eg global var MyCount:
  //        note: str_ireplace($search, $replace, $subject, 'MyCount');

  //      format: str_ireplace($search, $replace, $subject[, 'count'])
  //      input:  str_ireplace($search, $replace, $subject[, {string}]);
  var i     = 0,
      j     = 0,
      temp  = '',
      repl  = '',
      sl    = 0,
      fl    = 0,
      f     = '',
      r     = '',
      s     = '',
      ra    = '',
      sa    = '',
      otemp = '',
      oi    = '',
      ofjl  = '',
      os    = subject,
      osa   = Object.prototype.toString.call(os) === '[object Array]';

  if (typeof (search) === 'object') {
    temp   = search;
    search = new Array();
    for (i = 0; i < temp.length; i += 1) {
      search[i] = temp[i].toLowerCase();
    }
  } else {
    search = search.toLowerCase();
  }

  if (typeof (subject) === 'object') 
  {
    temp = subject;
    subject = new Array();
    for (i = 0; i < temp.length; i += 1) {
      subject[i] = temp[i].toLowerCase();
    }

  } else {
    subject = subject.toLowerCase();
  }

  if (typeof (search) === 'object' && typeof (replace) === 'string') {
    temp = replace;
    replace = new Array();

    for (i = 0; i < search.length; i += 1) {
      replace[i] = temp;
    }
  }

  temp = '';

  f = [].concat(search);

  r = [].concat(replace);

  ra = Object.prototype.toString.call(r) === '[object Array]';

  s = subject;

  sa = Object.prototype.toString.call(s) === '[object Array]';

  s = [].concat(s);

  os = [].concat(os);

  if (count) {
    this.window[count] = 0;
  }

  for (i = 0, sl = s.length; i < sl; i++) {

    if (s[i] === '') {

      continue;

    }

    for (j = 0, fl = f.length; j < fl; j++) {
      temp  = s[i] + '';
      repl  = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
      s[i]  = (temp).split(f[j]).join(repl);
      otemp = os[i] + '';
      oi    = temp.indexOf(f[j]);
      ofjl  = f[j].length;

      if (oi >= 0) {
        os[i] = (otemp).split(otemp.substr(oi, ofjl)).join(repl);
      }

      if (count) {
        this.window[count] += ((temp.split(f[j])).length - 1);
      }
    }
  }

  return osa ? os : os[0];
}


function blp_replace(subject, search, replace) {
    return str_replace(search, replace, subject, 0);
}



function str_replace(search, replace, subject, count) {
  //  discuss at: http://phpjs.org/functions/str_replace/
  
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  
  // improved by: Gabriel Paderni

  // improved by: Philip Peterson

  // improved by: Simon Willison (http://simonwillison.net)

  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

  // improved by: Onno Marsman

  // improved by: Brett Zamir (http://brett-zamir.me)

  //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)

  // bugfixed by: Anton Ongson

  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

  // bugfixed by: Oleg Eremeev

  // bugfixed by: Glen Arason (http://CanadianDomainRegistry.ca)

  // bugfixed by: Glen Arason (http://CanadianDomainRegistry.ca) Corrected count

  //    input by: Onno Marsman

  //    input by: Brett Zamir (http://brett-zamir.me)

  //    input by: Oleg Eremeev

  //        note: The count parameter must be passed as a string in order

  //        note: to find a global variable in which the result will be given

  //   example 1: str_replace(' ', '.', 'Kevin van Zonneveld');

  //   returns 1: 'Kevin.van.Zonneveld'

  //   example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');

  //   returns 2: 'hemmo, mars'

  //   example 3: str_replace(Array('S','F'),'x','ASDFASDF');

  //   returns 3: 'AxDxAxDx'

  //   example 4: str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , 'cnt');

  //   returns 4: 'xSyFxSyF' // cnt = 0 (incorrect before fix)

  //   returns 4: 'xSyFxSyF' // cnt = 4 (correct after fix)



  var i = 0,

    j = 0,

    temp = '',

    repl = '',

    sl = 0,

    fl = 0,

    f = [].concat(search),

    r = [].concat(replace),

    s = subject,

    ra = Object.prototype.toString.call(r) === '[object Array]',

    sa = Object.prototype.toString.call(s) === '[object Array]';

  s = [].concat(s);



  if (typeof (search) === 'object' && typeof (replace) === 'string') {

    temp = replace;

    replace = new Array();

    for (i = 0; i < search.length; i += 1) {

      replace[i] = temp;

    }

    temp = '';

    r = [].concat(replace);

    ra = Object.prototype.toString.call(r) === '[object Array]';

  }



  if (count) {

    this.window[count] = 0;

  }



  for (i = 0, sl = s.length; i < sl; i++) {

    if (s[i] === '') {

      continue;

    }

    for (j = 0, fl = f.length; j < fl; j++) {

      temp = s[i] + '';

      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];

      s[i] = (temp)

        .split(f[j])

        .join(repl);

      if (count) {

        this.window[count] += ((temp.split(f[j]))

          .length - 1);

      }

    }

  }

  return sa ? s : s[0];

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

/*******************************************************************************************
 * 
 *                        DIGITAL DECOR FEATURES START HERE
 * 
 * ******************************************************************************************
 */


/**
 *  Changes the pattern scale caption and grabs the following elements by id:
 * @param tmcp_range_7 = patternscale
 * @param gpercent     = patternscale percentage
 * @param ginch        = 
 */
function changePatternScaleCaption()
{
  var gpercent = document.getElementById("tmcp_range_7").value; 
  document.getElementById("gpercent").innerHTML = gpercent;

	ginch = (gpercent * 0.20) ;
	ginch = Math.round((ginch + 0.00001) * 100) / 100 ;	

	document.getElementById("ginch").innerHTML = ginch;
}

// Get share URL  With Social media;
function GetShareurl() {
	var str = "<a href=\"mailto:?Subject=Digitaldecor&amp;Body=I%20saw%20this%20design%20on digitaldecor.com%20and%20thought%20you%20might%20like%20it !: %20 ~replace~\"><img src=\"/devdigitaldecor/wp-content/uploads/images/email.png\" alt=\"Email\" /></a><a href=\"http://www.facebook.com/sharer.php?u=~replace~\" target=\"_blank\"><img src=\"/devdigitaldecor/wp-content/uploads/images/facebook.png\" alt=\"Facebook\" /></a>";
  str = str + "<a href=\"https://twitter.com/share?url=~replace~&text=digitaldecor&hashtags=digitaldecor\" target=\"_blank\"><img src=\"/devdigitaldecor/wp-content/uploads/images/twitter.png\" alt=\"Twitter\" /></a>";
  str = str + "<a href=\"https://plus.google.com/share?url=~replace~\" target=\"_blank\"><img src=\"/devdigitaldecor/wp-content/uploads/images/google.png\" alt=\"Google\" /></a>"; 
  str = str + "<a href=\"/add-a-design/?design-url=~replace1~\" target=\"_blank\"><img src=\"/devdigitaldecor/wp-content/uploads/images/bookmark.png\" alt=\"Bookmark\" /></a>";

	var bgColor = document.getElementById("tmcp_textfield_1").value;
	bgColor = bgColor.replace(/#/g, '');
	
	var screenColor = document.getElementById("tmcp_textfield_2").value;
	screenColor = screenColor.replace(/#/g, '');

	var patternColor = document.getElementById("tmcp_textfield_3").value;
	patternColor = patternColor.replace(/#/g, '');

	var gaging = jQuery("#tmcp_select_4 option:selected").text();
	gaging = gaging.replace(/\s+/g, '');

	
	var Deffect = jQuery("#tmcp_select_5 option:selected").text();

	var textureeffect = jQuery("#tmcp_select_6 option:selected").text();
	textureeffect = textureeffect.replace(/\s+/g, '');

	var vpatternscale = document.getElementById("tmcp_range_7").value;

	var vdesignid = document.getElementById("designid").innerHTML;

	var url = window.location.pathname;

	url = "http://dev.digitaldecor.com" + url;
	url = url + "?color1=" + bgColor + "&color2=" + screenColor + "&color3=" + patternColor + "&aging=" + gaging + "&3d=" + Deffect + "&texture=" + textureeffect + "&patternscale=" + vpatternscale;
	
	// var url1 = encodeURI(url);
  var url1        = encodeURIComponent(url);
  var urlbookmark = url1 +  "&designid=" + vdesignid;
  var res         = str.replace(/~replace~/gi, url1);

	res = res.replace(/~replace1~/gi, urlbookmark);
  res = url + "<br>" + res;

 	document.getElementById("modal-body-new").innerHTML = res;
}                         

// Change  (Aging)	
function changeAging(jQuery)
{	
  var gtexture = document.getElementById("tmcp_select_4").value;
  var gurl = "";
  if (gtexture=="Lived-in_0") {
		gurl= "/devdigitaldecor/wp-content/uploads/products/AG_LIVEDIN.jpg" ;
	} else if (gtexture=="Water Damage_1") {
		gurl= "/devdigitaldecor/wp-content/uploads/products/AG_WATERDAMAGE.jpg" ;
	} else if (gtexture=="Antique_2") {
		gurl= "/devdigitaldecor/wp-content/uploads/products/AG_ANTIQUE.jpg" ;
	} else if (gtexture=="Ancient_3") {
		gurl= "/devdigitaldecor/wp-content/uploads/products/AG_ANCIENT.jpg" ;
  }
  document.getElementById("layeraging").style.backgroundImage = "url("+ gurl +")";
}


// Change layer2 Color - no longer needed, needs to be modified actually we can keep the name..
function changeBackgroundColor(jQuery) 
{
	var bgColor = document.getElementById("tmcp_textfield_1").value;
	var a       = document.getElementById("alphasvg");
	var svgDoc  = a.contentDocument;	
	var cls2    = svgDoc.getElementsByClassName("cls-2");

  for(i=0; i<cls2.length; i++) {
    cls2[i].style.fill=bgColor;
  }			
}

// Change layer3 Color - no longer needed, needs to be modified actually we can keep the name..
function changeScreenColor(jQuery) 
{	
	var screenColor = document.getElementById("tmcp_textfield_2").value;
  console.log("screenColor: "+screenColor);
	var a = document.getElementById("alphasvg");
	// get the inner element by id
	var svgDoc = a.contentDocument;
  var cls3 = svgDoc.getElementsByClassName("cls-3");
  console.log(cls3)
  for(i=0; i<cls3.length; i++) {
    cls3[i].style.fill=screenColor;
  }
}


// Change layer4 Color - no longer needed, needs to be modified actually we can keep the name..
function changePatternColor() 
{
	var patternColor = document.getElementById("tmcp_textfield_3").value;
	var a            = document.getElementById("alphasvg");
	var svgDoc       = a.contentDocument;	
	var cls4         = svgDoc.getElementsByClassName("cls-4");

  for(i=0; i<cls4.length; i++) {
    cls4[i].style.fill=patternColor;
  }		
}  

// Change Layer3 Opacity if needed - will be no longer used
function changeScreenOpacity() 
{	
	var screenOpacity = document.getElementById("custom-options[screenopacity]").value;
	var a             = document.getElementById("alphasvg");
	var svgDoc        = a.contentDocument;
  var cls3          = svgDoc.getElementsByClassName("cls-3");
  
  for(i=0; i<cls3.length; i++) {
    cls3[i].style.opacity=screenOpacity;
  }
}

function change3dOpacity(jQuery) 
{
	var Deffect = document.getElementById("tmcp_select_5").value;

	if (Deffect=="Half_0") {
		document.getElementById("layer3d").style.opacity = 0;
	} else if (Deffect=="On_1") {
		document.getElementById("layer3d").style.opacity = 1;
	} else  {
		document.getElementById("layer3d").style.opacity = 0;
  }  				
  
}

function changeTextureEffect()
{	
  var teffect = document.getElementById("tmcp_select_6").value;

  if (teffect=="Linen_0") {
      gurl= "/devdigitaldecor/wp-content/uploads/products/TX_LINEN.jpg" ;
  } else if (teffect=="Wood Grain_1") {
      gurl= "/devdigitaldecor/wp-content/uploads/products/TX_WOODGRAIN.jpg" ;
  } else if (teffect=="Cork_2") {
      gurl= "/devdigitaldecor/wp-content/uploads/products/TX_CORK.jpg" ;
  } else if (teffect=="Cross Hatch_4") {
      gurl= "/devdigitaldecor/wp-content/uploads/products/TX_CROSSHATCH.jpg";
  } else if (teffect=="Rock Work_3") {
      gurl= "/devdigitaldecor/wp-content/uploads/products/TX_ROCKWORK.jpg";
  } else if (teffect=="Lived In_5") {
          gurl= "/devdigitaldecor/wp-content/uploads/products/AG_LIVEDIN.jpg" ;
  } else if (teffect=="Water Damage_6") {
      gurl= "/devdigitaldecor/wp-content/uploads/products/AG_WATERDAMAGE.jpg" ;
  } else if (teffect=="Antique_7") {
      gurl= "/devdigitaldecor/wp-content/uploads/products/AG_ANTIQUE.jpg" ;
  } else  {
      gurl= "" ;
  } 

  document.getElementById("layertextureeffect").style.backgroundImage = "url("+ gurl +")";
  document.getElementById("layertextureeffect2").style.backgroundImage = "url("+ gurl +")";
}

function getQueryVariable(variable) {                   
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for ( var i = 0; i < vars.length; i++ ) {
    var pair = vars[i].split('=');
    if ( decodeURIComponent(pair[0]) == variable ) {
        return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable);
}