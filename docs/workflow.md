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
3. `node scripts/validate-data.mjs` ile alanları kontrol et.
4. Şimdilik canlı site `data/companies.json` okuduğu için aggregate dosyayı da güncel tut.
5. image path kontrol et.
6. logo dosyasını assets/robots içine koy.
7. companies/company-name.html oluştur.
8. company-profile-mark kısmına gerçek img koy.
9. commit + deploy kontrol et.

Logo çalışmıyorsa kontrol
- png gerçekten png mi?
- path doğru mu?
- büyük/küçük harf aynı mı?
- OM placeholder kaldı mı?


## Yeni Robot Ekleme

1. Yeni kayıt için önce mümkünse `data/robots/company-robot.json` dosyası oluştur.
2. `node scripts/validate-data.mjs` ile alanları kontrol et.
3. Şimdilik canlı site `data/robots.json` okuduğu için aggregate dosyayı da güncel tut.
4. Görseli `assets/robots/` içine yükle.
5. `image` yolunu doğru yaz:
   `assets/robots/dosya-adi.png`
6. Commit et.
7. Robots sayfasında kontrol et.

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
