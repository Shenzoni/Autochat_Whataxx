const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const readline = require('readline');
const crypto = require('crypto');
const fs = require('fs');

const LICENSE_URL = 'https://pastebin.com/raw/deUxNKDg';

const AUTHOR = 'ShenzoID';
const BUILDER = 'NINJA KEDAONG';
const CREATED_AT = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});

const SESSION_NAME = process.argv[2];
if (!SESSION_NAME) {
    console.log('\nUsage: node login.js cs1\n');
    process.exit(1);
}

function askPass() {
    return new Promise(resolve => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question('Masukkan License Key: ', p => {
            rl.close();
            resolve(p.trim());
        });
    });
}

async function checkLicense() {
    const pass = await askPass();
    try {
        const res = await axios.get(LICENSE_URL, { timeout: 10000 });
        const list = res.data.split('\n');

        const hash = crypto.createHash('md5').update(pass).digest('hex');
        const found = list.find(x => x.startsWith(hash + '|'));

        if (!found) {
            console.log('\n[X] LICENSE INVALID\n');
            process.exit(1);
        }

        const exp = found.split('|')[1];
        if (new Date(exp) < new Date()) {
            console.log('\n[X] LICENSE EXPIRED\n');
            process.exit(1);
        }

        console.log('\n[✓] LICENSE VALID\n');
    } catch {
        console.log('\n[X] FAILED TO VERIFY LICENSE SERVER\n');
        process.exit(1);
    }
}

console.clear();
console.log(`
===========================================
      WHATSAPP MULTI SESSION LOGIN
===========================================
 Author     : ${AUTHOR}
 Script By  : ${BUILDER}
 Created At : ${CREATED_AT}
===========================================
`);

(async () => {

await checkLicense();

let isReady = false;

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: SESSION_NAME,
        dataPath: './sessions'
    }),
    puppeteer: {
        executablePath: process.env.CHROME_PATH || '/usr/bin/chromium',
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

client.on('qr', qr => {
    console.log(`\n[!] Scan QR langsung agar tidak terjadi error\n`);
    console.log(`[+] SESSION : ${SESSION_NAME}\n`);
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    if (isReady) return;
    isReady = true;

    console.log(`\n[✓] SESSION "${SESSION_NAME}" LOGIN SUCCESS & SAVED`);
    console.log('[✓] Shutting down chromium & process...\n');

    try {
        await client.destroy();
    } catch {}

    setTimeout(() => {
        process.exit(0);
    }, 1500);
});

process.on('SIGINT', async () => {
    console.log('\n[!] CTRL+C DETECTED — FORCE EXIT...');
    try { await client.destroy(); } catch {}
    process.exit(0);
});

client.initialize();

})();
