# Page Metadata Extractor

Extract metadata (title, description, OG tags, favicon, word count) from any webpage URL.

## Input

```json
{ "url": "https://example.com" }
```

## Output

```json
{
  "title": "Example Domain",
  "description": "This domain is for use in illustrative examples...",
  "ogImage": "https://example.com/og.jpg",
  "statusCode": 200,
  "wordCount": 42
}
```

## Tech

- CheerioCrawler — lightweight, no browser
- Apify SDK v3 — Node.js 20

## License

MIT
