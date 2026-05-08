# RoboLogAI beehiiv setup

The homepage newsletter block is connected to the RoboLogAI beehiiv subscribe form.

1. Open beehiiv.
2. Go to **Settings** or **Audience Growth** and open **Subscribe Forms**.
3. Create or copy an embedded subscribe form.
4. Copy the form ID from the embed script.

Current RoboLogAI embed:

```html
<script async src="https://subscribe-forms.beehiiv.com/v3/loader.js" data-beehiiv-form="a2276ff1-1ab2-4061-a197-67f1f0c2a726"></script>
```

Then update `index.html`:

```html
<div class="beehiiv-shell" data-beehiiv-form-id="a2276ff1-1ab2-4061-a197-67f1f0c2a726">
```

After this, the homepage newsletter panel will load the live beehiiv signup form and new subscribers will be stored in beehiiv.

If beehiiv gives you the full embed code instead, send that code to Codex and paste it exactly into the newsletter block.
