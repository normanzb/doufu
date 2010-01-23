doufu.SpriteEditor = function()
{
	$c(this);
	
	/* Private variables */
	
	var me = this;
	var defaultZoomingLevel = 4;
	
	var pnlToolBar = null;
	var pnlMenuButtons = null;
	var pnlSpritePattern = null;
	var pnlAnimation = null;
	var pnlProperty = null;
	var pnlPropertyNames = null;
	var pnlPropertyValues = null;
	var picSpritePattern = null;
	var imgLoader = null;
	var btnOpen = null;
	var btnRun = null;
	var btnZoom = null;
	var toolStandingPoint = null;
	var toolCollisionEdges = null
	var lblWidth = doufu.Browser.DOM.CreateElement("div");
	lblWidth.Text("Pattern Width:");
	var lblHeight = doufu.Browser.DOM.CreateElement("div");
	lblHeight.Text("Pattern Height:");
	var lblSpriteWidth = doufu.Browser.DOM.CreateElement("div");
	lblSpriteWidth.Text("Sprite Width:");
	var lblSpriteHeight = doufu.Browser.DOM.CreateElement("div");
	lblSpriteHeight.Text("Sprite Height:");
	var lblStandingOffsetX = doufu.Browser.DOM.CreateElement("div");
	lblStandingOffsetX.Text("Standing Offset X:");
	var lblStandingOffsetY = doufu.Browser.DOM.CreateElement("div");
	lblStandingOffsetY.Text("Standing Offset Y:");
	
	var txtWidth = doufu.Browser.DOM.CreateElement("input");
	var txtHeight = doufu.Browser.DOM.CreateElement("input");
	var txtSpriteHeight = doufu.Browser.DOM.CreateElement("input");
	var txtSpriteWidth = doufu.Browser.DOM.CreateElement("input");
	var txtStandingOffsetX = doufu.Browser.DOM.CreateElement("input");
	var txtStandingOffsetY = doufu.Browser.DOM.CreateElement("input");
	
	var posX = 180;
	var posY = 200;
	var command = 0;
	
	var CMD_STANDINGPOINT = 1;
	var CMD_COLLISIONEDGES = 2;
	
	var getBreakLine = function()
	{
		return document.createElement("br");
	}
	
	var generalDisplayManager = null;
	var generalPlayGroundManager = null;
	var map = null;
	var sprite = new doufu.Game.Sprites.FourDirectionSprite();
	
	/* Properties */
	var _patternPath = null;
	
	this.NewProperty("PatternPath");
	this.PatternPath.Get = function()
	{
		return _patternPath;
	}
	
	var _isInitialized = false;
	this.NewProperty("IsInitialized");
	this.IsInitialized.Get = function()
	{
		return _isInitialized;
	}
	this.IsInitialized.Set = function(value)
	{
		_isInitialized = value;
	}
	
	/* Event handlers */
	var btnOpen_Click = function()
	{
		var path = prompt("Please enter the path of sprite pattern", "../Images/Chars/Char01.gif");
		if (path != null)
		{
			me.Load(path);
		}
	}
	
	var btnRun_Click = function()
	{
		sprite.Width = txtSpriteWidth.Text() * 1;
		sprite.Height = txtSpriteHeight.Text() * 1;
		sprite.StandingOffset.X = txtStandingOffsetX.Text() * 1;
		sprite.StandingOffset.Y = txtStandingOffsetY.Text() * 1;
		sprite.LocationX(posX);
		sprite.LocationY(posY);
		sprite.ImagePath = me.PatternPath();
		
		sprite.AnimationInfos.Init = new doufu.Game.Animation.Info();
		sprite.AnimationInfos.Init.Row = 0;
		sprite.AnimationInfos.Init.Column = 0;
		sprite.AnimationInfos.Init.FrameNumber = 1;
		sprite.AnimationInfos.Init.RepeatNumber = 1;
		sprite.AnimationInfos.Init.FrameSkip = 5;
		sprite.Animation.Play(sprite.AnimationInfos.Init);

		generalPlayGroundManager.InsertObject(sprite);
			
		generalPlayGroundManager.Camera().Trace(sprite);
	}
	
	var sprite_Click = function(s, e)
	{
		if ((command & CMD_STANDINGPOINT) == CMD_STANDINGPOINT)
		{
			txtStandingOffsetX.Text(e.offsetX);
			txtStandingOffsetY.Text(e.offsetY);
		}
		
		if ((command & CMD_COLLISIONEDGES) == CMD_COLLISIONEDGES)
		{
			alert(e.offsetX);
			
			var standPointScr = doufu.Game.PlayGround.Helpers.RealYToScreenY(sprite.LocationY);
			var clickPointDiffScr = sprite.StandingOffset.Y - e.offsetY;
			var clickPointScr = standPointScr - clickPointDiffScr;
			var clickPointMap = doufu.Game.PlayGround.Helpers.ScreenYToRealY(clickPointScr) - sprite.Y;
			
			alert(clickPointMap);
		}
	}
	
	// tool buttons
	var toolStandingPoint_Click = function()
	{
		if (toolStandingPoint.IsSelected())
		{
			command = CMD_STANDINGPOINT;
		}
		else
		{
			command &= ~CMD_STANDINGPOINT;
		}
		
		return true;
	}
	var toolCollisionEdges_Click = function()
	{
		if (toolCollisionEdges.IsSelected())
		{
			command = CMD_COLLISIONEDGES;
		}
		else
		{
			command &= ~CMD_COLLISIONEDGES;
		}
	}
	
	/* Public methods */
	this.Load = function(sPatternPath)
	{
		_patternPath = sPatternPath;
		
		imgLoader = new Image();
		imgLoader.onload = this.LoadImage;
		imgLoader.src = sPatternPath;
		
	}
	
	this.LoadImage = function()
	{
		
		picSpritePattern.BackgroundImage(me.PatternPath());
		picSpritePattern.Width(imgLoader.width);
		picSpritePattern.Height(imgLoader.height);
		
		txtWidth.Text(picSpritePattern.Width());
		txtHeight.Text(picSpritePattern.Height());
		
	}
	
	this.Initialize = function()
	{
		var bNoErr = true;
		// get doms
		try
		{
			pnlMenuButtons = new doufu.Browser.Element("idMenuButtons");
			pnlToolBar = new doufu.Browser.Element("idToolBarContainer");
			pnlSpritePattern = new doufu.Browser.Element("idSpritePatternContainer");
			pnlAnimation = new doufu.Browser.Element("idAnimationContainer");
			pnlProperty = new doufu.Browser.Element("idPropertyContainer");
			pnlPropertyNames = new doufu.Browser.Element("idPropertyNameContainer");
			pnlPropertyValues = new doufu.Browser.Element("idPropertyValueContainer");
		}
		catch(e)
		{
			bNoErr = false;
			alert(e);
		}
		
		if (!bNoErr)
		{
			return false;
		}
		
		if (!this.IsInitialized())
		{
			///////////////////////////
			// construct menu panel
			btnOpen = new doufu.SpriteEditor.MenuButton();
			btnOpen.OnClick.Attach(new doufu.Event.CallBack(btnOpen_Click,this));
			btnOpen.SetAttribute("id", "idBtnOpen");
			btnOpen.Text("Open");
			btnRun = new doufu.SpriteEditor.MenuButton();
			btnRun.OnClick.Attach(new doufu.Event.CallBack(btnRun_Click,this));
			btnRun.SetAttribute("id", "idBtnRun");
			btnRun.Text("Run");
			
			var fragmentMenuButton = document.createDocumentFragment();
			fragmentMenuButton.appendChild(btnOpen.Native());
			fragmentMenuButton.appendChild(btnRun.Native());
			
			pnlMenuButtons.Native().appendChild(fragmentMenuButton);
			
			// construct ends
			////////////////////////////
		
			///////////////////////////
			// construct image panel
			picSpritePattern = doufu.Browser.DOM.CreateElement("div");
			pnlSpritePattern.AppendChild(picSpritePattern);
			
			///////////////////////////
			// construct property panel
			
			var names = document.createDocumentFragment();
			var values = document.createDocumentFragment();
			names.appendChild(lblWidth.Native());
			values.appendChild(txtWidth.Native());

			names.appendChild(lblHeight.Native());
			values.appendChild(txtHeight.Native());

			names.appendChild(lblSpriteWidth.Native());
			values.appendChild(txtSpriteWidth.Native());

			names.appendChild(lblSpriteHeight.Native());
			values.appendChild(txtSpriteHeight.Native());
			
			names.appendChild(lblStandingOffsetX.Native());
			values.appendChild(txtStandingOffsetX.Native());
			
			names.appendChild(lblStandingOffsetY.Native());
			values.appendChild(txtStandingOffsetY.Native());
			
			pnlPropertyNames.Native().appendChild(names);
			pnlPropertyValues.Native().appendChild(values);
			
			///////////////////////////
			// contruct animation panel
			
			var EmptyMessage = new doufu.System.Message();
			var tmpMsg = new doufu.System.Message();
			tmpMsg.Handle = doufu.System.Handle.Constants.BROADCAST;
			tmpMsg.Message = doufu.System.MessageConstants.DISPLAY_RENDER;
			
			// Game looping timeout, decide how fast this game runs.
			var loopTimeout = 70;
			
			var __Global_MainLoop_Stop = false;
			
			function __nsc_MainLoop(){
				var startTime = new Date().getTime();
				
				if (doufu.System.MessageQueue.Length() > 0)
				{
					// bump out all messages
					while(doufu.System.MessageQueue.Length() > 0)
					{
						
						doufu.Cycling.Manager.Looper(doufu.System.MessageQueue.Shift());
					}
				}
				else
				{
					//doufu.Cycling.Manager.Looper(EmptyMessage);
				}
				var lastTimeout = loopTimeout - new Date().getTime() + startTime;
				if (lastTimeout < 10)
				{
					lastTimeout = 10;
				}
				
				if (__Global_MainLoop_Stop == false) setTimeout(__nsc_MainLoop, lastTimeout);
			}
			
			function testLoop()
			{
				var startTime = new Date().getTime();
				
				doufu.System.MessageQueue.Push(tmpMsg);
				
				var lastTimeout = loopTimeout - new Date().getTime() + startTime;
				if (lastTimeout < 10)
				{
					lastTimeout = 10;
				}
				
				setTimeout(testLoop, lastTimeout);
			}
			
			// Enable background cache
			doufu.Browser.Helpers.EnableBackgroundCache(true);
			// Create a display manager (and its display area)
			generalDisplayManager = doufu.Display.Manager.Create(pnlAnimation.Native(), "__NSC_NONAME_SCREEN", 320, 180);
			generalPlayGroundManager = new doufu.Game.PlayGround(generalDisplayManager);
			
			generalPlayGroundManager.Camera().SmoothTracing = true;
			generalPlayGroundManager.Camera().SkipFrame = 0;
			
			var map = new doufu.SampleGame.Maps.MyIsland(generalPlayGroundManager);
			map.PlaygroundOnly(true);
			map.Initialize();
			
			testLoop();
			__nsc_MainLoop();
			
			///////////////////////////
			// construct tool panel
			
			var toolFragment = document.createDocumentFragment();
			
			toolStandingPoint = new doufu.SpriteEditor.ToolButton();
			toolStandingPoint.Text("SP");
			toolStandingPoint.OnClick.Attach(new doufu.Event.CallBack(toolStandingPoint_Click,this));
			
			toolFragment.appendChild(toolStandingPoint.Native());
			
			toolCollisionEdges = new doufu.SpriteEditor.ToolButton();
			toolCollisionEdges.Text("CE");
			toolCollisionEdges.OnClick.Attach(new doufu.Event.CallBack(toolCollisionEdges_Click,this));
			
			toolFragment.appendChild(toolCollisionEdges.Native());
			
			pnlToolBar.Native().appendChild(toolFragment);
			
			////////////////////////////
			this.IsInitialized(true);
		}
		
		(new doufu.Browser.Element(sprite.LinkedDisplayObject().HTMLElement())).OnClick.Attach(new doufu.Event.CallBack(sprite_Click,this));
		
		return true;
	}
	
	this.Ctor = function()
	{
		if (!this.Initialize())
		{
			return;
		}
	}
	
	this.Ctor();
}

doufu.SpriteEditor.ToolButton = function()
{
	$c(this);
	
	var el = document.createElement("div");
	
	this.Inherit(doufu.Browser.Element, [el]);
	
	var _isSelected = false;
	this.NewProperty("IsSelected");
	
	this.IsSelected.Get = function()
	{
		return _isSelected;
	}
	this.IsSelected.Set = function(value)
	{
		_isSelected = value;
	}
	
	this.Click = function()
	{
		this.IsSelected(!this.IsSelected());
		if (this.IsSelected())
		{
			this.SetAttribute("class", "toolButtonSelected");
		}
		else
		{
			this.SetAttribute("class", "toolButton");
		}
		
		return true;
	}
	
	this.Ctor = function()
	{
		doufu.SpriteEditor.ToolController.Attach(this);
		
		this.OnClick.Attach(new doufu.Event.CallBack(this.Click, this));
		
		this.SetAttribute("class", "toolButton");
	}
	this.Ctor();
	
}

doufu.SpriteEditor.ToolController = new function()
{
	$c(this);
	
	var self = this;
	
	this.Inherit(doufu.DesignPattern.Attachable, [doufu.SpriteEditor.ToolButton]);
	
	this.ToolsClick = function()
	{
		for(var i = 0; i < this.InnerCollection().Length(); i++)
		{
			this.InnerCollection().Items(i).IsSelected(true);
			this.InnerCollection().Items(i).Click();
		}
		
		return true;
	}
	
	this.OnAttach.Attach(new doufu.Event.CallBack(function(sender, toolButton)
	{
		toolButton.OnClick.Attach(new doufu.Event.CallBack(self.ToolsClick, this));
	}, this));
}

doufu.SpriteEditor.MenuButton = function()
{
	$c(this);
	
	var el = document.createElement("div");
	
	this.Inherit(doufu.Browser.Element, [el]);
	
	this.Click = function()
	{

	}
	
	this.Ctor = function()
	{
		this.OnClick.Attach(new doufu.Event.CallBack(this.Click, this));
		
		this.SetAttribute("class", "menuButton");
	}
	this.Ctor();
	
}


doufu.SpriteEditor.Instance = new doufu.SpriteEditor();