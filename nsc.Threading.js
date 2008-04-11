/// <PseudoCompileInfo>
/// 	<Dependencies>
/// 		<Dependency>nsc.js</Dependency>
/// 	</Dependencies>
/// </PseudoCompileInfo>

nsc.Cycling = new Object();

///##########################
/// Javascript Static Method
/// Name: Block
/// Description: Block the native browser Cycle.
///				 NOTE!! : Should not block browser too long
///				          otherwise some browser will prompt
///						  user to kill the javascript execution.
///##########################
nsc.Cycling.Block = function(milliseconds)
{
      var sleeping = true;
      var now = new Date();
      var alarm;
      var startingMSeconds = now.getTime();
      while(sleeping)
      {
         alarm = new Date();
         var alarmMSeconds = alarm.getTime();
         if(alarmMSeconds - startingMSeconds > milliseconds){ sleeping = false; }
      }      
}