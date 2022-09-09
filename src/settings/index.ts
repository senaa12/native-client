const fs = require('fs'); 
const path = require('path');
const filePath = path.resolve(process.cwd(), './settings.json');

const logger = require('../logger');

interface MailSettings {
    smtp: string;
    port: number; 
    username: string;
    password: string;
}

interface SettingsDto {
    mailSettings: MailSettings;
}

class Settings {
    constructor() {
        this.initializeSettings();
    }

    private _initializationPromise: Promise<void> | undefined;
    private _settings: SettingsDto | undefined;

    private _defaultSettings: SettingsDto = {
        mailSettings: {
            password: '',
            port: 465,
            smtp: '',
            username: ''
        }
    }

    private _setSettings = (response: any) => {
        this._settings = response;
    }

    initializeSettings = () => {
        if (this._initializationPromise === undefined) {
            this._initializationPromise = new Promise((res, rej) => {
                fs.readFile(filePath, {encoding: 'utf-8'}, function(err: any,data: any) {
                    if (err) {
                        logger.log('Error while reading settings', err);
                        rej(err);
                        return;
                    }
                
                    res(data);
                })
            })
            .then((res: any) => { this._setSettings(JSON.parse(res) as SettingsDto) })
            .catch(() => { this._setSettings(this._defaultSettings) });
        }

        return this._initializationPromise;
    }

    getMailSettings = () => {
        return this._settings?.mailSettings;
    }

}

const settings = new Settings();
module.exports = settings;