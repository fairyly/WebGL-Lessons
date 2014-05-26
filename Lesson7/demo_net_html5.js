
function drawMesh_html5(ctx, meshObj)
{
	var mesh = meshObj.mesh[meshObj.layer];
	var meshWidth = meshObj.width;
	var meshHeight = meshObj.height;
	for(var i = 0; i < meshHeight; ++i)
	{
		var k = i * meshWidth;
		for(var j = 1; j < meshWidth; ++j)
		{
			var h = k + j;
			ctx.moveTo(mesh[h - 1].x * cvsWidth, mesh[h - 1].y * cvsHeight);
			ctx.lineTo(mesh[h].x * cvsWidth, mesh[h].y * cvsHeight);
		}
	}

	for(var i = 0; i < meshWidth; ++i)
	{
		for(var j = 1; j < meshHeight; ++j)
		{
			var h2 = j * meshWidth + i;
			var h1 = (j - 1) * meshWidth + i;
			ctx.moveTo(mesh[h1].x * cvsWidth, mesh[h1].y * cvsHeight);
			ctx.lineTo(mesh[h2].x * cvsWidth, mesh[h2].y * cvsHeight);
		}
	}

}

function drawCanvas_html5(objID)
{
	if(isMouseDown)
	{
		g_mesh.catchPoint(lastX / cvsWidth, lastY / cvsHeight);
	}

	var cvsObj = document.getElementById(objID);
	var cvsContext = cvsObj.getContext("2d");
	cvsContext.fillStyle = "#fff";
	cvsContext.clearRect(0, 0, cvsWidth, cvsHeight);

	cvsContext.beginPath();
	cvsContext.strokeStyle = "#0f0";
	drawMesh_html5(cvsContext, g_mesh);
	cvsContext.fillText("当前网格强度: " + g_mesh.intensity + ". Author URL: http://blog.wysaid.org", 20, 20);
	cvsContext.stroke();
	cvsContext.closePath();
	g_mesh.update();
}

function bodyResize_html5()
{
	var divObj = document.getElementById("canvas_father_html5");
	var cvsObj = document.getElementById("webgl_lesson7_html5");
	cvsObj.width = divObj.clientWidth;
	cvsObj.height = divObj.clientHeight;
	cvsWidth = cvsObj.width;
	cvsHeight = cvsObj.height;
	drawCanvas_html5('webgl_lesson7_html5')
}