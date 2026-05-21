const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const UPDATES_DIR = path.join(__dirname, '../updates');
const GENERATE_SCRIPT = path.join(__dirname, 'generate-rss.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
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

    console.log('\nEnter Content (Press CTRL+D on a new line to finish, or CTRL+C to cancel):');
    let contentLines = [];
    
    // use the standard 'line' event. ctrl+d triggers 'close' --thorns
    rl.on('line', (line) => {
        contentLines.push(line);
    });

    // wait for the 'close' event (triggered by ctrl+d) --thorns
    await new Promise((resolve) => {
        rl.on('close', resolve);
    });
    
    const content = contentLines.join('\n');
    if (!content.trim()) {
        console.log('\nNo content provided. Exiting.');
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
    console.log(`\n\nSuccess! Created Markdown file: "updates/${fileName}" --thorns`);

    // Regenerate RSS immediately --thorns
    try {
        execSync(`node "${GENERATE_SCRIPT}"`, { stdio: 'inherit' });
    } catch (e) {
        console.error('Failed to regenerate RSS:', e.message);
    }
}

start();
