//角色类 imgPerson 图片头名 pgObject 需插入的HTML对象
function rollPerson(namePerson,imgPerson,imgWidth,imgHeight,perPosX,perPosY,pgObject,hitPolygons){
	this.imgRP = document.createElement("div");
	this.imgRP.style.display = "none";
	this.imgRP.style.backgroundImage = "url(" + imgPerson + ".gif)";
	this.imgRP.style.backgroundRepeat = "no-repeat";
	this.imgRP.style.width = imgWidth + "px";
	this.imgRP.style.height = imgHeight + "px";
	this.imgRP.style.position = "absolute";
	this.imgRP.style.left = "0px";
	this.imgRP.style.top = "0px";
	this.imgRP.id = namePerson;
	this.imgRP.className="nsgRollPerson";
	pgObject.appendChild(this.imgRP);
	//rollPerson=this.imgRP;
	//eval("roll" + namePerson + " = document.getElementById(\"" + namePerson + "\");");
	
	this.imgWidth = Number(imgWidth);this.imgHeight=Number(imgHeight);this.perPosX=perPosX;this.perPosY=perPosY;this.hitPolygons=hitPolygons;
	this.speed = new Number();
	this.speed = 0;
	this.countSpeed = new Number();
	this.countSpeed = this.speed;
	this.countAction = new Number();
	this.countAction = 0;
	this.lagAni = new Number();
	this.lagAni = 0;
	this.dirAni = new Boolean();
	this.lagAni = true;
	this.rowIRP = 1;
	this.zIndexReduce=0;
}
rollPerson.prototype.setTo = function(x,y){
	this.imgRP.style.left = x - this.imgHeight + this.zIndexReduce + "px";
	this.imgRP.style.top = y - this.imgHeight + this.zIndexReduce + "px";
	this.imgRP.style.zIndex=y;
}
rollPerson.prototype.hide = function(){
	this.imgRP.style.display = "none";
}
rollPerson.prototype.show = function(){
	this.imgRP.style.display = "block";
}
rollPerson.prototype.move = function(keyUp,keyLeft,keyRight,keyDown){
	var PosX=this.imgRP.style.left.replace("px","");
	nPosX = new Number(PosX);
	var PosY=this.imgRP.style.top.replace("px","");
	nPosY = new Number(PosY);
	testString = "this.acHitTest(this.hitPolygons,nPosX+this.imgWidth/2,nPosY+Math.floor(this.imgHeight/6*5),11)";// && this.acHitTest(this.hitPolygons,nPosX,nPosY + this.imgHeight,10) && this.acHitTest(this.hitPolygons,nPosX + this.imgWidth,nPosY + this.imgHeight,00) && this.acHitTest(this.hitPolygons,nPosX + this.imgWidth,nPosY,01)";
	testStringPlus = "if(this.acHitTest(this.hitPolygons,nPosX+this.imgWidth/2,PosY * 1 + Math.floor(this.imgHeight/6*5),11)){this.imgRP.style.left=nPosX + \"px\";this.imgRP.style.top=PosY + \"px\"}else if(this.acHitTest(this.hitPolygons,PosX * 1+this.imgWidth/2,nPosY+Math.floor(this.imgHeight/6*5),11)){this.imgRP.style.left=PosX + \"px\";this.imgRP.style.top=nPosY + \"px\";}";
	if (keyLeft ==true && keyUp == true || keyLeft == true && keyDown == true || keyRight == true && keyUp == true || keyRight == true && keyDown == true){
		if (keyLeft == true && keyUp == true){
			if(this.countSpeed < 0){
				this.countSpeed++;
			}else{
				if (this.speed > 0){
					nPosX-=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
					nPosY-=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
				}else{
					nPosX--;
					nPosY--;
				}
				this.countSpeed=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
				if (eval(testString)){
					this.imgRP.style.left=nPosX + "px";
					this.imgRP.style.top=nPosY + "px";
				}else eval(testStringPlus);
			}
			this.action("go","up");
		}
		if (keyLeft == true && keyDown == true){
			if(this.countSpeed < 0){
				this.countSpeed++;
			}else{
				if (this.speed > 0){
					nPosX-=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
					nPosY+=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
				}else{
					nPosX--;
					nPosY++;
				}
				this.countSpeed=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
				if (eval(testString)){
					this.imgRP.style.left=nPosX + "px";
					this.imgRP.style.top=nPosY + "px";
				}else eval(testStringPlus);
			}
			this.action("go","down");
		}
		if (keyRight == true && keyUp == true){
			if(this.countSpeed < 0){
				this.countSpeed++;
			}else{
				if (this.speed > 0){
					nPosX+=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
					nPosY-=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
				}else{
					nPosX++;
					nPosY--;
				}
				this.countSpeed=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
				if (eval(testString)){
					this.imgRP.style.left=nPosX + "px";
					this.imgRP.style.top=nPosY + "px";
				}else eval(testStringPlus);
			}
			this.action("go","up");
		}
		if (keyRight == true && keyDown == true){
			if(this.countSpeed < 0){
				this.countSpeed++;
			}else{
				if (this.speed > 0){
					nPosX+=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
					nPosY+=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
				}else{
					nPosX++;
					nPosY++;
				}
				this.countSpeed=Math.round((this.speed / 2 * Math.sqrt(2)) / 2 * Math.sqrt(2));
				if (eval(testString)){
					this.imgRP.style.left=nPosX + "px";
					this.imgRP.style.top=nPosY + "px";
				}else eval(testStringPlus);
			}
			this.action("go","down");
		}
	}
	else{
		if (keyLeft == true){
			if(this.countSpeed < 0){
				this.countSpeed++;
			}else{
				if (this.speed > 0){
					nPosX-=this.speed;
				}else{
					nPosX--;
				}
				this.countSpeed=this.speed;
				if (eval(testString))this.imgRP.style.left=nPosX + "px";
				else eval(testStringPlus);
			}
			
			this.action("go","left");
		}
		if (keyRight == true){
			if(this.countSpeed < 0){
				this.countSpeed++;
			}else{
				if (this.speed > 0){
					nPosX+=this.speed;
				}else{
					nPosX++;
				}
				this.countSpeed=this.speed;
				if (eval(testString))this.imgRP.style.left=nPosX + "px";
				else eval(testStringPlus);
			}
			//this.imgRP.style.left=nPosX + "px";
			this.action("go","right");
		}
		if (keyUp == true){
			if(this.countSpeed < 0){
				this.countSpeed++;
			}else{
				if (this.speed > 0){
					nPosY-=this.speed;
				}else{
					nPosY--;
				}
				this.countSpeed=this.speed;
				if (eval(testString))this.imgRP.style.top=nPosY + "px";
				else eval(testStringPlus);
			}
			//this.imgRP.style.top=nPosY + "px";
			this.action("go","up");
		}
		if (keyDown == true){
			if(this.countSpeed < 0){
				this.countSpeed++;
			}else{
				if (this.speed > 0){
					nPosY+=this.speed;
				}else{
					nPosY++;
				}
				if (eval(testString))this.imgRP.style.top=nPosY + "px";
				else eval(testStringPlus);
				this.countSpeed=this.speed;
			}
			//this.imgRP.style.top=nPosY + "px";
			this.action("go","down");
		}
		if (keyDown != true && keyUp != true && keyLeft != true && keyRight != true)
			this.action("stop",null);
	}
	this.imgRP.style.zIndex=nPosY + this.imgHeight - this.zIndexReduce;
	//window.debugString = this.imgRP.style.zIndex
}
rollPerson.prototype.action=function(ac,forward){
	if (forward == "left") this.rowIRP = 4;
	if (forward == "down") this.rowIRP = 3;
	if (forward == "right") this.rowIRP = 2;
	if (forward == "up") this.rowIRP = 1;
	if (this.lagAni  < 7){
		this.lagAni++;
	}else{
		this.lagAni=0;
		if (ac == "stop") {this.countAction = 1;this.dirAni = true;}
		this.imgRP.style.backgroundPosition = (-(this.perPosX * this.imgWidth * 3 + this.countAction * this.imgWidth)) + "px " + (-(this.perPosY * this.imgHeight * 4 + (this.rowIRP - 1) * this.imgHeight)) + "px";
		if (this.countAction < 2 && this.dirAni == true)
			this.countAction++;
		else
			this.dirAni = false;
		if (this.countAction > 0 && this.dirAni == false)
			this.countAction--;
		else
			this.dirAni = true;
		
	}
}
rollPerson.prototype.faceto=function(imgSPosX,imgSPosY){
	this.imgRP.style.backgroundPosition = ( (-this.perPosX) * this.imgWidth * 3 + (-imgSPosX) ) + "px " +  ( (-this.perPosY) * this.imgHeight * 4 + (-imgSPosY) ) + "px";
}
rollPerson.prototype.acHitTest=function(hitPolygons,nPointX,nPointY,fixSW){
	var i = new Number();var posArray;var fLine = new Number();var testResult = new Boolean;
	i=0;posArray = hitPolygons[0]["sharps"];testResult=true;
	//误差修正 删除2:32 PM 9/24/2006 只判断脚下一个点
	//var fixValueX = 5;
	//var fixValueY = 7
	//if (String(fixSW).split("")[0] == "1") nPointX = nPointX + fixValueX;
	//if (String(fixSW).split("")[1] == "1") nPointY = nPointY + fixValueY;
	//if (String(fixSW).split("")[0] == "0") nPointX = nPointX - fixValueX;
	//if (String(fixSW).split("")[1] == "0") nPointY = nPointY - fixValueY;
	
	evalString="cLineSquare = (aPointX - bPointX) * (aPointX - bPointX) + (aPointY - bPointY) * (aPointY - bPointY);cLine = Math.sqrt(cLineSquare);naLineSquare =(nPointX - aPointX) * (nPointX - aPointX) + (nPointY - aPointY) * (nPointY - aPointY);nbLineSquare =(nPointX - bPointX) * (nPointX - bPointX) + (nPointY - bPointY) * (nPointY - bPointY);xLine = (cLine / 2 - (naLineSquare - nbLineSquare) / 2 / cLine);fPointX = xLine / cLine * bLine + bPointX;fPointY = (cLine - xLine) / cLine * aLine + aPointY;fLine =Math.sqrt(nbLineSquare - xLine * xLine)";
	while (i < posArray.length){
		aPointX = posArray[i][0][0];
		aPointY = posArray[i][0][1];
		bPointX = posArray[i][1][0];
		bPointY = posArray[i][1][1];
		if ((aPointY < nPointY && bPointY > nPointY) || (aPointX < nPointX && bPointX > nPointX) || (aPointX > nPointX && bPointX < nPointX) || (aPointY > nPointY && bPointY < nPointY)){
			bLine = aPointX > bPointX ? aPointX - bPointX : bPointX - aPointX;
			aLine = aPointY > bPointY ? aPointY - bPointY : bPointY - aPointY;
			eval(evalString);
			compareX = Math.round(fPointX)//.split(".")[0];
			compareY = Math.round(fPointY)//.split(".")[0];
			//aPointX = nPointX + Number(imgWidth);;
			//aPointY = nPointY + Number(imgHeight);
			//bPointX = Number(nPointX);
			//bPointY = Number(nPointY);
			//nPointX = posArray[i][0][0];
			//nPointY = posArray[i][0][1];
			//eval(evalString);
			//compareX2 = Math.round(fPointX)//.split(".")[0];
			//compareY2 = Math.round(fPointY)//.split(".")[0];
			//alert(fLine + " " + fPointX + " " + fPointY);
			//debug(compareX + " " + compareY + " " + compareX2 + " " + compareY2 + "|Point: " + aPointX + " " + aPointY + " " + bPointX + " " + bPointY + " " + nPointX + " " + nPointY + "" + fLine)
			if ((Math.ceil(fLine) > -2 && Math.ceil(fLine) < 2) || (Math.floor(fLine)  > -2 && Math.floor(fLine) < 2))testResult = false;
		}
		i++;
	}
	return testResult;
}
//地图类
function mapScence(imgScence,pgObject){
	pgObject.style.backgroundImage="url(" +imgScence + ")";
	this.polygons=[ 
	{sharps:[	[[146,157],[222,184]],[[222,184],[289,138]],[[289,138],[217,102]],[[217,102],[146,157]]	]
	 }];
	Player1 = new rollPerson("StrangeUncle","chara03_c","24","32","0","0",nsgPlayGround,this.polygons);
	NPC1 = new rollPerson("StrangeAunt","chara03_c","24","32","1","1",nsgPlayGround,this.polygons);
	Flower1 = new rollPerson("Flower","flower","23","33","0","0",nsgPlayGround,this.polygons);
	Player1.faceto("24","64");
	Player1.action("stop","down");
	//Player1.faceto("24","64"); change to use action function, faceto will be use for special item(eg.NPC or something won't be moved).
	Player1.setTo(260,146);
	Player1.show();
	NPC1.faceto("24","64");
	NPC1.show();
	NPC1.setTo(234,142);
	Flower1.faceto("0","0");
	Flower1.show();
	Flower1.zIndexReduce = 1;
	Flower1.setTo(200,152);
	//Player1.acHitTest(this.polygons,2,2,24,32);
}