import { createHash } from 'crypto';

export function createMD5Encrypt(data: string): string {
    return createHash('md5').update(data).digest('hex');
}