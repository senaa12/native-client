echo Setting up
@echo off

IF "%~1"=="" (
    @echo Installling native client for: Auto shutdown extension extension 
    set EXTENSION_ID=heanibacideokneklnfomdlokppmcaam
) ELSE (
    @echo Installing native client for extension with id: %~1
    set EXTENSION_ID=%~1
)

set IS_NODE_INSTALLED=0
where node.exe >nul 2>&1 && SET IS_NODE_INSTALLED=1 

MKDIR %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host

REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\shutdown.extension.host" /ve /t REG_SZ /d "%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json" /f

@echo { > %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json
@echo   "name": "shutdown.extension.host", >> %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json
@echo   "description": "Chrome Shutdown-Extension native app.", >> %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json
@echo   "path": "run.bat", >> %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json
@echo   "type": "stdio", >> %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json
@echo   "allowed_origins": [ >> %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json
@echo     "chrome-extension://%EXTENSION_ID%/" >>%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json
@echo   ] >> %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json
@echo } >> %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json

copy host.js %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host
copy settings.json %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host

@echo @echo off > %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\run.bat
if %IS_NODE_INSTALLED%==0 (
    @echo Coping installers node build
    @echo "%~dp0node.exe" "%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\host.js" >> %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\run.bat

    if "%PROCESSOR_ARCHITECTURE%"=="AMD64" (
        copy node-64.exe "%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\node.exe"
    ) else (
        copy node-86.exe "%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\node.exe"
    )
) else (
    @echo Using systems node
    @echo "node" "%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\host.js" >> %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\run.bat
)

echo Setup complete, installed in %LOCALAPPDATA%\Chrome-Shutdown-Extension-Host
pause