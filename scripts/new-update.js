const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const UPDATES_DIR = path.join(__dirname, '../updates');
const GENERATE_SCRIPT = path.join(__dirname, 'generate-rss.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function start() {
    console.log('\n--- ZC2 Update Wizard (Markdown) --- --thorns');
    
    const title = await ask('Update Title: ');
    if (!title) {
        console.log('Title required. Exiting.');
        rl.close();
        return;
    }

    console.log('\nEnter Content (Press Enter twice to finish):');
    let contentLines = [];
    
    // Multi-line input logic --thorns
    for await (const line of rl) {
        if (line === '') break;
        contentLines.push(line);
    }
    
    const content = contentLines.join('\n');
    if (!content) {
        console.log('Content required. Exiting.');
        rl.close();
        return;
    }

    if (!fs.existsSync(UPDATES_DIR)) {
        fs.mkdirSync(UPDATES_DIR);
    }

    const timestamp = new Date().toISOString();
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const fileName = `${timestamp.split('T')[0]}-${safeTitle}.md`;
    const filePath = path.join(UPDATES_DIR, fileName);

    const mdContent = `---
title: ${title}
date: ${timestamp}
---

${content}
`;

    fs.writeFileSync(filePath, mdContent);
    console.log(`\nSuccess! Created Markdown file: "updates/${fileName}" --thorns`);

    // Regenerate RSS immediately --thorns
    try {
        execSync(`node "${GENERATE_SCRIPT}"`, { stdio: 'inherit' });
    } catch (e) {
        console.error('Failed to regenerate RSS:', e.message);
    }

    rl.close();
}

start();
