var doufu = new Object();

doufu.PseudoCompiler = function(){
	
}

doufu.PseudoCompiler.BaseHeader = function(){
	
}

//an alias for BaseHeader
doufu.h = doufu.PseudoCompiler.BaseHeader;

///##########################
/// Javascript Namespace
/// Name: OOP
/// Description: Object-orented implementation.
///##########################

doufu.OOP = new Object();

///##########################
/// Javascript Method
/// Name: _callBacker
/// Description: .
///##########################

doufu.OOP._callBacker=function(_m,_c){
	var method = _m;
	var context = _c;
	return function(_args){
		return method.apply(context,_args);
	}
}

doufu.OOP._baseClassFunctions = function(__nsc_OOP_baseClassFunc_oContext)
{
	this.NewProperty = function(sPropertyName)
	{
		return doufu.OOP.Property(sPropertyName, __nsc_OOP_baseClassFunc_oContext);
	}
	
	this.Inherit = function(baseClass, args)
	{
		return doufu.OOP.Inherit(__nsc_OOP_baseClassFunc_oContext, baseClass, args);
	}
	
	this.InstanceOf = function(type)
	{
		return doufu.OOP.InstanceOf(__nsc_OOP_baseClassFunc_oContext, type);
	}
	
	this.OverloadMethod = function(sMethodName, pFunc)
	{
		return doufu.OOP.OverloadMethod(__nsc_OOP_baseClassFunc_oContext, sMethodName, pFunc)
	}
	
	this.Implement = function(baseInterface)
	{
		return doufu.OOP.Implement(__nsc_OOP_baseClassFunc_oContext, baseInterface)
	}
	
	this.IsImplemented = function(baseInterface)
	{
		return doufu.OOP.IsImplemented(__nsc_OOP_baseClassFunc_oContext, baseInterface);
	}
}

doufu.OOP.Class = function(oContext)
{
	doufu.OOP.Inherit(oContext, doufu.OOP._baseClassFunctions,  [oContext]);
}

// this class will be used as a member of the inheritance stack.
doufu.OOP._inheritance = function()
{
	this.Ref = null;
	this.__nsc_OOP_Inherit_Stack = null;
}

doufu.OOP.Inherit = function(obj,baseClass,args)
{
	
	// Check if the baseClass already in the inheritance stacks
	var oCurr = obj;
	while (oCurr.__nsc_OOP_Inherit_Stack != null)
	{
		// If already existed in stack, exit;
		if (oCurr.__nsc_OOP_Inherit_Stack.Ref == baseClass)
		{
			return;
		}
		oCurr = oCurr.__nsc_OOP_Inherit_Stack;
	}
	
	obj.OverrideMethod = function(methodName, fn){
		this["_base_" + methodName] = this[methodName];
		this[methodName]=fn;
	}

	// TO DO: this line might be removed.
	// v-hoxu - 1/31/2008 Removed
	//var temp = obj.constructor;
	//obj.constructor.prototype = new baseClass();
	//obj.constructor = temp;
	//delete temp;
	
	// Create __nsc_OOP_Inherit_Parent stack for inheritance tracing.
	var oTemp = new doufu.OOP._inheritance();

	if (obj.__nsc_OOP_Inherit_Stack != null)
	{
		oTemp.__nsc_OOP_Inherit_Stack = obj.__nsc_OOP_Inherit_Stack;
	}
	
	obj.__nsc_OOP_Inherit_Stack = oTemp;
	obj.__nsc_OOP_Inherit_Stack.Ref = baseClass;


	if (args != null)
	{
		baseClass.apply(obj,args);
	}
	else
		baseClass.apply(obj);
	
}


///##########################
/// Javascript Static Method
/// Name: doufu.OOP.OverloadMethod
/// Description: 
/// An overload implementation.
/// By John Resig (MIT Licensed)
/// Sample:
///	  function Users(){
///	  addMethod(this, "find", function(){
///	    // Find all users...
///	  });
///	  addMethod(this, "find", function(name){
///	    // Find a user by name
///	  });
///	  addMethod(this, "find", function(first, last){
///	    // Find a user by first and last name
///	  });
///	}
///##########################
doufu.OOP.OverloadMethod = function(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
    if ( fn.length == arguments.length )
       return fn.apply( this, arguments );
    else if ( typeof old == 'function' )
       return old.apply( this, arguments );
   };
}


//Property toString redirector
doufu.OOP._propertyRedirector=function(){
	return function(){
		return this.call();
	}
}

//Property Builder
doufu.OOP.Property = function(sPropertyName, oContext){
	
	// If no context specified, make pFunc as property directly.
	if (oContext == null)
	{
		if (typeof sPropertyName == "function")
		{
			sPropertyName.toString = doufu.OOP._propertyRedirector();
			sPropertyName.valueOf = doufu.OOP._propertyRedirector();
		}
		else
		{
			throw doufu.System.Exception("if the oContext is not specified, the sPorpertyName must be a function pointer.");
		}
	}
	else
	{
		
		oContext[sPropertyName] = function(value)
		{
			if (
				value != null &&
				typeof value != undefined //don't use doufu.System.Constants.TYPE_UNDEFINED, so that doufu.js can be used indivdually
				)
			{
				oContext[sPropertyName].Set.call(oContext, value);
			}

			return oContext[sPropertyName].Get.call(oContext);
		}
		
		oContext[sPropertyName].Get = function()
		{
			return value;
		};
		oContext[sPropertyName].Set = function(value)
		{
			
		};

		
		oContext[sPropertyName].toString = doufu.OOP._propertyRedirector();
		oContext[sPropertyName].valueOf = doufu.OOP._propertyRedirector();
	}
	
}

doufu.OOP.InstanceOf = function(rInstance, type)
{
	// Use native keyword to exam if it is a instance of specified type.
	if (rInstance instanceof type)
	{
		return true;
	}
	
	if (rInstance.constructor == type)
	{
		return true;
	}

	var currentInstance;

	currentInstance = rInstance;

	// Looping __nsc_OOP_Inherit_Parent stacks which constructed by nsc framework
	// to see if instance is a specified type
	while (currentInstance.__nsc_OOP_Inherit_Stack != null)
	{
		if (currentInstance.__nsc_OOP_Inherit_Stack.Ref == type)
		{
			return true;
		}
		currentInstance = currentInstance.__nsc_OOP_Inherit_Stack;
	}
	
	// If still not matched type found, looping the javascript native constructor.prototype stacks
	var bRet = false;
	
	var previousType ;
	var currentType;
	
	var StackUp = function(rInstance)
	{
		return rInstance.constructor.prototype;
	}
	
	currentInstance = rInstance;
	
	currentType = currentInstance.constructor;
	
	while(previousType != currentType)
	{
		previousType = currentType;
		currentInstance = StackUp(currentInstance);
		currentType = currentInstance.constructor;
		if (currentType == type)
		{
			bRet = true;
			break;
		}
	}
	
	return bRet;
}

doufu.OOP.Implement = function(oContext, oBaseInterface)
{
	// Initialize all Declare array value.
	new oBaseInterface();
	
	if (typeof oBaseInterface.__nsc_OOP_DeclareArray == typeof undefined)
	{
		throw new Error("doufu.OOP.Implement: " + oBaseInterface + "is not a interface!");
	}
	
	for (var i = 0; i < oBaseInterface.__nsc_OOP_DeclareArray.length; i++)
	{
		// if the implementation was not found in direct constructor, dig into the inheritance stack.
		if (oContext.constructor.toString().indexOf(
			oBaseInterface.__nsc_OOP_DeclareArray[i]) == -1)
		{
			var currentInstance;
			var bFound = false;

			currentInstance = oContext;

			while (currentInstance.__nsc_OOP_Inherit_Stack != null)
			{
				if (currentInstance.__nsc_OOP_Inherit_Stack.Ref.toString().indexOf(
					oBaseInterface.__nsc_OOP_DeclareArray[i]) != -1)
				{
					bFound = true;
					break;
				}
				currentInstance = currentInstance.__nsc_OOP_Inherit_Stack;
			}
			
			if (!bFound)
			{
				throw new Error("doufu.OOP.Implement: Method " + oBaseInterface.__nsc_OOP_DeclareArray[i] + " must be implemented!");
			}
		}
	}
		
	if (typeof oContext.__nsc_OOP_BaseInterface == typeof undefined)
	{
		oContext.__nsc_OOP_BaseInterface = new Array();
	}
	oContext.__nsc_OOP_BaseInterface.push(oBaseInterface);

}

doufu.OOP.IsImplemented = function(oContext, oBaseInterface)
{
	// Check if the specified interface is existed in the internal interface array
	for (var i = 0; i < oContext.__nsc_OOP_BaseInterface.length; i++)
	{
		if (oContext.__nsc_OOP_BaseInterface[i] == oBaseInterface)
		{
			return true;
		}
	}
	
	return false;
}

doufu.OOP.Declare = function(sMethodName, oContext)
{
	// add the method name to Declare array
	if (typeof oContext.constructor.__nsc_OOP_DeclareArray == typeof undefined)
	{
		oContext.constructor.__nsc_OOP_DeclareArray = new Array();
	}
	
	var bFound = false;
	// if the method was not added, then add it into array.
	for (var i = 0; i < oContext.constructor.__nsc_OOP_DeclareArray.length; i++)
	{
		if (oContext.constructor.__nsc_OOP_DeclareArray[i] == sMethodName)
		{
			bFound = true;
		}
	}
	if (!bFound)
	{
		oContext.constructor.__nsc_OOP_DeclareArray.push(sMethodName);
	}
}

doufu.OOP.Interface = function(oContext)
{
	doufu.OOP.Inherit(oContext, doufu.OOP._baseInterfaceFunctions,  [oContext]);
}

doufu.OOP._baseInterfaceFunctions = function(__nsc_OOP_baseInterfaceFunc_oContext)
{
	this.Declare = function(sMethodName)
	{
		return doufu.OOP.Declare(sMethodName, __nsc_OOP_baseInterfaceFunc_oContext);
	}
}

// Aliases, this pollute the global environment but we have to do this to reduce workload.
$c = doufu.OOP.Class;
$i = doufu.OOP.Interface;