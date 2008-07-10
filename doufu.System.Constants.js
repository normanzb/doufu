doufu.System.Constants = new Object();

doufu.System.Constants.TYPE_UNDEFINED = typeof undefined;

// Alias, this pollute the globle environment but we have to do this to reduce workload.
$Undefined = doufu.System.Constants.TYPE_UNDEFINED;