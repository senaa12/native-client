# CHROME EXTENSIONS - NATIVE CLIENT

Chrome native client written in Node.js.

**Host app:** Typescript Nodejs native application used to execute system (in this case, shutdown) commands

* **installation** - installation scripts, naming per system

     *Windows* - installs native application at `%LOCALAPPDATA%\Chrome-Shutdown-Extension-Host\` and registrates extension at `HKEY_CURRENT_USER/Software/Google/Chrome/NativeMessagingHosts/shutdown.extension.host`.
     
     *Linux* - installs native application at `$HOME/.config/chrome-auto-shutdown` and creates manifest at `$HOME/.config/google-chrome/NativeMessagingHosts/shutdown.extension.host.json` for usage on Google Chrome and at `$HOME/.config/chromium/NativeMessagingHosts/shutdown.extension.host.json` for Chromium (**IMPORTANT** on Chromium extension sometimes does not work properly).

* **src** - complete native client code

To install the native part first you need to place install script and build an application in the same folder. Than open install script in some editor replace extension ID (line above is commented to highlight where change needs to be made) with the ID you remembered (the one on `chrome://extensions/`). That is all next you just need to run the install script.