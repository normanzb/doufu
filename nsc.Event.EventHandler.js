nsc.Event.EventHandler = function(oContext)
{
	var oSender = oContext;
	var pCallBacks = new nsc.CustomTypes.Collection(nsc.Event.CallBack);
	
	this.Invoke = function(oEvent, oSenderOverride)
	{
		for (var i = 0; i < pCallBacks.length; i++)
		{
			if (oSenderOverride != null)
				oSender = oSenderOverride;
			pCallBacks[i].Reference.call(pCallBacks[i].Context, oSender, oEvent);
		}
	}
	this.Attach = function(pCallback)
	{
		pCallBacks.Add(pCallback);
	}
	this.Detach = function(pCallback)
	{
		pCallBacks.Remove(pCallback);
	}
}