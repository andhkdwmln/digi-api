import { createHash } from 'crypto';

// Create MD5 encrypt
export function createMD5Encrypt(data: string): string {
    return createHash('md5').update(data).digest('hex');
}

// Create SHA1 encrypt
export function createSHA1Encrypt(data: string): string {
    return createHash('sha1').update(data).digest('hex');
}

// Create Randomize
export function createRandomID () {
    
    let date: any = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < 2; i++) {
        randomString += string.charAt(Math.floor(Math.random() * string.length));
    }

    let encrypt = createSHA1Encrypt(year + month + day + hour + minute + second + randomString);
    return encrypt;
    
}