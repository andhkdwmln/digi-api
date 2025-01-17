import fetch = require("node-fetch");
require('dotenv').config();

import { createMD5Encrypt, createRandomID } from "./helpers/helpers";

export class Topup {

    private _url: string;
    private _username: string;
    private _apiKey: string;

    constructor () {

        this._url = "https://api.digiflazz.com";

        // DIGIFLAZZ DATA
        this._username = process.env.API_USERNAME || "";
        this._apiKey = process.env.NODE_ENV === "development" ? process.env.API_DEVELOPMENT || "" : process.env.API_PRODUCTION || "";

    }

    /**
     * @returns {Promise<any>} - Saldo
    */
    public async Saldo (): Promise<any> {

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

    /**
     * @param {string} method - Method [ 'prepaid' or 'pasca' ]
     * @param {string} skucode - Kode Produk / Buyer SKU Code
     * @param {string} category - Kategori Produk [ 'pulsa', 'data', 'pln', 'game', 'emoney' ]
     * @param {string} brand - Brand Produk [ 'telkomsel', 'indosat', 'xl', 'tri', 'smartfren', 'axis', 'bolt', 'pln', 'game', 'emoney' ]
     * @param {string} type - Tipe Produk [ 'Umum', 'Membership', etc ]
     * 
     * @returns {Promise<any>} - Daftar Harga
    */
    public async DaftarHarga (method: string, skucode: string, category: string, brand: string, type: string): Promise<any> {

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

    /**
     * @param {string} buyer_sku_code - Kode Produk ( Cek di daftar harga )
     * @param {string} customer_number - Nomor HP / ID Pelanggan / ID Game
     * 
     * @returns {Promise<any>} - Transaksi
    */
    public async Transaksi (buyer_sku_code: string, customer_number: string): Promise<any> {

        try {

            let ref_id = createRandomID();

            const req = await fetch(this._url + '/v1/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': this._username,
                    'buyer_sku_code': buyer_sku_code,
                    'customer_no': customer_number,
                    'ref_id': ref_id,
                    'sign': createMD5Encrypt(this._username + this._apiKey + ref_id)
                })
            });

            const res = await req.json();
            return res;
            
        } catch (e) {
            return e;
        }

    }

    /**
     * @param {string} buyer_sku_code - Kode Produk ( Cek di daftar harga )
     * @param {string} customer_no - Nomor HP / ID Pelanggan / ID Game
     * @param {string} ref_id - ID Transaksi
     * 
     * @returns {Promise<any>} - Status Transaksi
    **/
    public async Status (buyer_sku_code: string, customer_no: string, ref_id: string): Promise<any> {

        try {

            const req = await fetch(this._url + '/v1/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': this._username,
                    'buyer_sku_code': buyer_sku_code,
                    'customer_no': customer_no,
                    'ref_id': ref_id,
                    'sign': createMD5Encrypt(this._username + this._apiKey + ref_id)
                })
            });

            const res = await req.json();
            return res;
            
        } catch (e) {
            return e;
        }

    }

}