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
				elmt.EndTime = (new Date().getTime());
				elmt.Cost = elmt.EndTime - elmt.StartTime;
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
		
		var iResultsNotDone = [];
		
		for(var i = 0; i < iResults.length; i++)
		{
			if (iResults[i].EndTime != 0)
			{
				doufu.System.Logger.Debug("doufu.BenchMark::ListToConsole() - Name: " + iResults[i].Name + " StartTime: " + 
				iResults[i].StartTime + " Cost: " + iResults[i].Cost);
			}
			else
			{
				iResultsNotDone.push(iResults[i]);
			}
		}
		
		// clear array
		iResults = iResultsNotDone;
		
		enable = true;
	}
}

/*
	Struct: doufu.BenchMark.Element
	
	Element struct which used by benchmark class.
*/
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
		Property: EndTime
	*/
	this.EndTime = 0;
	
	/*
		Property: Cost
	*/
	this.Cost = 0;
}

/*
	Class: doufu.BenchMark.Signal
	
	Signal which used for control when benchmark should start to record.
*/
doufu.BenchMark.Signal = function()
{
	var value = false;
	
	/*
		Property: IsSet
		
		Get current status of signal, return true if set.
	*/
	this.IsSet = function()
	{
		return value;
	}
	
	/*
		Function: Set
		Set the signal, corresponding benchmark will start to record.
	*/
	this.Set = function()
	{
		value = true;
	}
	
	/*
		Function: Release
		
		Release the signal, benchmark will stop recording.
	*/
	this.Release = function()
	{
		value = false;
	}
}

/*
	Section: doufu.BenchMark.Instance
	
	A singleton benchmark.
*/
doufu.BenchMark.Instance = new doufu.BenchMark();