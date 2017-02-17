var walk,
    left,
    right;
var walkSpeed = 20;
var turnSpeed = Math.PI*(5/180);
//$('#walk').mousedown(mouseStateWalk).mouseup(mouseStateWalk);
//$('#left').mousedown(mouseStateLeft).mouseup(mouseStateLeft);
//$('#right').mousedown(mouseStateRight).mouseup(mouseStateRight);
function mouseStateWalk(e) {
  if (e.type == "mouseup") {
    clearInterval(walk);
    if(clap)clap.rotation.y = 0;
  	if(foot)foot.rotation.y = 0;foot.rotation.x = 0;
  }
  if (e.type == "mousedown") {
    walk = setInterval(function(){
  	  camera.position.z -= Math.cos(camera.rotation.y)*10;
  	  camera.position.x -= Math.sin(camera.rotation.y)*10;
  	  if(clap)clap.rotation.y += Math.PI/2;
  	  if(foot)foot.rotation.y -= Math.PI/2;
  	  
      console.log('a');
    }, 100);
  }
}
function mouseStateLeft(e) {
  if (e.type == "mouseup") {
    clearInterval(left);
  }
  if (e.type == "mousedown") {
    left = setInterval(function(){
  	  camera.rotation.y += turnSpeed;
      console.log('l');
    }, 100);
  }
}

function mouseStateRight(e) {
  if (e.type == "mouseup") {
    clearInterval(right);
  }
  if (e.type == "mousedown") {
    right = setInterval(function(){
    	camera.rotation.y -= turnSpeed;
      console.log('a');
    }, 100);
  }
}
/*keyBoardEvent*/
window.addEventListener('keydown',function(e){
	if(e.keyCode == 87){
      camera.position.z -= Math.cos(camera.rotation.y)*10;
  	  camera.position.x -= Math.sin(camera.rotation.y)*10;
  	  if(clap)clap.rotation.y += Math.PI/2;
  	  if(foot)foot.rotation.y -= Math.PI/2;
	}
	if(e.keyCode == 83){
	  camera.position.z += Math.cos(camera.rotation.y)*10;
  	  camera.position.x += Math.sin(camera.rotation.y)*10;
  	  if(clap)clap.rotation.y += Math.PI/2;
  	  if(foot)foot.rotation.y -= Math.PI/2;
	}
	if(e.keyCode == 65){
	  camera.rotation.y += turnSpeed;
	}
	if(e.keyCode == 68){
	  camera.rotation.y -= turnSpeed;
	}
})
/*touchEvent*/
touch.on('#walk','touchstart',function(){
	$('#walk').css({'opacity':'1'});
	walk = setInterval(function(){
  	  camera.position.z -= Math.cos(camera.rotation.y)*10;
  	  camera.position.x -= Math.sin(camera.rotation.y)*10;
  	  if(clap)clap.rotation.y += Math.PI/2;
  	  if(foot)foot.rotation.y -= Math.PI/2;
    },16.6);
});
touch.on('#walk','touchend',function(){
	$('#walk').css({'opacity':'0.6'});
	clearInterval(walk);
    if(clap)clap.rotation.y = 0;
  	if(foot)foot.rotation.y = 0;foot.rotation.x = 0;
});


touch.on('#left','touchstart',function(){
	$('#left').css({'opacity':'1'});
	left = setInterval(function(){
  	  camera.rotation.y += turnSpeed;
      console.log('l');
    }, 100);
});
touch.on('#left','touchend',function(){
	$('#left').css({'opacity':'0.6'});
	clearInterval(left);
});

touch.on('#right','touchstart',function(){
	$('#right').css({'opacity':'1'});
	right = setInterval(function(){
  	  camera.rotation.y -= turnSpeed;
    }, 100);
});
touch.on('#right','touchend',function(){
	$('#right').css({'opacity':'0.6'});
	clearInterval(right);
});
touch.on('#x','touchstart',function(){
	$('#tips').css({'display':'none'});
});
touch.on('#github','touchstart',function(){
	window.open('https://github.com/johanzhu/goldinsand');
});
window.ontouchstart = function(e) { e.preventDefault(); };