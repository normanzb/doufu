/*
	Class: doufu.Test
*/
doufu.Test = new function()
{
	$c(this);
	
	var isWinLoaded = false;
	
	var processErr = function(ex)
	{
		if (ex instanceof doufu.Test.Failure)
		{
			$l.Fail(ex.toString());
		}
		else
		{
			$l.Error(" ", ex);
		}
	}
	
	this.Run = function(suiteClass)
	{
		
		
		var innerRun = function(suiteClass)
		{
			var suite = new suiteClass;
			if (!suite.InstanceOf(doufu.Test.Suite))
			{
				throw doufu.System.Exception("doufu.Test.Run(): suite is not a test suite.");
			}
			
			try
			{
				suite.Setup();
			}
			catch(ex)
			{
				processErr(ex);
				return;
			}
			
			for (var i = 0; i < suite.Cases.length; i++)
			{
				$l.Info("Running test case: " + suite.Cases[i].Name);
				try
				{
					suite.Cases[i].Initialize();
				}
				catch(ex)
				{
					processErr(ex);
					break;
				}
				
				try
				{
					suite.Cases[i].Run();
					$l.Pass();
					suite.Cases[i].Finalize();
				}
				catch(ex)
				{
					processErr(ex);
				}
			}
				
			try
			{
				suite.Cleanup();
			}
			catch(ex)
			{
				processErr(ex);
				return;
			}
		}
		
		if (isWinLoaded || document.body != null)
		{
			innerRun.call(this, suiteClass);
		}
		else
		{
			(new doufu.Browser.Element(window)).OnLoad.Attach(new doufu.Event.CallBack(function()
			{
				isWinLoaded = true;
				innerRun.call(this, suiteClass);
			}, this));
		}


	}
};

doufu.Test.Suite = function()
{
	$c(this);
	
	this.Setup = function()
	{
		
	}
	
	this.Cases = [];
	
	this.NewCase = function(name, objective, init, steps, finl)
	{
		if (!String.isString(name) || !String.isString(objective))
		{
			throw doufu.System.Exception("doufu.Test.Suite.NewCase()::name and objective must be a string.");
		}
		
		if (this.Cases[name] != null)
		{
			throw doufu.System.Exception("doufu.Test.Suite.NewCase()::A case with same name already be defined.");
		}
		
		var testCase = new doufu.Test.Case(init, steps, finl);
		testCase.Name = name;
		testCase.Objective = objective;
		
		this.Cases.push(testCase);
		
		this.Cases[name] = testCase;
		
	}
	
	this.OverloadMethod("NewCase", function(name, init, steps, finl)
	{
		this.NewCase(name, "", init, steps, finl);
	});
	
	this.OverloadMethod("NewCase", function(name, steps)
	{
		this.NewCase(name, "", null, steps, null);
	});
	

	this.Cleanup = function()
	{
		
	}
};

doufu.Test.Case = function(init, steps, finl)
{
	var emptyFunc = function(){};
	this.Name;
	this.Objective;
	if (arguments.length == 1 || (steps == null && finl == null))
	{
		this.Initialize = emptyFunc;
		this.Run = init;
		this.Finalize = emptyFunc;
	}
	else if (arguments.length == 3)
	{
		this.Initialize = init != null?init:emptyFunc;
		this.Run = steps;
		this.Finalize = finl != null?finl:emptyFunc;
	}
	else
	{
		throw doufu.System.Exception("parameter number is inccorrect!");
	}
};

doufu.Test.Logger = new function()
{
	var elLog ;
	var LOG_NAME = "doufu_test_logger";
	
	var appendMsg= function(msg)
	{
		elLog.innerHTML = elLog.innerHTML + "<br />" + msg.replace("\n", "<br />");
	}
	
	this.Info = function(msg)
	{
		appendMsg(String.format("<span style='color:#333333;'>Info:{0}</span>", msg));
	}
	this.Error = function(msg, error)
	{
		appendMsg(String.format("<span style='color:#FF33FF;'>Error, {0}:{1} at line: {2}, stack trace: {3}</span>", 
			msg, error.toString(), error.lineNumber, error.getStackTrace()));
	}
	
	this.Warning = function(msg)
	{
	}
	this.Pass = function()
	{
		appendMsg("<span style='color:#00FF00;'>Pass</span>");
	}
	
	this.Fail = function(msg)
	{
		appendMsg(String.format("<span style='color:#FF0000;'>Failed:{0}</span>", msg));
	}
	
	this.Initialize = function()
	{
		elLog = doufu.Browser.DOM.QuickSelect(LOG_NAME);
		if (elLog == null)
		{
			elLog = document.createElement("div");
			elLog.id = LOG_NAME;
			document.body.appendChild(elLog);
		}
	};
		
	
	this.Ctor = function()
	{
		(new doufu.Browser.Element(window)).OnLoad.Attach(new doufu.Event.CallBack(function()
		{
			this.Initialize();
		}, this));
		
	}
	
	this.Ctor();
	
};

$l = doufu.Test.Logger;

/*
	Class: doufu.Test.Failure
	
	Inherit: Error
*/
doufu.Test.Failure = function(msg)
{
	$c(this);
	
	this.Type = doufu.Test.Failure;
	this.Name = "Failure";
	this.message = msg;
}
doufu.Test.Failure.prototype = new Error("Test failure");

/*
	Class: doufu.Test.Assert
	
	sort of assert functions.
*/
doufu.Test.Assert = new function()
{
	var undefine2Blank = function(comment)
	{
		return comment == null?"":comment;
	}
	this.IsTrue = function(value, comment)
	{
		comment = undefine2Blank(comment);
		if (value != true)
		{
			throw new doufu.Test.Failure(comment);
		}
		
		return true;
	}
	
	this.WillError = function(func, comment)
	{
		comment = undefine2Blank(comment);
		var bErrored = false;
		try
		{
			func();
		}
		catch(ex)
		{
			if (ex instanceof doufu.Test.Failure)
			{
				throw ex;
			}
			
			bErrored = true;
		}
		
		if (!bErrored)
		{
			throw new doufu.Test.Failure("Expected an error was thrown but caught nothing.\r\n " + comment);
		}
		
		return true;
	}
	
	this.WillNoError = function(func, comment)
	{
		comment = undefine2Blank(comment);

		try
		{
			func();
		}
		catch(ex)
		{
			if (ex instanceof doufu.Test.Failure)
			{
				throw ex;
			}
			
			throw new doufu.Test.Failure("Expected no error was thrown but caught an error," + comment + ": " + ex.message);
		}

		return true;
	}
}

$a = doufu.Test.Assert;