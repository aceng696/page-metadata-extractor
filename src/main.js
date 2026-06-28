import { Actor } from 'apify';
import { CheerioCrawler, Dataset } from 'crawlee';
import { URL } from 'node:url';

await Actor.init();

const input = await Actor.getInput();
const targetUrl = input?.url;

if (!targetUrl) {
  throw new Error('URL is required. Provide a "url" field in the input.');
}

// Validate URL
try {
  new URL(targetUrl);
} catch {
  throw new Error(`Invalid URL: ${targetUrl}`);
}

const crawler = new CheerioCrawler({
  maxRequestsPerCrawl: 1,
  maxRequestRetries: 2,
  requestHandler: async ({ $, request, response }) => {
    const ogImage = $('meta[property="og:image"]').attr('content') || null;
    const ogTitle = $('meta[property="og:title"]').attr('content') || null;
    const ogDesc = $('meta[property="og:description"]').attr('content') || null;

    const result = {
      url: request.url,
      statusCode: response?.statusCode || null,
      title: $('title').text().trim() || ogTitle,
      description: $('meta[name="description"]').attr('content') || ogDesc,
      ogImage,
      ogTitle,
      ogDescription: ogDesc,
      favicon: $('link[rel="icon"]').attr('href')
        || $('link[rel="shortcut icon"]').attr('href')
        || `${new URL(request.url).origin}/favicon.ico`,
      h1: $('h1').first().text().trim().slice(0, 200) || null,
      charset: $('meta[charset]').attr('charset')
        || $('meta[http-equiv="Content-Type"]').attr('content')
        || null,
      wordCount: $('body').text().trim().split(/\s+/).length,
      scrapedAt: new Date().toISOString(),
    };

    await Dataset.pushData(result);
    console.log(`✅ Extracted: ${result.title || 'No title'} (${result.url})`);
  },
  failedRequestHandler: async ({ request }) => {
    await Dataset.pushData({
      url: request.url,
      error: `Failed after ${request.retryCount} retries`,
      scrapedAt: new Date().toISOString(),
    });
  },
});

await crawler.run([targetUrl]);
console.log('🎉 Done. Dataset ready.');

await Actor.exit();
