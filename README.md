# CHROME EXTENSIONS - NATIVE CLIENT

Native client used by Chrome extensions written in Typescript and Node.js.

## Getting started

The project contains native client application, install script for Windows and Linux, instances of Node.js for Windows, and Linux.

## Installation

To install native client you need to install dependencies with:
```
npm install
```

Next if you are on Windows machine build project with:
```
npm run build-win
```
That command will first bundle application and copy install script and 32 and 64 bit instances of Node.js for Windows in app-build folder.

If you are Linux user than run command:
```
npm run build-linux
```
Command will do same things as command for Windows machines.


Running install script will install native client at `%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\` and registrate extension at `HKEY_CURRENT_USER/Software/Google/Chrome/NativeMessagingHosts/shutdown.extension.host` if you are Windows user. For Linux it will install client at `$HOME/.config/chrome-auto-shutdown` and creates manifest at `$HOME/.config/google-chrome/NativeMessagingHosts/shutdown.extension.host.json` for usage on Google Chrome and at `$HOME/.config/chromium/NativeMessagingHosts/shutdown.extension.host.json` for Chromium.

## Notes

* To use native client on your extension, copy your extension ID that you will find in `chrome://extensions`, and paste it to:
     * Windows: open `%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json` add another line in `allowed_origins` array that looks like `"chrome-extension://{YOUR_EXTENSION_ID}"`
     * Linux (Chrome): open `$HOME/.config/google-chrome/NativeMessagingHosts/shutdown.extension.host.json` and add another line in `allowed_origins` array that looks like `"chrome-extension://{YOUR_EXTENSION_ID}"`
     * Linux (Chromium): open `HOME/.config/chromium/NativeMessagingHosts/shutdown.extension.host.json` and add another line in `allowed_origins` array that looks like `"chrome-extension://{YOUR_EXTENSION_ID}"`
Install scripts also have commented placed where you need to paste your extension ID so you can open install script in some editor, paste it inside and run the installation again.

* System commands execution via native client sometimes does not work on Linux and Chromium (on Google Chrome I did not have any problems)
