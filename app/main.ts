import fetch = require("node-fetch");
require('dotenv').config();

import { createMD5Encrypt } from "./helpers/helpers";

export class Topup {

    private _url: string;
    private _username: string;
    private _apiKey: string;

    constructor () {

        this._url = "https://api.digiflazz.com";

        // DIGIFLAZZ DATA
        this._username = process.env.API_USERNAME || "";
        if (process.env.NODE_ENV === "development") {
            this._apiKey = process.env.API_DEVELOPMENT || "";
        } else {
            this._apiKey = process.env.API_PRODUCTION || "";
        }

    }


    public async Saldo () {

        try {

            const req = await fetch(this._url + '/v1/cek-saldo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'cmd': 'deposit',
                    'username': this._username,
                    'sign': createMD5Encrypt(this._username + this._apiKey + 'depo')
                })
            });
            
            const res = await req.json();
            return res;

        } catch (e) {
            return e;
        }
    }

}