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
1. data/companies.json içine company objesi ekle
2. image path kontrol et
3. logo dosyasını assets/robots içine koy
4. companies/company-name.html oluştur
5. company-profile-mark kısmına gerçek img koy
6. commit + deploy kontrol et

Logo çalışmıyorsa kontrol
- png gerçekten png mi?
- path doğru mu?
- büyük/küçük harf aynı mı?
- OM placeholder kaldı mı?


## Yeni Robot Ekleme

1. Görseli `assets/robots/` içine yükle.
2. `data/robots.json` aç.
3. Yeni robot objesini ekle.
4. `image` yolunu doğru yaz:
   `assets/robots/dosya-adi.png`
5. Commit et.
6. Robots sayfasında kontrol et.
