:Init
@rem Define variables

set __version=0.0.0.1
set __packmode=jsmin
set __binariespath=.\binaries\
set __filenames=

@rem #######################################

@rem add commands

if %1==chk set __filenames=%__filenames% ./HELPERS/DEBUGHELPER/prototype-1.4.0.js ./HELPERS/DEBUGHELPER/logger.js

for /f %%f in (BuildList.txt) do set __filenames=!__filenames! %%f 

%__binariespath%Packer.exe -o %__binariespath%doufu.packed.js -m %__packmode% %__filenames%

@rem Write version number
echo doufu.__version = "%__version%"; >> %__binariespath%doufu.packed.js

:CleanUp

set __version=
set __filenames=
set __packmode=
set __binariespath=