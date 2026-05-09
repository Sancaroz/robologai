# RoboLogAI beehiiv Worker

This Worker lets `robologai.com` accept newsletter emails directly on the site and send them to beehiiv without redirecting the reader.

## Required Cloudflare setup

1. Create a Worker.
2. Paste `beehiiv-subscribe-worker.js`.
3. Add a Worker variable named `BEEHIIV_PUBLICATION_ID`.
4. Add a Worker secret named `BEEHIIV_API_KEY`.
5. Add a Worker custom domain for `api.robologai.com`.

The website form posts to `https://api.robologai.com/subscribe`. If the Worker is not live yet, the page shows the backup beehiiv signup link.
