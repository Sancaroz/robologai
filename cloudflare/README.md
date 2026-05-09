# RoboLogAI beehiiv Worker

This Worker lets `robologai.com` accept newsletter emails directly on the site and send them to beehiiv without redirecting the reader.

## Required Cloudflare setup

1. Create a Worker.
2. Paste `beehiiv-subscribe-worker.js`.
3. Replace `pub_REPLACE_WITH_YOUR_PUBLICATION_ID` with the beehiiv publication ID.
4. Add a Worker secret named `BEEHIIV_API_KEY`.
5. Add a route for `robologai.com/api/subscribe`.

The website form posts to `/api/subscribe`. If the Worker is not live yet, the page shows the backup beehiiv signup link.
