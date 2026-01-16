## UBUNTU INSTALLATION
**A. In termux home :** ~ $
```
apt update && apt upgrade -y && apt install proot-distro -y && proot-distro install ubuntu && proot-distro login ubuntu
```
```
apt update && apt install -y \
  libnss3 \
  libatk1.0-0t64 \
  libatk-bridge2.0-0t64 \
  libcups2t64 \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libasound2t64 \
  libpangocairo-1.0-0 \
  libgtk-3-0t64
```
## UBUNTU SETUP
1. Update & Upgrade Ubuntu
This code for install update and clone my repository
```
apt update && apt upgrade -y
apt install -y curl git nano ca-certificates
```

2. Install Chromium & check
```
apt install -y chromium && apt install git -y
```
```
which chromium
chromium --version
```
Output : ``/usr/bin/chromium | chromium 143xxx``
           
4. Install NodeJS v20 & check
```
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```
```
node -v
npm -v
```
Output : `` v20.20.0 | 10.8.2 ``

5. Clone repository
```
git clone https://github.com/Shenzoni/cawpauto
cd cawpauto
```
6. Init repository
```
npm init -y
```
7. Install npm dependency
```
npm install whatsapp-web.js puppeteer-core csv-parser qrcode-terminal
```

*SETUP UBUNTU DONE 👍*
