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

    /*
    * @return {Promise<any>} - Return current balance
    */
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

    /*
    * @param {string} method - Method for topup (prepaid or pasca)
    * @param {string} skucode - buyer sku code
    * @param {string} category - Category for topup (pulsa, paket-data, pln, etc)
    * @param {string} brand - Brand for topup (telkomsel, indosat, pln, etc)
    * @param {string} type - Type for topup (umum, membership, etc)
    */
    public async DaftarHarga (method: string, skucode: string, category: string, brand: string, type: string) {

        try {

            const req = await fetch(this._url + '/v1/price-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'cmd': method ? method : 'prepaid',
                    'username': this._username,
                    'code': skucode ? skucode : null,
                    'category': category ? category : null,
                    'brand': brand ? brand : null,
                    'type': type ? type : null,
                    'sign': createMD5Encrypt(this._username + this._apiKey + 'pricelist')
                })
            });
            
            const res = await req.json();
            return res;

        } catch (e) {
            return e;
        }
    }

}