jQuery(window).on('load resize', function(){  
  var roomwidthorg   = jQuery(this).width()  * 0.954;
  var roomheightorg  = jQuery(this).height() * 572/590;
  var roomheight     = roomheightorg * 572/590; 
  var roomwidth      = roomwidthorg * 0.954;
  var roommarginleft = roomwidthorg * 0.035;
  var roommargintop  = ((18*roomwidthorg)/1140);
  console.log(roomwidthorg);
  // if (roomheight == 0)
  // {
  //   roomwidthorg   = jQuery(this).width();
  //   console.log(roomwidthorg);
  //   roomheightorg  = jQuery(this).height();
  //   roomheight     = roomheightorg * 572/590; 
  //   roomwidth      = roomwidthorg * 0.954;
  //   roommarginleft = roomwidthorg * 0.035;
  //   roommargintop  = ((18*roomwidthorg)/1140);
  // }


  function setDimensions(element_id, roomwidth, roomheight, roommargintop, roommarginleft) {
      let element = document.getElementById(element_id);

      element.style.width      = roomwidth + "px";
      element.style.height     = roomheight + "px";
      element.style.marginTop  = roommargintop + "px";
      element.style.marginLeft = roommarginleft + "px"; 
  }
  setDimensions("CLASS2", roomwidth, roomheight, roommargintop, roommarginleft);
  setDimensions("CLASS3", roomwidth, roomheight, roommargintop, roommarginleft);
  setDimensions("CLASS4", roomwidth, roomheight, roommargintop, roommarginleft);
  setDimensions("layershape", roomwidth, roomheight, roommargintop, roommarginleft);
  setDimensions("threeDlayerpreview", roomwidth, roomheight, roommargintop, roommarginleft);
  setDimensions("texturelayerpreview", roomwidth, roomheight, roommargintop, roommarginleft);
  setDimensions("texturelayerpreview2", roomwidth, roomheight, roommargintop, roommarginleft);
  setDimensions("aginglayerpreview", roomwidth, roomheight, roommargintop, roommarginleft);
  setDimensions("room1", roomwidth, roomheight, roommargintop, roommarginleft);
  setDimensions("room1image", roomwidth, roomheight, roommargintop, roommarginleft);
  
  	
  vpatternscale = roomheight * 150/572;
  vpatternscale = parseInt(vpatternscale);
  vpatternscale = vpatternscale + "px" + " " + vpatternscale + "px";


  document.getElementById("CLASS2").style.backgroundSize               = vpatternscale;
  document.getElementById("CLASS3").style.backgroundSize               = vpatternscale;
  document.getElementById("CLASS4").style.backgroundSize               = vpatternscale;
  document.getElementById("layershape").style.backgroundSize           = vpatternscale;
  document.getElementById("texturelayerpreview2").style.backgroundSize = vpatternscale;
  document.getElementById("threeDlayerpreview").style.backgroundSize   = vpatternscale;  
});