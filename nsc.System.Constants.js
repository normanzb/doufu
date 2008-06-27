nsc.System.Constants = new Object();

nsc.System.Constants.TYPE_UNDEFINED = typeof undefined;

// Alias, this pollute the globle environment but we have to do this to reduce workload.
$Undefined = nsc.System.Constants.TYPE_UNDEFINED;