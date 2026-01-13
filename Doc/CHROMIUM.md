## CHROMIUM INSTALLATION 
STEP 1:
```
apt update && apt upgrade -y
apt install -y curl wget gnupg ca-certificates software-properties-common
apt install -y fonts-liberation \
libatk-bridge2.0-0t64 libatk1.0-0t64 libgtk-3-0t64 \
libcups2t64 libdrm2 libgbm1 libnspr4 libnss3 \
libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
xdg-utils libasound2t64
```
STEP 2:
```
cat <<EOF /etc/apt/sources.list.d/debian-bookworm.list
deb [signed-by=/usr/share/keyrings/debian-bookworm.gpg] http://deb.debian.org/debian bookworm main contrib non-free non-free-firmware
EOF
```
STEP 3:
```
curl -fsSL https://ftp-master.debian.org/keys/archive-key-12.asc \
| gpg --dearmor -o /usr/share/keyrings/debian-bookworm.gpg
```
STEP 4:
```
apt update
apt purge -y chromium-browser || true
rm -f /usr/bin/chromium-browser
apt install -y chromium
ln -sf /usr/bin/chromium
/usr/bin/chromium-browser
```
STEP 5:
```
which chromium
```
``Output: /usr/bin/Chromium``

STEP 6:
```
chromium --version
```
``Output: 
Chromium 14xxx``

**CONGRATULATIONS 🎉 🎉**
