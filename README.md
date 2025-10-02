# İlan Takip Botu

Bu bot çeşitli platformlarda (Bionluk, Twitter, Instagram, TikTok, Facebook) web site/website anahtar kelimelerini arar ve yeni ilanları WhatsApp üzerinden bildirir.

## Kurulum

1. **Node.js yüklü olmalı** (v18 veya üzeri önerilir)
   - https://nodejs.org/ adresinden indirebilirsin

2. **Bağımlılıkları yükle:**
   ```bash
   npm install
   ```

3. **Ayarları düzenle (`bot.js` dosyasında):**
   - `WHATSAPP_TARGET`: Kendi WhatsApp numaranı gir (örn: "905xxxxxxxxx@c.us")
   - `CHECK_INTERVAL_MS`: Tarama aralığını ayarla (varsayılan 5 dakika)
   - `KEYWORDS`: Aranacak anahtar kelimeleri özelleştir
   - `HEADLESS`: Geliştirme için `false` yap (tarayıcıyı görmek için)

## Çalıştırma

```bash
npm start
```

veya

```bash
node bot.js
```

## İlk Kurulumda

1. Bot başlatıldığında terminalde bir **QR kod** görünecek
2. WhatsApp uygulamanı aç (telefonunda)
3. Ayarlar > Bağlı Cihazlar > Cihaz Bağla
4. QR kodu telefonunla tara
5. "WhatsApp hazır!" mesajını gördüğünde bot çalışmaya başlayacak

## Önemli Notlar

- Bot sürekli çalışır, kapatmak için `Ctrl+C` bas
- `seen.json` dosyası görülen ilanları saklar (silme!)
- `.wwebjs_auth` klasörü WhatsApp oturumunu saklar
- İlk taramada çok fazla bildirim gelebilir (normal)
- Bazı platformlar (Instagram, Facebook) giriş gerektirebilir
- Selektörler zamanla değişebilir, güncelleme gerekebilir

## Sorun Giderme

- **QR kod görünmüyor**: `HEADLESS: false` yap
- **WhatsApp bağlanmıyor**: `.wwebjs_auth` klasörünü sil ve tekrar dene
- **Tarama hatası**: Selector'ları güncelle veya `HEADLESS: false` yapıp izle


