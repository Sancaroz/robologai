# RoboLogAI Workflow Notes

## Yeni Blog Ekleme Sırası

1. `blog/` klasörüne yeni HTML dosyası oluştur.
   Örnek:
   `blog/embodied-tien-kung-3.html`

2. Blog HTML içeriğini yapıştır.

3. Blog görseli varsa:
   `assets/robots/`
   veya
   `assets/blog/`
   klasörüne yükle.

4. `content/posts.json` dosyasını aç.

5. `"posts": [` satırının hemen altına yeni blog kaydını ekle.

6. JSON yapısını kontrol et:
   - Objeler arasında virgül olmalı.
   - Son objeden sonra virgül olmamalı.
   - Dosya `{ "posts": [ ... ] }` şeklinde kapanmalı.

7. Commit mesajı yaz:
   `Add new blog post`

8. Siteyi kontrol et:
   - Ana sayfa Latest Posts bölümü
   - Direkt blog URL
   - Görsel
   - Share on X butonu

Yeni şirket ekleme sırası
1. Yeni şirket kaydı oluştur:
   `node scripts/add-company.mjs`
2. İstersen tek satır komutla da oluşturabilirsin:
   `node scripts/add-company.mjs --name "Example Robotics" --website "https://example.com/" --category "Humanoid Robotics" --country "USA" --robot "Example Bot" --keywords "humanoid, robotics"`
3. Logo kullanacaksan önerilen yol:
   `assets/companies/company-slug/logo.svg`
4. Tek satırda logo da verebilirsin:
   `node scripts/add-company.mjs --name "Example Robotics" --website "https://example.com/" --category "Humanoid Robotics" --country "USA" --logo "assets/companies/example-robotics/logo.svg"`
5. Script otomatik olarak:
   - `data/companies/company-slug.json` dosyasını oluşturur
   - `data/companies.json` aggregate dosyasını günceller
   - `companies/*.html` ve `robots/*.html` profil sayfalarını yeniden üretir
   - data validation çalıştırır
6. Sadece modüler JSON oluşturmak istersen:
   `node scripts/add-company.mjs --skip-build`
7. Commit + deploy kontrol et.

Yeni robot ekleme sırası
1. Önce şirketin `data/companies/` veya `data/companies.json` içinde olduğundan emin ol.
2. Yeni robot kaydını soru-cevapla oluştur:
   `node scripts/add-robot.mjs`
3. İstersen tek satır komutla da oluşturabilirsin:
   `node scripts/add-robot.mjs --name "Example Bot" --company "Example Robotics" --category "Humanoid" --country "USA" --use-case "Factory work" --source "https://example.com/bot"`
4. Script otomatik olarak:
   - `data/robots/company-robot.json` dosyasını oluşturur
   - `data/robots.json` aggregate dosyasını günceller
   - `companies/*.html` ve `robots/*.html` profil sayfalarını yeniden üretir
   - data validation çalıştırır
5. Sadece modüler JSON oluşturmak istersen:
   `node scripts/add-robot.mjs --skip-build`
6. Robot görseli için önerilen path:
   `assets/robots/robot-slug/hero.png`

Logo çalışmıyorsa kontrol
- png gerçekten png mi?
- path doğru mu?
- büyük/küçük harf aynı mı?
- OM placeholder kaldı mı?


## Yeni Robot Ekleme (manuel dosya yöntemi)

1. Script kullanmak istemiyorsan yeni kayıt için `data/robots/company-robot.json` dosyası oluştur.
2. Mevcut robotu küçük bir bilgiyle güncelliyorsan dosya kısmi olabilir; örnek olarak sadece `name`, `company`, `price` gibi alanlar yazılabilir. Script merkezi kayıttan eksikleri tamamlar.
3. Yeni robot ekliyorsan zorunlu alanları tam yaz: `name`, `company`, `category`, `country`, `status`, `availability`, `price`, `useCase`, `source`.
4. `node scripts/build-data.mjs` ile dry-run yap.
5. `node scripts/build-data.mjs --write` ile `data/robots.json` aggregate dosyasını üret.
6. `node scripts/validate-data.mjs` ile alanları kontrol et.
7. Görseli `assets/robots/` içine yükle.
8. `image` yolunu doğru yaz:
   `assets/robots/dosya-adi.png`
9. Commit et.
10. Robots sayfasında kontrol et.

## Modüler Data Geçişi

- Canlı runtime hâlâ `data/companies.json`, `data/robots.json`, `data/signals.json` dosyalarını okur.
- Yeni modüler kaynak klasörleri:
  - `data/companies/`
  - `data/robots/`
  - `data/signals/`
- Güvenlik kontrolü:
  `node scripts/validate-data.mjs`
- Dry-run aggregate kontrolü:
  `node scripts/build-data.mjs`
- Aggregate dosyaları yazmak için:
  `node scripts/build-data.mjs --write`
- Robot kayıtları canonical slug ile birleşir. Örneğin merkezi `G1` kaydı ile `data/robots/unitree-g1.json` aynı robot olarak ele alınır.
- Modüler robot dosyaları tam kayıt veya mevcut merkezi kayda uygulanan kısmi override olabilir.
