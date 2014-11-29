/* 
   Canvas Logo Maker by Scriptol.com  
   (c) 2012 Denis Sureau
   Mozilla Public License. 
   http://www.mozilla.org/MPL/1.1/
   Compatible GPL. All derivative work must remain under MPL.
*/

$(document).ready(function() 
{
    $('#required').hide();
    var f = $.farbtastic('#picker');
    var p = $('#picker').css('opacity', 1);
    var selected;
    $('.colorwell')
      .each(function () { f.linkTo(this); $(this).css('opacity', 0.75); })
      .focus(function() {
        if (selected) {
          $(selected).css('opacity', 0.75).removeClass('colorwell-selected');
        }
        f.linkTo(this);
        p.css('opacity', 1);
        $(selected = this).css('opacity', 1).addClass('colorwell-selected');
      });
});


var texture = "";
var textureback ="";
var texturelem=1; // background
var textcolor="rgb(0,0,0)";
var bordcolor="rgb(0,0,0)";
var backcolor="rgb(255,255,255)";

var oldtext = null;
var colorer=1;
var blureffect=2;
var transparence=false;

var NONE=0;
var BACKCROP=1;
var BACKFILL=2;
var backgroundimagemode=BACKCROP;
var backgroundimage=null;
var	backgroundimagew = 0;
var	backgroundimageh = 0;

function centrage(element)
{
	var canvas = document.getElementById("canvaslogo");
	var t = document.getElementById("logotext");
	var s = document.getElementById("fontsize").value;
	var len = new String(t).length;
	var xoffset =  (Number(len) * s / 8);
	
	var x = (canvas.width / 2) - xoffset;
	var y = (canvas.height / 2) + (s / 2);
	if(x < 0) x = 0;
	
	document.getElementById("textx").value = x;
	document.getElementById("texty").value = y;
}

function bplus(id, value, isheight)
{
	var canvas = document.getElementById("canvaslogo");
	var m = (isheight == true) ? canvas.height : canvas.width;

	var fieldval = document.getElementById(id);
	var newval = Number(fieldval.value) + Number(value);
	if(newval < 0) newval = 0;
	if(newval > (m - 10)) newval = m - 10;
	fieldval.value = String(newval);
	update();
}

function setWeight(sli)
{
	var x = sli.value;
	if(i > 10 && i < 801)
	{
	  var canvas = document.getElementById("canvaslogo"); 
	  canvas.width=x;
	  update();
	}
}

function setHeight(sli)
{
	var x = sli.value;
	if(i > 10 && i < 601)
	{
	  var canvas = document.getElementById("canvaslogo"); 
	  canvas.height=x;
	  update();
	}	
}

function transfun(cbtrans)
{
	transparence=cbtrans.checked;
	if(transparence)
	{ 	 
		update();
	}
	else
	{
		setgcol();
	}
}

function setit(element)
{
	var texturename = element.src;
	if(oldtext != null)
	{
		oldtext.style.border="2px solid white";
	}
	if(texturelem)
		textureback = texturename;
	else	
		texture = texturename;
	update();
	oldtext = element;
	element.style.border="2px solid black";
}

function invalidCol(color) { alert(color + " invalid!"); return color; }
function toRGB(color)
{
	if(color.length < 3) return invalidCol(color);
	if(color.charAt(0) == "#") color = color.slice(1);
	if(color.length==3)
	{
	   	var r = color[0];
	   	var g = color[1];
	   	var b = color[2];		
	}
	else
	if(color.length == 6)
	{
		var r = color.substr(0, 2);
		var g = color.substr(2, 2);
		var b = color.substr(4, 2);
	}
	else
		return invalidCol(color);
	r = parseInt(r, 16);
	g = parseInt(g, 16);
	b = parseInt(b, 16);		
	color = "rgb(" + r + "," + g + "," + b + ")";
	return color;
}

function setcol()
{
	var col = document.getElementById("textcolor").value;
	texture="";
	colorer=1;
	textcolor = toRGB(col);
	update();
}

function setbcol()
{
	var col = document.getElementById("bordcolor").value;
	colorer=2;
	bordcolor = toRGB(col);
	textureback="";
	update();
}

function setgcol()
{
	var col = document.getElementById("backcolor").value;
	colorer=3;
	backcolor = toRGB(col);
	update();
}

function anycol()
{
	switch(colorer)
	{
		case 2: setbcol();return;
		case 3: setgcol();return;
	}
	setcol();
}

function setblur()
{
	blureffect = new Number(document.getElementById("blureffect").value); 
	update();
}

function switchtexture(state)
{
	if(state.value == "text")	texturelem=0;
	else	texturelem=1;
}


function resize(canvas)
{
  var canvasw=document.getElementById("canvasw");
  canvas.width=canvasw.value;
  var canvash=document.getElementById("canvash");
  canvas.height=canvash.value;
}

function update()
{

  var canvas = document.getElementById("canvaslogo"); 
  ctx = canvas.getContext('2d'); 
  if (!ctx) { alert("Error"); return;}
  
  resize(canvas);
  //alert(canvas.width + " " + canvas.height);
  
	var x = document.getElementById("textx").value;
	var y = document.getElementById("texty").value;  
  

  var t = document.getElementById("logotext");
  var b = document.getElementById("bold");
  var i = document.getElementById("italic");
  var textodisplay=t.value;
  var family = "Arial"; 

  var stylestring = "";
  if(b.checked)
  {
    stylestring += " bold";
  }
  if(i.checked)
  {
    stylestring += " italic";
  }
  
  var s = document.getElementById("fontsize").value;
  if(s > 0)
  {
  	stylestring += " " + s + "px";
  }
  else
  	stylestring += " 32px";

  var f = document.getElementById("family");
  var idx=f.selectedIndex;
  var val=f.options[idx].value;
  if(val != false)
  {
	family = f.options[idx].innerHTML;  
  }	
  
  stylestring += " " + family;
  
  var color = document.getElementById("textcolor").value; 
  if(color.charAt(0) != "#") color = "#" + color;
  
  var shade = document.getElementById("shadow");
  var offset = document.getElementById("offset").value;
  var bordelem = document.getElementById("bord");
  
  x = document.getElementById("textx").value;
  
  if(transparence)
  {
	ctx.fillStyle='rgba(0, 0, 200, 0)'; // transparence
  }
  else
  {
  	if(textureback == "")	
	  ctx.fillStyle=backcolor;
  	else
  	{
  	var img = new Image();
  	img.src = textureback;
  	var ptrn = ctx.createPattern(img,'repeat');
  	ctx.fillStyle=ptrn;
  	}
  }
  ctx.fillRect(0, 0, canvas.width,canvas.height);
  if(backgroundimage != null)
  {
	switch(backgroundimagemode)
	{
	  case BACKCROP: ctx.drawImage(backgroundimage,0,0);
		  break;
	  case BACKFILL: ctx.drawImage(backgroundimage,0,0,backgroundimagew,backgroundimageh);
		  break;
	  default:break; // NONE		  
	}
  }

  if(shade.checked)
  {
	ctx.shadowColor = "rgb(64, 64, 64)";
	ctx.shadowOffsetX = offset;
	ctx.shadowOffsetY = offset;
	if(blureffect != 0)
		ctx.shadowBlur = blureffect;
   }
   else
   {
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;  
	ctx.shadowBlur=false;
   }

/*
var lingrad = ctx.createLinearGradient(0,0,0,150);
lingrad.addColorStop(0, color);
lingrad.addColorStop(0.5, '#fff');
lingrad.addColorStop(0.5, '#26C000');
lingrad.addColorStop(1, '#fff');
color = lingrad;
*/
  ctx.fillStyle=color;

  if(texture !="")
  {
  	var img = new Image();
  	img.src = texture;
  	var ptrn = ctx.createPattern(img,'repeat');
  	ctx.fillStyle=ptrn;
  }
  else
  {
  	ctx.fillStyle=textcolor;  
  } 	

  ctx.beginPath();
  ctx.font=stylestring;
  if(bordelem.checked)
  {
	var bordsize=document.getElementById("bordsize").value;	
	ctx.lineWidth=bordsize;
    ctx.strokeStyle=bordcolor;
	var bordx=new Number(document.getElementById("bordx").value);
	var bordy=new Number(document.getElementById("bordy").value);
	bordx += new Number(x);
	bordy += new Number(y);
	ctx.strokeText(textodisplay, bordx, bordy);
  }

  ctx.fillText(textodisplay, x, y);  
  
}

// format ex: "image/png"

function putImage(format)
{
	var ctximg = canvas.toDataURL(format);
	var img = new Image();
	img.src = ctximg;
	img.onload = function ()
	{
    	canvas.width = 400;
		canvas.height = 600;
	    ctx.drawImage(img, 0, 0);
	}	
}

function addToGallery()
{
	var canvas = document.getElementById("canvaslogo");
	var theimage=canvas.toDataURL("image/png");
	var imageElement = new Image();  // Get the img object.
	imageElement.src = theimage; 
	var stor=document.getElementById("gallery");
	//stor.innerHTML += "<div class='galitem'><img src='"+ theimage+"'>" + "</div>";
	
	var divcell = document.createElement("div");
	stor.appendChild(divcell);
	divcell.style.padding="0px";
	divcell.style.margin="4px";	
	divcell.class="galitem";
	
	var imgcell = document.createElement("img");
	imgcell.src=theimage;
	imgcell.style.border="1px solid black";	
	divcell.appendChild(imgcell);
}


// background image functions
function backcrop()
{
	checkForFileAPI();
	/*
	var x = document.getElementById("backpicture").value;
	backgroundimage = new Image();
	backgroundimage.src=x;
	*/
	backgroundimagemode=BACKCROP;
	update();
}

function backfill()
{
	var canvas = document.getElementById("canvaslogo");
	backgroundimagew = canvas.width;
	backgroundimageh = canvas.height;
	backgroundimagemode=BACKFILL;
	update();
}

function addToTextures()
{
	var t = new Image();
	t.src=backgroundimage.src;

	var last = document.getElementById("lastext");
	var parent = last.parentNode;
	
	var newcell = document.createElement("span");
	parent.appendChild(newcell);
	newcell.style.marginRight="4px";

	last.id="";
	newcell.id="lastext";
	var nimg = document.createElement("IMG");
	nimg.width=64;
	nimg.height=64;
	nimg.src=t.src;
	nimg.style.border="2px solid white";
	newcell.appendChild(nimg);
	if(nimg.addEventListener)
	{  
		nimg.addEventListener('click', function(){setit(nimg);}, false);
	} 
	else
	{
		nimg.attachEvent('click', function(){setit(nimg);});  
	}
	
}

function removeBackImage()
{
	backgroundimage=null;
	update();
}

function aFileIsLoaded(e1)
{
	var filename = e1.target.files[0]; 
	var fr = new FileReader();
    fr.onload = function(e2) 
    {
	  backgroundimage = new Image();
	  backgroundimage.src=e2.target.result;
    };
	fr.readAsDataURL(filename); 	
}


function checkForFileAPI()
{
	if (window.File && window.FileReader && window.FileList && window.Blob) return true;
	if (window.FileReader) return true;
	else
	{
		alert('File API not supported by this browser.');
	}
}

window.onload=function(){
  var s = document.getElementById("fontsize");
  s.value="48";
  document.getElementById('loadpicture').addEventListener('change', aFileIsLoaded, false);
  backgroundimagemode=NONE;
  carpeInit();
  update();
}
