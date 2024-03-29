///##########################
/// Javascript Class
/// Name: doufu.Game.PlayGround
/// Description: 
/// 	Playground itself is also a display object
///
/// Attributes:
/// 	
/// 	
///
///##########################

doufu.Game.PlayGround = function(oDisplayManager)
{
	
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Display.BaseObject);
	
	/////////////////////////
	// Define properties and variables
	/////////////////////////
	
	/*
		Property: CurrentMap
		
		<doufu.Property>
		Current map which used by this playground manager.
	*/
	var _currentMap;
	this.NewProperty("CurrentMap");
	this.CurrentMap.Get = function()
	{
		return _currentMap;
	}
	this.CurrentMap.Set=function(value)
	{
		_currentMap = value;
	}
	
	/*
		Property: LinkedDisplayManager
		
		<doufu.Property>
		Get the linked display manager of current playground.
	*/
	var linkedDisplayMgr = null;
	this.NewProperty("LinkedDisplayManager");
	this.LinkedDisplayManager.Get = function()
	{
		return linkedDisplayMgr;
	}
	var displayBufferOffset = new doufu.Display.Drawing.Rectangle();
	
	// for saving all inserted elements
	var _gameObjects = new doufu.CustomTypes.Collection(doufu.Game.BaseObject);
	this.NewProperty("GameObjects");
	this.GameObjects.Get = function()
	{
		return _gameObjects;
	}
	this.GameObjects.Set = function(value)
	{
		_gameObjects = value;
	}
	
	// Javascript property Camera
	var _camera = new doufu.Game.PlayGround.Camera();
	this.NewProperty("Camera");
	this.Camera.Get = function()
	{
		return _camera;
	}
	this.Camera.Set = function(value)
	{
		_camera = value;
	}
	
	this.OnInsertObject = new doufu.Event.EventHandler(this);
	
	// Define properties and variables End
	
	/////////////////////////
	// Private methods
	/////////////////////////
	
	// make the sprite actually invoke the map collision function
	// TODO: move ConfirmMovable from Game.Map to Game.PlayGround
	var MovableConfirm = new doufu.Event.CallBack(function(sender, obj)
	{
		
		if (this.CurrentMap() != null)
		{
			return this.CurrentMap().ConfirmMovable(obj);
		}
		return true;
	}, this);
	
	/*
		Callback: AddMovableConfirm
		
		Adding collision detection for every sprite in the specified playground.
		
		This callback will be called when a object is insertted to linked playground.
		Callback will attach this.ConfirmMovable (callback) to object.OnConfirmMovable event.
		So that when a GameObject.OnConfirmMovable is invoked, this.OnConfrimMovable will be called.
		
		Parameters:
			sender - One who fired this event.
			obj - Should be the game object which inserted into the playground.
		
	*/
	var AddMovableConfirm = new doufu.Event.CallBack(function(sender, obj)
	{
		if (obj.InstanceOf(doufu.Game.Sprites.Sprite) && typeof obj.Shape != doufu.System.Constants.TYPE_UNDEFINED)
		{
			obj.OnConfirmMovable.Attach(MovableConfirm);
		}
	}, this)
	
	/////////////////////////
	// Public Methods
	/////////////////////////
	
	this.InsertObject = function(obj)
	{
		// let map collision to attach.
		this.OnInsertObject.Invoke(obj);
		
		_gameObjects.Add(obj);
		
		if (obj.Children.Length() != 0)
		{
			for(var i = 0; i < obj.Children.Length(); i++)
			{
				(obj.Children.Items(i).IsFixed || this.InsertObject(obj.Children.Items(i)));
			}
		}
	}
	
	this.RemoveObject = function(obj)
	{
		linkedDisplayMgr.RemoveObject(obj.LinkedDisplayObject());
		_gameObjects.Remove(obj);
	}
	
	this._base_RenderRefer = this.Render.Reference;
	this.Render.Reference = function(oSender, oEvent)
	{
		// Caculate which part of the background should be displayed according to camera coordinate
		this.ImageOffset.X = this.Camera().X;
		this.ImageOffset.Y = this.Camera().Y;
		
		// Insert in-range display object to display manager
		for (var i = 0; i < _gameObjects.Length(); i++)
		{
			
			// this is the player rectangle which on the screen surface (caculated by the analog);
			displayBufferOffset.Width = _gameObjects.InnerArray()[i].Width;
			displayBufferOffset.Height = _gameObjects.InnerArray()[i].Height;
			displayBufferOffset.X = _gameObjects.InnerArray()[i].X;
			// 12/16 Use the left bottom point to caculate the screen offset, count the sprite height.
			displayBufferOffset.Y = doufu.Game.PlayGround.Helpers.RealYToScreenY(_gameObjects.InnerArray()[i].LocationY(), true) - _gameObjects.InnerArray()[i].StandingOffset.Y;
			
			if(doufu.Game.Helpers.IsCollided(displayBufferOffset, this.Camera()))
			{
				// translate game object to display object.
				_gameObjects.InnerArray()[i].LinkedDisplayObject().X = displayBufferOffset.X - this.Camera().X;
				// Assuming the anglog is 60 degree.
				_gameObjects.InnerArray()[i].LinkedDisplayObject().Y = Math.round(displayBufferOffset.Y - this.Camera().Y);
				
				// The actual z value in the screen depend on the y coordinate. the game object is start from 4000 layer
				_gameObjects.InnerArray()[i].LinkedDisplayObject().Z = Math.round((_gameObjects.InnerArray()[i].Z + 1) * 4000 + _gameObjects.InnerArray()[i].LocationY());
				_gameObjects.InnerArray()[i].LinkedDisplayObject().Width = _gameObjects.InnerArray()[i].Width;
				_gameObjects.InnerArray()[i].LinkedDisplayObject().Height = _gameObjects.InnerArray()[i].Height;
				_gameObjects.InnerArray()[i].LinkedDisplayObject().ImageOffset = _gameObjects.InnerArray()[i].ImageOffset;
				_gameObjects.InnerArray()[i].LinkedDisplayObject().ImagePath = _gameObjects.InnerArray()[i].ImagePath;

				if (_gameObjects.InnerArray()[i].LinkedDisplayObject().IsInView == false)
				{
					linkedDisplayMgr.InsertObject(_gameObjects.InnerArray()[i].LinkedDisplayObject());
				}
			}
			else
			{
				// linkeedDisplayMgr removeObject
				if (_gameObjects.InnerArray()[i].LinkedDisplayObject().IsInView == true)
				{
					linkedDisplayMgr.RemoveObject(_gameObjects.InnerArray()[i].LinkedDisplayObject());
				}
				
			}
		}
		
		this._base_RenderRefer(oSender, oEvent);
	}
	
	/////////////////////////
	// Constructor, Initializing variables and properties.
	/////////////////////////
	this.Ctor = function()
	{
		if (!oDisplayManager.InstanceOf(doufu.Display.Manager))
		{
			throw doufu.System.Exception("doufu.Game.PlayGround::Ctor(): Must specified a display manager.");
		}
		
		doufu.System.Logger.Debug("doufu.Game.PlayGround::Ctor(): Loopped in.");
		
		// Link display manager
		linkedDisplayMgr = oDisplayManager;
		doufu.System.Logger.Debug("doufu.Game.PlayGround::Ctor(): created play ground temporary html element.");
		
		// Inserted play ground it self to display mananger.
		doufu.System.Logger.Debug("doufu.Game.PlayGround::Ctor(): Insert playground to display manager");
		linkedDisplayMgr.InsertObject(this);
		
		// Playground layer has it default z index 2001;
		this.Z = 2001;
		
		// Set camera property
		this.Camera().Width = oDisplayManager.HTMLElement().clientWidth;
		this.Camera().Height = oDisplayManager.HTMLElement().clientHeight;
		
		// every a sprite was inserted, attached a confirm movable callback to the sprite's onconfirmmovable event handler.
		// the confirm movable callback will helps to brigde the map between sprite for collision detect.
		this.OnInsertObject.Attach(AddMovableConfirm);
		
	};
	
	this.Ctor();
	
	// TO DO: 1) Calculate the object offset if the background scroll
	//			 So the sprite/object movement must be controlled by playground object.
	//		  2) Add ability to set background color.
	
}

/*
	Namespace: doufu.Game.PlayGround.Helpers
*/
doufu.Game.PlayGround.Helpers = {};

/*
	Function: doufu.Game.PlayGround.Helpers.RealYToScreenY
	
	Convert real game world Y coordinate to screen Y coordinate
	
	Parameters:
		iRealY - The real game world Y coordinate.
		bAccuracy - [Optional] If true, return a accurate Y coordinate, otherwise return a rounded integer.
		
	Returns:
		The corresponding screen y coordinate.
*/
doufu.Game.PlayGround.Helpers.RealYToScreenY = function(iRealY, bAccuracy)
{
	if (bAccuracy == null)
	{
		bAccuracy = false;
	}
	var oCndtAccuracy = {};
	oCndtAccuracy[true] = function()
	{
		return iRealY / 1.5;
	}
	oCndtAccuracy[false] = function()
	{
		return Math.round(iRealY / 1.5);
	}
	
	return oCndtAccuracy[bAccuracy]();
}
doufu.Game.PlayGround.Helpers.ScreenYToRealY = function(iScreenY)
{
	return iScreenY * 1.5;
}