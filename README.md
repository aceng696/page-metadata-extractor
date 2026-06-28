# Page Metadata Extractor — Apify Actor

Extract metadata (title, description, OG tags, favicon, word count) from any webpage URL.

## Input

```json
{ "url": "https://example.com" }
```

## Output

```json
{
  "url": "https://example.com",
  "statusCode": 200,
  "title": "Example Domain",
  "description": "This domain is for use in illustrative examples...",
  "ogImage": "https://example.com/og.jpg",
  "favicon": "https://example.com/favicon.ico",
  "h1": "Example Domain",
  "wordCount": 42,
  "scrapedAt": "2026-06-28T10:00:00.000Z"
}
```

## Use Cases

- **AutoApply**: Preview job listing metadata before deep scrape
- **SEO audit**: Check OG tags and meta descriptions
- **Link preview**: Generate link cards from URLs

## Tech

- CheerioCrawler — lightweight, no browser, fast
- Apify SDK v3
- Node.js 20

## License

MIT
