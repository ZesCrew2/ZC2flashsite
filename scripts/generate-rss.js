const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

// config --thorns
const SITE_URL = 'https://zc2flashsite.com';
const UPDATES_DIR = path.join(__dirname, '../updates');
const RSS_OUTPUT = path.join(__dirname, '../rss.xml');
const JSON_OUTPUT = path.join(__dirname, '../updates.json');

async function generateRSS() {
    // Ensure updates directory exists --thorns
    try {
        await fs.mkdir(UPDATES_DIR, { recursive: true });
    } catch (e) { /* already exists */ }

    const allFiles = await fs.readdir(UPDATES_DIR);
    const mdFiles = allFiles.filter(f => f.endsWith('.md'));

    // Read all markdown files concurrently --thorns
    const fileContents = await Promise.all(
        mdFiles.map(async (file) => {
            const fullPath = path.join(UPDATES_DIR, file);
            const content = await fs.readFile(fullPath, 'utf8');
            return { file, fullPath, content };
        })
    );

    let items = [];

    for (const { file, fullPath, content } of fileContents) {
        // Simple Frontmatter Parser --thorns
        const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);

        if (match) {
            const yaml = match[1];
            const body = match[2].trim();

            const titleMatch = yaml.match(/title:\s*(.*)/);
            const dateMatch = yaml.match(/date:\s*(.*)/);

            const title = titleMatch ? titleMatch[1].trim() : file;
            let dateStr;
            if (dateMatch) {
                dateStr = dateMatch[1].trim();
            } else {
                const stat = await fs.stat(fullPath);
                dateStr = stat.mtime.toISOString();
            }

            items.push({
                title: title,
                link: SITE_URL,
                description: markdownToHtml(body),
                body: body,
                pubDate: new Date(dateStr).toUTCString(),
                isoDate: new Date(dateStr).toISOString(),
                timestamp: new Date(dateStr).getTime()
            });
        }
    }

    // Sort by date (newest first) --thorns
    items.sort((a, b) => b.timestamp - a.timestamp);

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<!-- Last Generated: ${new Date().toISOString()} -->
<?xml-stylesheet type="text/xsl" href="assets/css/rss-style.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2007/Atom">
<channel>
  <title>The ZesCrew2 Microsite Updates</title>
  <link>${SITE_URL}</link>
  <description>Standard computer-readable updates for the ZC2 microsite.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  ${items.map(item => `
  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${item.link}</link>
    <description><![CDATA[${item.description}]]></description>
    <pubDate>${item.pubDate}</pubDate>
    <guid isPermaLink="false">${item.title.replace(/\s+/g, '-')}-${item.timestamp}</guid>
  </item>`).join('')}
</channel>
</rss>`;

    // Pre-shaped JSON payload for low-spec clients (smaller than XML, no parse cost) --thorns
    const updatesJson = {
        generated: new Date().toISOString(),
        count: items.length,
        updates: items.map(item => ({
            title: item.title,
            date: item.isoDate,
            body: item.body
        }))
    };

    // Write both outputs concurrently --thorns
    await Promise.all([
        fs.writeFile(RSS_OUTPUT, rssXml),
        fs.writeFile(JSON_OUTPUT, JSON.stringify(updatesJson))
    ]);

    console.log(`RSS feed generated at rss.xml from ${items.length} markdown files. --thorns`);
    console.log(`JSON feed generated at updates.json (${Buffer.byteLength(JSON.stringify(updatesJson))} bytes). --thorns`);
}

function markdownToHtml(md) {
    // Simple regex parser for basic markdown --thorns
    let html = md
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:orange">$1</a>');

    // Handle bullet points --thorns
    html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
    html = html.replace(/((<li>[\s\S]*?<\/li>\s*)+)/g, '<ul>$1</ul>');

    // Paragraphs and line breaks --thorns
    return html.split(/\n\n+/).map(p => {
        if (p.trim().startsWith('<ul')) return p;
        return `<p>${p.trim().replace(/\n/g, '<br/>')}</p>`;
    }).join('\n');
}

function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, function(c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '\"': return '&quot;';
            default: return c;
        }
    });
}

generateRSS().catch(err => {
    console.error('RSS generation failed:', err);
    process.exit(1);
});
