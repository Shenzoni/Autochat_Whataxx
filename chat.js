process.on('unhandledRejection', e => console.log('UNHANDLED:', e));
process.on('uncaughtException', e => console.log('CRASH:', e));

const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const readline = require('readline');

const FOLLOWUP_TEXT = 'Halo kak, ini follow up dari kami ya 🙏';
const SESSIONS_DIR = './sessions';
const CHROME_DATA_DIR = './chrome-data';

if (!fs.existsSync(CHROME_DATA_DIR)) fs.mkdirSync(CHROME_DATA_DIR);
if (!fs.existsSync(SESSIONS_DIR)) {
    console.log('[X] Folder sessions tidak ditemukan');
    process.exit(1);
}

const sessionFolders = fs.readdirSync(SESSIONS_DIR).filter(f => f.startsWith('session-'));
if (!sessionFolders.length) {
    console.log('[X] Tidak ada session. Login dulu pakai: node login.js cs1');
    process.exit(1);
}

console.log('[✓] Session ditemukan:', sessionFolders.join(', '));

async function main() {
    for (let folder of sessionFolders) {
        const name = folder.replace('session-', '');
        console.log(`\n[+] Menyalakan session: ${name}`);
        await initClient(name);
    }
    showMenu();
}

function initClient(name) {
    return new Promise(resolve => {
        let finished = false;

        const client = new Client({
            authStrategy: new LocalAuth({ clientId: name, dataPath: SESSIONS_DIR }),
            puppeteer: {
                executablePath: '/usr/bin/chromium',
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu'
                ]
            }
        });

        const finish = async (msg) => {
            if (finished) return;
            finished = true;
            console.log(msg);
            try { await client.destroy(); } catch {}
            setTimeout(resolve, 1500);
        };

        client.on('ready', async () => {
            console.log(`[✓] SESSION ${name} READY`);
            await sendFollowUp(client, name);
            await finish(`[✓] SESSION ${name} SELESAI & DITUTUP`);
        });

        client.on('auth_failure', msg => finish(`[X] AUTH FAILURE ${name}: ${msg}`));
        client.on('disconnected', r => finish(`[!] ${name} DISCONNECTED: ${r}`));

        client.initialize();
    });
}

async function sendFollowUp(client, name) {
    if (!fs.existsSync('numbers.csv')) {
        console.log('[X] File numbers.csv tidak ditemukan');
        return;
    }

    const numbers = fs.readFileSync('numbers.csv', 'utf8')
        .split('\n')
        .map(x => x.replace(/\D/g, '').trim())
        .filter(x => x.length > 8);

    console.log(`[✓] ${name} total nomor: ${numbers.length}`);

    for (let num of numbers) {
        const chatId = num + '@c.us';
        try {
            if (!(await client.isRegisteredUser(chatId))) continue;
            await client.sendMessage(chatId, FOLLOWUP_TEXT);
            console.log(`[✓] ${name} terkirim: ${num}`);
            await delay(4000);
        } catch {
            console.log(`[X] ${name} gagal: ${num}`);
        }
    }
}

function showMenu() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    console.log(`
=========================
1. Restart
2. Exit
=========================
`);
    rl.question('Pilih: ', ans => {
        rl.close();
        if (ans === '1') {
            console.clear();
            require('child_process').execSync('node chate.js', { stdio: 'inherit' });
        } else {
            console.log('Bye 👋');
            process.exit(0);
        }
    });
}

const delay = ms => new Promise(r => setTimeout(r, ms));

process.on('SIGINT', () => {
    console.log('\n[!] CTRL+C — FORCE EXIT');
    process.exit(0);
});

main();
