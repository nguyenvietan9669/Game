@echo OFF

set SOUND_TYPE=M4A
set ADS_TYPE=LOCAL

call npm run build-release
xcopy /s /e /y data .release\data\
xcopy /s /e /y css .release\css\

if exist .release\\index.html (
	del /F/Q/S .release\\index.html > NUL
)

if exist .release\\data\\sound\\*.ods (
	del /F/Q/S .release\\data\\sound\\*.ods > NUL
)

set DATA_NEED_CLEAN=(M4A MP4 OGG)
for %%i in %DATA_NEED_CLEAN% do (
	if not %%i==%SOUND_TYPE% (
		if exist .release\\data\\sound\\%%i (
			rd /S /Q .release\\data\\sound\\%%i > NUL
		)		
	)
)

:end
