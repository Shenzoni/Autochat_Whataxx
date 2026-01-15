## UBUNTU UPDATE & UPGRADE
```
apt update -y && apt upgrade -y && apt install git -y
```

## CHROMIUM INSTALLATION 
STEP 1: ``Copy the code then paste on termux``
```
apt install -y curl wget gnupg ca-certificates software-properties-common
apt install -y fonts-liberation \
libatk-bridge2.0-0t64 libatk1.0-0t64 libgtk-3-0t64 \
libcups2t64 libdrm2 libgbm1 libnspr4 libnss3 \
libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
xdg-utils libasound2t64
```
STEP 2: ``Copy the code then paste on termux``
```
cat <<EOF /etc/apt/sources.list.d/debian-bookworm.list
deb [signed-by=/usr/share/keyrings/debian-bookworm.gpg] http://deb.debian.org/debian bookworm main contrib non-free non-free-firmware
EOF
```
STEP 3: ``Copy the code then paste on termux``
```
curl -fsSL https://ftp-master.debian.org/keys/archive-key-12.asc \
| gpg --dearmor -o /usr/share/keyrings/debian-bookworm.gpg
```
STEP 4: ``Copy the code then paste on termux``
```
apt update
apt purge -y chromium-browser || true
rm -f /usr/bin/chromium-browser
apt install -y chromium
ln -sf /usr/bin/chromium
/usr/bin/chromium-browser
```
STEP 5: ``Copy the code then paste on termux``
```
which chromium
chromium --version
```
``Output: /usr/bin/Chromium``

``Output: 
Chromium 14xxx``

**CONGRATULATIONS 🎉 🎉**
