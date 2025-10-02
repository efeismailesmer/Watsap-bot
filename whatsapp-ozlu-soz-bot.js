/**
 * WhatsApp Özlü Söz Botu
 * Biri sana "özlü söz söyle" yazınca otomatik romantik mesaj gönderir
 */

import qrcode from "qrcode-terminal";
import pkg from 'whatsapp-web.js';
const { Client: WAClient, LocalAuth } = pkg;

// Mesaj kategorileri
const MESAJLAR = {
  ozur: [
    "Canım benim, biliyorum ki çok hata yaptım ve seni üzdüm. Senin o güzel yüzünde üzüntü görmek beni derinden yaralıyor. Sen benim dünyamsın, hayatımın anlamısın.\n\nSeninle geçirdiğim her an benim için paha biçilmez. Lütfen beni affet, bir daha asla aynı hatayı yapmayacağıma söz veriyorum. Sen olmadan hiçbir şey anlamlı değil.\n\nAffeder misin beni? 🥺❤️💔",
    
    "Aşkım, şu an seninle kavgalı olmak beni o kadar üzüyor ki anlatamam. Biliyorum hata bende ve yaptığım yanlışın farkındayım.\n\nAma şunu da bilmeni istiyorum: Sen benim hayatımın en değerli hazinesin. Seninle olmak, seninle gülmek, seninle mutlu olmak benim en büyük hayalim.\n\nLütfen bu küçük anlaşmazlık aramıza set olmasın. Seni çok ama çok seviyorum. Affet beni lütfen 💕🌹",
    
    "Sevgilim, seninle geçirdiğimiz her güzel anı düşündüğümde bu kavganın ne kadar anlamsız olduğunu anlıyorum.\n\nSen benim kalbimin tek sahibisin ve seninle kavgalı olmak beni hasta ediyor. Yanlış yaptım, hata yaptım, bunu kabul ediyorum.\n\nAma seni kaybetmeyi asla kabul edemem. Sen benim her şeyimsin, rüyalarımın gerçeğisin. Lütfen gel barışalım, gel mutlu olalım birlikte. Özür dilerim canım 🥺💖"
  ],
  
  ask: [
    "Canım benim, her sabah uyandığımda ilk düşündüğüm şey sensin. Sen benim dünyamsın, hayatımın merkezisin.\n\nSeninle geçirdiğim her an, her dakika, her saniye benim için paha biçilmez. Gözlerine baktığımda tüm evren duruyor, sadece sen varsın.\n\nSeni seviyorum, seni çok ama çok seviyorum. Sen benim en güzel gerçeğim, en değerli hazinemsin. Sensiz bir hayat düşünemiyorum bile. Seni sonsuza kadar sevmeye söz veriyorum 🌍❤️💕",
    
    "Aşkım, seni düşündükçe içim gülümsüyor. Sen benim kalbimin tek sahibisin. Seninle tanıştığım gün hayatım tamamen değişti, her şey daha güzel oldu.\n\nSeninle olmak beni dünyanın en şanslı insanı yapıyor. Her gün seninle uyanmak, her gece seninle uyumak istiyorum.\n\nSeninle bir ömür geçirmek, seninle yaşlanmak hayalim. Sen benim herşeyimsin, aşkımsın, hayatımsın. Seni çok seviyorum canım 💖😍",
    
    "Sevgilim, seninle geçirdiğim her an benim için bir hediye. Sen benim güneşimsin, karanlık günlerimde aydınlığımsın.\n\nYanımda olduğun her anda kendimi güvende ve mutlu hissediyorum. Seninle gülmek, seninle ağlamak, seninle her şeyi paylaşmak istiyorum.\n\nSen benim rüyalarımın gerçeğisin, hayallerimin ötesinde bir mucizesin. Seni sonsuza kadar sevmeye söz veriyorum aşkım ❤️💝"
  ],
  
  romantik: [
    "Canım, her sabah uyandığımda ilk düşündüğüm şey senin o güzel gülüşün. Sen benim güneşimsin, karanlık gecelerimde ay ışığımsın.\n\nSeninle her an özel, seninle her gün bir bayram. Elini tuttuğumda tüm korkularım yok oluyor, yanımda olduğun her anda kendimi tam hissediyorum.\n\nSen benim için bir mucizesin, hayatımın en güzel armağanısın. Var ol aşkım, var ol hep benimle 🌅❤️💕",
    
    "Sevgilim, seninle geleceği düşündükçe içim heyecanla doluyor. Seninle bir ev kurmayı, seninle çocuk sahibi olmayı, seninle yaşlanmayı hayal ediyorum.\n\nHer hayal ettiğimde içim mutlulukla doluyor. Sen benim hayallerimin gerçeğisin, gelecek planlarımın merkezindesin.\n\nSeninle bir ömür geçirmek, seninle her güne uyanmak istiyorum. Sen benim kaderimsin aşkım 💍❤️🌟"
  ],
  
  barisma: [
    "Canım benim, şu an düşünüyorum da bu kavga gerçekten değer mi? Hayat zaten yeterince zor, biz birbirimize zorluk çıkarmak yerine destek olmalıyız.\n\nSeninle olmak, seninle mutlu olmak, seninle gülmek istiyorum. Kavga etmeye değmez, hayat seninle çok daha güzel.\n\nGel barışalım, gel sarılalım birbirimize. Seni seviyorum ve seninle mutlu olmak istiyorum aşkım 🤗❤️💕",
    
    "Sevgilim, belki ikimiz de hata yaptık bu tartışmada. Belki sen haklısın, belki ben, belki ikimiz de. Ama önemli olan bu değil.\n\nÖnemli olan bizim sevgimiz, birbirimize olan bağlılığımız. Ben sensiz yapamam, sen olmadan hayat anlamsız.\n\nGel bu küslüğü bitirelim, gel mutlu olalım birlikte. Barışalım mı canım? Seni çok seviyorum 💕🥺"
  ],
  
  komik: [
    "Tamam canım haklısın, ben tam bir aptalım! Ama biliyor musun? Seninle tartışmaktan çok seninle güler eğlenmeyi tercih ederim.\n\nŞimdi barıştığımıza göre bana bir öpücük borçlusun değil mi? Hem tartışmayı da sen kazandın, hem de öpücük hakkını kullanıyorum. Adil olalım lütfen!\n\n😄😘 (Bu arada dondurma da ısmarlarsan çok mutlu olurum 🍦❤️)",
    
    "Sevgilim, itiraf ediyorum: Sen olmadan hayat çok sıkıcı! Netflix bile sarmıyor, yemekler lezzetsiz geliyor, müzikler bile güzel gelmiyor.\n\nAnlıyorum ki sen benim her şeyimsin. Şimdi gel barışalım, gel gülümsemeye başlayalım yeniden.\n\nSöz sen haklısın ben haksızım, oldu mu? 😅❤️ (Ama ciddi anlamda seni çok seviyorum ha!)"
  ],
  
  derin: [
    "Canım, seninle kavga ettiğimde aslında kendimle kavga ediyorum gibi oluyor. Çünkü sen artık benim bir parçamsın, ruhum, kalbim, herşeyimsin.\n\nSeni üzdüğümde kendimi üzüyorum. İki insan bir araya gelip bir bütün olunca, o iki insan artık ayrı değil, tek bir kalp gibi olur.\n\nİşte biz de öyleyiz. Sen benim eksik parçam, sen benim tamamlayıcımsın. Seni seviyorum ❤️💕",
    
    "Sevgilim, gerçek aşkın ne olduğunu düşünüyorum. Gerçek aşk mükemmel olmak değil, hatalarımıza, kusurlarımıza rağmen birbirimizi seçmek, birbirimize sahip çıkmak.\n\nBen seni tüm kusurlarınla, tüm hatalarınla seçiyorum. Çünkü sen benim için mükemmelsin.\n\nİlişkiler kolay değil, çaba ister, sabır ister, anlayış ister. Ve ben bu çabayı senin için göstermeye her zaman hazırım 💕🌹"
  ],
  
  yalnizlik: [
    "Bazen insan kendini çok yalnız hissediyor. Etrafında binlerce insan olsa da içindeki boşluğu dolduramıyor kimse.\n\nAma biliyorum ki bu yalnızlık geçici. Bir gün mutlaka birisi gelecek ve tüm bu yalnızlığı unutturacak. O güne kadar kendime sahip çıkacağım, güçlü kalacağım.\n\nÇünkü yalnızlık beni daha güçlü yapıyor, beni bana tanıtıyor. Ve doğru kişiyle karşılaştığımda, kendimi tam tanıyan biri olacağım 🌙💫",
    
    "Gece yarısı sessizlikte düşünüyorum. Neden böyle yalnızım, neden hiç kimse gerçekten anlamıyor beni diye.\n\nAma sonra fark ediyorum: Bu yalnızlık aslında bir hazırlık dönemi. Kendimi tanımak, güçlenmek, bağımsız olmayı öğrenmek için.\n\nBir gün doğru kişi geldiğinde, ona muhtaç değil, hazır bir insan olacağım. Yalnızlık beni yıkmıyor, daha da güçlendiriyor 💪🌟",
    
    "Herkes mutlu çiftleri görünce içim burkuluyor. Ben de sevilmek, değer görmek, sarılmak istiyorum. Ama kimse yok.\n\nAma şunu biliyorum: Yalnız olmak yanlış biriyle olmaktan bin kat daha iyi. Sabır göstereceğim, kendime değer vereceğim.\n\nDoğru kişi geldiğinde, tüm bu bekleme değecek. O zamana kadar kendimi sevmeyi öğreneceğim 💕🌹",
    
    "Bazen öyle anlar oluyor ki sadece birinin yanımda olmasını, elimi tutmasını, 'her şey yoluna girecek' demesini istiyorum.\n\nAma o an kimse yok. Sadece ben ve düşüncelerim. Ama bu beni daha güçlü yapıyor, bağımsız olmayı öğretiyor.\n\nYalnızlık acı veriyor ama aynı zamanda beni ben yapıyor. Ve bir gün bunun karşılığını alacağım 🌙❤️"
  ]
};

// Kullanıcı durumlarını sakla (hangi adımda olduklarını)
const kullaniciDurumlari = new Map();

// Anahtar kelimeler
const TETIKLEYICILER = [
  "özlü söz",
  "özlü söz söyle",
  "mesaj yaz",
  "romantik mesaj",
  "aşk mesajı",
  "barışma mesajı",
  "özür mesajı",
  "sevgi sözü",
  "güzel söz"
];

// WhatsApp client
const waClient = new WAClient({
  authStrategy: new LocalAuth({ clientId: "ozlu-soz-bot" })
});

waClient.on("qr", qr => {
  console.log("📱 WhatsApp QR kodu (telefonla okut):");
  qrcode.generate(qr, { small: true });
});

waClient.on("ready", () => {
  console.log("✅ WhatsApp hazır!");
  console.log("🤖 Özlü Söz Botu çalışıyor!");
  console.log("📝 Biri sana 'özlü söz söyle' yazarsa menü gösterecek\n");
});

// Kategoriden rastgele mesaj seç
function kategoridenMesaj(kategori) {
  const mesajlar = MESAJLAR[kategori];
  return mesajlar[Math.floor(Math.random() * mesajlar.length)];
}

// Menü mesajı oluştur
function menuMesaji() {
  return `💝 *ÖZLÜ SÖZ BOTU - MENÜ* 💝

Nasıl bir mesaj istiyorsun?

1️⃣ Özür Mesajı (Affet beni)
2️⃣ Aşk Mesajı (Seni seviyorum)
3️⃣ Romantik Mesaj (Duygusal)
4️⃣ Barışma Mesajı (Hadi barışalım)
5️⃣ Komik Mesaj (Eğlenceli)
6️⃣ Derin Mesaj (Anlamlı)
7️⃣ Rastgele Mesaj (Sürpriz)
8️⃣ Yalnızlık Mesajı (Hüzünlü)

*Seçmek için sadece numara yaz (1-8)*`;
}

// Mesaj tetikleyici kontrolü
function tetikleyiciVarMi(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return TETIKLEYICILER.some(t => lower.includes(t));
}

// Gelen mesajları dinle
waClient.on("message", async (msg) => {
  console.log(`\n🔔 YENİ MESAJ ALINDI!`);
  console.log(`   Kimden: ${msg.from}`);
  console.log(`   Benden mi: ${msg.fromMe ? 'EVET' : 'Hayır'}`);
  console.log(`   İçerik: "${msg.body}"`);
  
  // Not: Kendi mesajlarına da cevap veriyor (test için)
  // if (msg.fromMe) return;  // Bu satırı kapattık
  
  const text = msg.body || "";
  const userId = msg.from;
  
  // Tetikleyici var mı kontrol et (menü göster)
  const tetikVarMi = tetikleyiciVarMi(text);
  console.log(`   Tetikleyici var mı: ${tetikVarMi ? '✅ EVET' : '❌ Hayır'}`);
  
  if (tetikVarMi) {
    console.log(`\n💬 Menü isteği geldi: ${userId}`);
    console.log(`   İçerik: ${text.slice(0, 50)}...`);
    
    // Kullanıcıyı "menü bekleniyor" durumuna al
    kullaniciDurumlari.set(userId, { durum: 'menu_secimi_bekliyor' });
    
    // Menüyü gönder
    try {
      await msg.reply(menuMesaji());
      console.log(`   ✅ Menü gönderildi!\n`);
    } catch (error) {
      console.error(`   ❌ Hata: ${error.message}\n`);
    }
    return;
  }
  
  // Kullanıcı menü seçimi yapıyorsa
  const kullaniciDurumu = kullaniciDurumlari.get(userId);
  if (kullaniciDurumu && kullaniciDurumu.durum === 'menu_secimi_bekliyor') {
    const secim = text.trim();
    
    let mesaj = null;
    let kategoriAdi = "";
    
    switch(secim) {
      case '1':
        mesaj = kategoridenMesaj('ozur');
        kategoriAdi = "Özür";
        break;
      case '2':
        mesaj = kategoridenMesaj('ask');
        kategoriAdi = "Aşk";
        break;
      case '3':
        mesaj = kategoridenMesaj('romantik');
        kategoriAdi = "Romantik";
        break;
      case '4':
        mesaj = kategoridenMesaj('barisma');
        kategoriAdi = "Barışma";
        break;
      case '5':
        mesaj = kategoridenMesaj('komik');
        kategoriAdi = "Komik";
        break;
      case '6':
        mesaj = kategoridenMesaj('derin');
        kategoriAdi = "Derin";
        break;
      case '7':
        // Rastgele kategori seç
        const kategoriler = Object.keys(MESAJLAR);
        const rastgeleKategori = kategoriler[Math.floor(Math.random() * kategoriler.length)];
        mesaj = kategoridenMesaj(rastgeleKategori);
        kategoriAdi = "Rastgele";
        break;
      case '8':
        mesaj = kategoridenMesaj('yalnizlik');
        kategoriAdi = "Yalnızlık";
        break;
      default:
        // Geçersiz seçim
        try {
          await msg.reply("❌ Geçersiz seçim! Lütfen 1-8 arası bir sayı yaz.\n\nYeni menü için 'özlü söz' yaz.");
          console.log(`   ⚠️ Geçersiz seçim: ${secim}\n`);
        } catch (error) {
          console.error(`   ❌ Hata: ${error.message}\n`);
        }
        kullaniciDurumlari.delete(userId);
        return;
    }
    
    // Mesajı gönder
    if (mesaj) {
      console.log(`\n📨 ${kategoriAdi} mesajı gönderiliyor: ${userId}`);
      try {
        await msg.reply(`💌 *${kategoriAdi} Mesajı:*\n\n${mesaj}\n\n━━━━━━━━━━━━━━━━━━━━━\n💡 _Başka mesaj için tekrar 1-7 arası sayı yaz!_\n💝 _Yeni menü için "özlü söz" yaz_`);
        console.log(`   ✅ Mesaj gönderildi!\n`);
      } catch (error) {
        console.error(`   ❌ Hata: ${error.message}\n`);
      }
    }
    
    // Kullanıcı durumunu SILME - böylece tekrar sayı yazabilir
    // kullaniciDurumlari.delete(userId);  // Bu satırı kapattık!
  }
});

// Başlat
console.log("🚀 WhatsApp Özlü Söz Botu başlatılıyor...\n");
await waClient.initialize();

