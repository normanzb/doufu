nsc.Event.EventHandler = function(oContext)
{
	var oSender = oContext;
	var pCallBacks = new nsc.CustomTypes.Collection(nsc.Event.CallBack);
	
	this.Invoke = function(oEvent, oSenderOverride)
	{
		for (var i = 0; i < pCallBacks.Length; i++)
		{
			if (oSenderOverride != null)
				oSender = oSenderOverride;
			pCallBacks.InnerArray()[i].Reference.call(pCallBacks.InnerArray()[i].Context, oSender, oEvent);
		}
	}
	this.Attach = function(pCallback)
	{
		if (!pCallback.InstanceOf(nsc.Event.CallBack))
		{
			throw nsc.System.Exception("pCallback was not derived from nsc.Event.CallBack");
		}
		nsc.System.Logger.Debug("nsc.Event.EventHandler: Add call back " + pCallback);
		pCallBacks.Add(pCallback);
	}
	this.Detach = function(pCallback)
	{
		pCallBacks.Remove(pCallback);
	}
}