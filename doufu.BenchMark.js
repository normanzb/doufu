/*
	Class: doufu.BenchMark 
	
	BenchMark utility, helps count the time consumed while executing specified piece of code.
*/
doufu.BenchMark = function()
{
	doufu.OOP.Class(this);
	
	var dtStarts = new doufu.CustomTypes.Stack();
	var iResults = [];
	var enable = doufu.System.Logger.IsDebug();
	
	
	/*
		Function: Record
		
		Start to record
		
		Parameters:
			sName - Specified a name for current record.
			signal - If this is not null, benchmark will work only if the signal is set.
	*/
	this.Record = function(sName, signal)
	{
		if (enable)
		{
			// if the signal specified but not set, return directly.
			if (signal != null && !signal.IsSet())
			{
				return;
			}
			var elmt = new doufu.BenchMark.Element();
			elmt.Name = sName;
			elmt.StartTime = new Date().getTime();
			dtStarts.Push(elmt);
		}
	}
	
	/*
		Function: End
		
		End a recording, and push the costed time into array.
		
		Parameters:
			sName - Specified a end name for current record.
			signal - If this is not null, benchmark will work only if the signal is set.
		
	*/
	this.End = function(sName, signal)
	{
		if (enable)
		{
			// if the signal specified but not set, return directly.
			if (signal != null && !signal.IsSet())
			{
				return;
			}
			var elmt = dtStarts.Pop();
			if (elmt != null)
			{
				if (sName != null)
				{
					elmt.Name += "/" + sName;
				}
				elmt.Cost = (new Date().getTime()) - elmt.StartTime;
				iResults.push(elmt);
			}
		}
	}
	
	/*
		Function: ListToConsole
		
		Write information to console.
	*/
	this.ListToConsole = function()
	{
		enable = false;
		
		for(var i = 0; i < iResults.length; i++)
		{
			doufu.System.Logger.Debug("doufu.BenchMark::ListToConsole() - Name: " + iResults[i].Name + " StartTime: " + 
			iResults[i].StartTime + " Cost: " + iResults[i].Cost);
		}
		
		// clear array
		iResults.length = 0;
		
		enable = true;
	}
}

doufu.BenchMark.Element = function()
{
	/*
		Property: Name
		
		The name of current benchmark element.
	*/
	this.Name = "";
	
	/* 
		Property: StartTime
	*/
	this.StartTime = 0;
	
	/*
		Property: Cost
	*/
	this.Cost = 0;
}

doufu.BenchMark.Signal = function()
{
	var value = false;
	this.Set = function()
	{
		value = true;
	}
	
	this.Release = function()
	{
		value = false;
	}
	
	this.IsSet = function()
	{
		return value;
	}
}

doufu.BenchMark.Instance = new doufu.BenchMark();