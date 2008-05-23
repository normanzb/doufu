set __buildType=chk

if "%1"=="fre" set __buildType=%1

cmd /V:ON /C CallPacker.bat %__buildType%