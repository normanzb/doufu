:Init
@rem Define variables

set __version=0.0.0.1
set __packmode=jsmin
set __binariespath=.\binaries\
set __filenames=

@rem #######################################

@rem add commands

for /f %%f in (BuildList.txt) do set __filenames=!__filenames! %%f 

%__binariespath%Packer.exe -o %__binariespath%nsc.packed.js -m %__packmode% %__filenames%

@rem Write version number
echo nsc.__version = "%__version%"; >> %__binariespath%nsc.packed.js

:CleanUp

set __version=
set __filenames=
set __packmode=
set __binariespath=