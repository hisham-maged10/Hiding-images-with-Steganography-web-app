/**
 * @author ${hisham_maged10}
 *https://github.com/hisham-maged10
 * ${WebApps}
 */
var hideImg=null;
var showImg=null;
var finalImg=null;

function loadHide()
{
	var canvas=document.getElementById("hideCanvas");
	var fileinput=document.getElementById("hideF");
	hideImg=new SimpleImage(fileinput);
	hideImg.drawTo(canvas);	
}
function loadShow()
{
	var canvas=document.getElementById("showCanvas");
	var fileinput=document.getElementById("showF");
	showImg=new SimpleImage(fileinput);
	showImg.drawTo(canvas);	
}

function shift(img)
{
	for(var pixel of img.values())
	{
		pixel.setGreen(Math.floor(pixel.getGreen()/16));
		pixel.setRed(Math.floor(pixel.getRed()/16));
		pixel.setBlue(Math.floor(pixel.getBlue()/16));
	}
	return img;
}
function zeroOut(img)
{
	for(var pixel of img.values())
	{
		pixel.setGreen(Math.floor(pixel.getGreen()/16)*16);
		pixel.setRed(Math.floor(pixel.getRed()/16)*16);
		pixel.setBlue(Math.floor(pixel.getBlue()/16)*16);	
	}
	return img;
}
function cropImage(img,width,height)
{
	img.setSize(width,height);
	return img;
}
function combine(show,hide)
{
	finalImg=new SimpleImage(show.getWidth(),show.getHeight());
	var canvas=document.getElementById("finalCanvas");
	for(var pixel of finalImg.values())
	{
		var x=pixel.getX();
		var y=pixel.getY();
		var showPixel=show.getPixel(x,y);
		var hidePixel=hide.getPixel(x,y);
		pixel.setRed(showPixel.getRed()+hidePixel.getRed());
		pixel.setGreen(showPixel.getGreen()+hidePixel.getGreen());
		pixel.setBlue(showPixel.getBlue()+hidePixel.getBlue());
	}
	console.log("done");
	finalImg.drawTo(canvas);

}
function hide()
{
	showImg=zeroOut(showImg);	
	hideImg=shift(hideImg);
	hideImg=cropImage(hideImg,showImg.getWidth(),showImg.getHeight());
	combine(showImg,hideImg);
}