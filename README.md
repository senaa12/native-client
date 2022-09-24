# CHROME EXTENSIONS - NATIVE CLIENT

Native client used by Chrome extensions written in Typescript and Node.js.

## Getting started

The project contains native client application, install script for Windows and Linux, instances of Node.js for Windows, and Linux.

## Build

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

## Installation

After the build in the `./app-build` folder, you will find the install script. The install script accepts one argument; that argument is the ID of the extension you want this native client to be installed for. If you do not pass an argument, the install script will install the native client for Auto Shutdown Extension.

* **Windows** - Run the script with: `./install.bat extension_id` where extension_id is the ID; note: **do not put quote marks**; The install script will install the native client at `%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\` and register it at Registery editor at `HKEY_CURRENT_USER/Software/Google/Chrome/NativeMessagingHosts/shutdown.extension.host`
* **Linux** -  After the build, you need to make install script executable with̨̆ `chmod` command. Run the script with: `./install.sh extension_id` where extension_id is the ID; The install script will install the native client at `$HOME/.config/chrome-auto-shutdown` and creates manifest at `$HOME/.config/google-chrome/NativeMessagingHosts/shutdown.extension.host.json` for usage on Google Chrome and at `$HOME/.config/chromium/NativeMessagingHosts/shutdown.extension.host.json` for Chromium => *not tested on Linux*
* **Mac OS** - After the build, you need to make install script executable with̨̆ `chmod` command. Run the script with: `./install.sh extension_id` where extension_id is the ID; The install script will install the native client at `$HOME/.config/chrome-auto-shutdown` and creates manifest at `$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts/shutdown.extension.host.json` for usage on Google Chrome and at `$HOME/Library/Application Support/Chromium/NativeMessagingHosts/shutdown.extension.host.json` for Chromium

## Using

After the installation you can use native client from your Chrome extension pretty standard with `chrome.runtime.sendNativeMessage` where native part name is **shutdown.extension.host**. You can also copy message types from `./common-native-client` to your project. Then you have a `NativeMessage` type in your extension.

If you want to send mail, or dispatch some similar message that requires settings, replace values in `./settings/settings.json` with custom values. When you want to use settings make sure you await the `initializeSettings()` function so settings would load.

## Adding another extension to native client

To use native client in different extension, copy your extension ID (that you will find in `chrome://extensions`), and paste it to:

* **Windows**: open `%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\shutdown.extension.host.chrome.json` add another line in `allowed_origins` array that looks like `"chrome-extension://{YOUR_EXTENSION_ID}/"`
* **Linux (Chrome)**: open `$HOME/.config/google-chrome/NativeMessagingHosts/shutdown.extension.host.json` and add another line in `allowed_origins` array that looks like `"chrome-extension://{YOUR_EXTENSION_ID}/"`
* **Linux (Chromium)**: open `HOME/.config/chromium/NativeMessagingHosts/shutdown.extension.host.json` and add another line in `allowed_origins` array that looks like `"chrome-extension://{YOUR_EXTENSION_ID}/"`
* **Max OS (Chrome)**: open `$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts/shutdown.extension.host.json` and add another line in `allowed_origins` array that looks like `"chrome-extension://{YOUR_EXTENSION_ID}/"`
* **Max OS (Chromium)**: open `$HOME/Library/Application Support/Chromium/NativeMessagingHosts/shutdown.extension.host.json` and add another line in `allowed_origins` array that looks like `"chrome-extension://{YOUR_EXTENSION_ID}/"`
     
## Notes 

* If you want to send mail to multiple persons at once; instead of setting `to` field to a single email address, just put multiple email addresses comma separated
* System commands execution via native client sometimes does not work on Linux and Chromium (on Google Chrome I did not have any problems)
