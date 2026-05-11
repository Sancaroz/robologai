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

## Yeni Şirket Ekleme

1. `data/companies.json` aç.
2. Yeni şirket objesini ekle.
3. JSON virgül/kapanış kontrolü yap.
4. Commit et.
5. Companies sayfasında ara.

## Yeni Robot Ekleme

1. Görseli `assets/robots/` içine yükle.
2. `data/robots.json` aç.
3. Yeni robot objesini ekle.
4. `image` yolunu doğru yaz:
   `assets/robots/dosya-adi.png`
5. Commit et.
6. Robots sayfasında kontrol et.
