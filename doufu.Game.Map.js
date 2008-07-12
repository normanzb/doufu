doufu.Game.Map = function(oPlayGround)
{
	doufu.OOP.Class(this);
	
	this.LinkedPlayGround;
	
	this.ImagePath = CONFIG_STAGES_DIR + "stage01.gif";
	this.Width = 454;
	this.Height = 340;
	this.Camera().X = 100;
	this.Camera().Width = 322;
	this.Camera().Height = 242;
	
	this.Ctor = function()
	{
		if (!oPlayGround.InstanceOf(doufu.Game.PlayGround))
		{
			throw doufu.System.Exception("doufu.Game.Map::Ctor(): oPlayGround must be an instance of doufu.Game.PlayGround.");
		}
		
		this.LinkedPlayGround = oPlayGround;
	}
	
	this.Ctor();
}