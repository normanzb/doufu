:Init
@rem Define variables

set __version=0.0.0.2
set __packmode=jsmin
set __binariespath=.\binaries\
set __filenames=
set __chkpackagename=doufu.packed.chk.js
set __frepackagename=doufu.packed.fre.js

@rem #######################################

@rem add commands

if %1==chk goto ChkBuild
if %1==fre goto FreBuild
if %1==doc goto DocBuild

:ChkBuild

echo //CHKBuild Start > %__binariespath%%__chkpackagename%
echo ; > %__binariespath%doufu.packed.js

type .\HELPERS\DEBUGHELPER\prototype-1.4.0.js		>> %__binariespath%%__chkpackagename%
type .\HELPERS\DEBUGHELPER\logger.js				 >> %__binariespath%%__chkpackagename%

for /f %%f in (BuildList.txt) do call AppendSource.bat %%f %__binariespath%%__chkpackagename%

copy %__binariespath%%__chkpackagename% %__binariespath%doufu.packed.js

goto CleanUp

:FreBuild

for /f %%f in (BuildList.txt) do set __filenames=!__filenames! %%f 
%__binariespath%Packer.exe -o %__binariespath%%__frepackagename% -m %__packmode% %__filenames%

copy %__binariespath%%__frepackagename% %__binariespath%doufu.packed.js

goto CleanUp

:DocBuild

del %__binariespath%%__chkpackagename% /q
del %__binariespath%%__frepackagename% /q
del %__binariespath%doufu.packed.js /q

call CreateDocs.bat

goto CleanUp

:CleanUp

@rem Write version number

echo ; >> %__binariespath%doufu.packed.js
echo doufu.__version = "%__version%"; >> %__binariespath%doufu.packed.js

set __version=
set __filenames=
set __packmode=
set __binariespath=
set __chkpackagename=
set __frepackagename=
