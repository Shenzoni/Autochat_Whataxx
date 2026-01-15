## UBUNTU INSTALLATION
**A. In termux home :** ~ $
```
apt update && apt upgrade -y && apt install proot-distro -y && proot-distro install ubuntu && proot-distro login ubuntu
```

## UBUNTU SETUP
1. Update & Upgrade Ubuntu
This code for install update and clone my repository
```
apt update && apt upgrade -y
apt install git curl wget ca-certificates gnupg -y
```
2. Clone my repository and open the folder
```
git clone https://github.com/Shenzoni/cawpauto
cd cawpauto
```
3. Install nodejs LTS
```
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt install nodejs -y
```
4. Install puppeteer dependency
```
apt install -y \
fonts-liberation libatk-bridge2.0-0 libatk1.0-0 libcups2 libdrm2 libgbm1 \
libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
xdg-utils libasound2
```
5. Install npm package
```
npm init -y
npm install whatsapp-web.js qrcode-terminal axios puppeteer-core readline crypto fs
```
6. Custom APT Source
```
cat <<EOF > /etc/apt/sources.list.d/debian-bookworm.list
deb [signed-by=/usr/share/keyrings/debian-bookworm.gpg] http://deb.debian.org/debian bookworm main contrib non-free non-free-firmware
EOF
```
7. Import GPG Debian key
```
curl -fsSL https://ftp-master.debian.org/keys/archive-key-12.asc \
| gpg --dearmor -o /usr/share/keyrings/debian-bookworm.gpg
```

*SETUP UBUNTU DONE 👍*
