doufu.Test.Run(
	function()
	{
		$c(this);
		
		this.Inherit(doufu.Test.Suite);
		
		/*
			Objective: 
		*/
		this.NewCase("Implement_NoMethod", function()
		{
			$l.Info("Defining Interface...");
			var ITest = function()
			{
				$i(this);
				
				this.Declare("m");
				
				
			}
			
			var CTest = function()
			{
				$c(this);
				
				this.Implement(ITest);
			}
			
			
			$l.Info("Test error, expected a error");
			$a.WillError(function()
			{
				new CTest();
			});
		})
		
		/*
			Objective: 
		*/
		this.NewCase("Implement_NormalMethod", function()
		{
			$l.Info("Defining Interface...");
			var ITest = function()
			{
				$i(this);
				
				this.Declare("ThisIsAComplexMethodName");
				
				
			}
			
			var CTest = function()
			{
				$c(this);
				
				this.Implement(ITest);
				
				this.ThisIsAComplexMethodName = function()
				{
					
				}
			}
			
			$l.Info("Test class is: " + CTest.toString());
			
			$l.Info("Test, expected no error");
			$a.WillNoError(function()
			{
				new CTest();
			});
		});
		
		/*
			Objective: test with method starts and ends with "_"
		*/
		this.NewCase("Implement_SymbolMethodName_0", function()
		{
			$l.Info("Defining Interface...");
			var ITest = function()
			{
				$i(this);
				
				this.Declare("_ThisIsAComplexMethodName_");
				
				
			}
			
			var CTest = function()
			{
				$c(this);
				
				this.Implement(ITest);
				
				this._ThisIsAComplexMethodName_ = function()
				{
					
				}
			}
			
			$l.Info("Test class is: " + CTest.toString());
			
			$l.Info("Test, expected no error");
			$a.WillNoError(function()
			{
				new CTest();
			});
		});
		
		/*
			Objective: test with method starts and ends with "$"
		*/
		this.NewCase("Implement_SymbolMethodName_1", function()
		{
			$l.Info("Defining Interface...");
			var ITest = function()
			{
				$i(this);
				
				this.Declare("$ThisIsAComplexMethodName$");
				
				
			}
			
			var CTest = function()
			{
				$c(this);
				
				this.Implement(ITest);
				
				this.$ThisIsAComplexMethodName$ = function()
				{
					
				}
			}
			
			$l.Info("Test class is: " + CTest.toString());
			
			$l.Info("Test, expected no error");
			$a.WillNoError(function()
			{
				new CTest();
			});
		});
		
		/*
			Objective: test with method containing "_" and "$"
		*/
		this.NewCase("Implement_SymbolMethodName_2", function()
		{
			$l.Info("Defining Interface...");
			var ITest = function()
			{
				$i(this);
				
				this.Declare("T__h_is$I$$sAComplexMethodNa$$$me");
				
				
			}
			
			var CTest = function()
			{
				$c(this);
				
				this.Implement(ITest);
				
				this.T__h_is$I$$sAComplexMethodNa$$$me = function()
				{
					
				}
			}
			
			$l.Info("Test class is: " + CTest.toString());
			
			$l.Info("Test, expected no error");
			$a.WillNoError(function()
			{
				new CTest();
			});
		});
		
		/*
			Objective: test long method name
		*/
		this.NewCase("Implement_LongMethodName", function()
		{
			$l.Info("Defining Interface...");
			var ITest = function()
			{
				$i(this);
				
				this.Declare("T__h_is$I$$sAComplexMethodNa$$$meaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
				
				
			}
			
			var CTest = function()
			{
				$c(this);
				
				this.Implement(ITest);
				
				this.T__h_is$I$$sAComplexMethodNa$$$meaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa = function()
				{
					
				}
			}
			
			$l.Info("Test class is: " + CTest.toString());
			
			$l.Info("Test, expected no error");
			$a.WillNoError(function()
			{
				new CTest();
			});
		});
		
		/*
			Objective: test when toString() of implementation class is overriden
		*/
		this.NewCase("Implement_OverridenToString", function()
		{
			$l.Info("Defining Interface...");
			var ITest = function()
			{
				$i(this);
				
				this.Declare("TestMethod");
				
				
			}
			
			var CTest = function()
			{
				$c(this);
				
				this.Implement(ITest);
				
				this.TestMethod = function()
				{
					
				}
			}
			CTest.toString = function()
			{
				return "";
			};
			
			$l.Info("Test class is: " + CTest.toString());
			
			$l.Info("Test, expected no error");
			$a.WillNoError(function()
			{
				new CTest();
			});
		});
	}
);

