@echo OFF

set MASTER_DATA=%~dp0\master_data\
set RELEASE_DATA=%~dp0\data\

call npm run data-export
:end
