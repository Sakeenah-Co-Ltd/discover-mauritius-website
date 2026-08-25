/**
 * Whether this build may be indexed by search engines.
 *
 * Every push to `main` deploys (`.github/workflows/deploy.yml`), so without an
 * explicit gate an unfinished build — sample reviews, placeholder pricing, draft
 * tours — becomes crawlable the moment it goes up. Default is closed.
 *
 * **To open the site to search engines at launch**, set the GitHub repository
 * *variable* `NEXT_PUBLIC_ALLOW_INDEXING` to `true` (Settings → Secrets and
 * variables → Actions → Variables) and re-run the deploy. It is read at build
 * time, not runtime, so it only takes effect on the next build.
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
