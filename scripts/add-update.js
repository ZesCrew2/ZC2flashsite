const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const UPDATES_CONFIG = path.join(__dirname, '../assets/img/updates-config.json');
const GENERATE_SCRIPT = path.join(__dirname, 'generate-rss.js');

const title = process.argv[2];
const content = process.argv[3];

if (!title || !content) {
    console.log('Usage: node scripts/add-update.js "Update Title" "Update Content"');
    console.log('Example: node scripts/add-update.js "Site Launch" "We are finally live!"');
    process.exit(1);
}

async function addUpdate() {
    let data = { updates: [] };

    try {
        const raw = await fs.readFile(UPDATES_CONFIG, 'utf8');
        data = JSON.parse(raw);
    } catch (e) {
        if (e.code !== 'ENOENT') {
            console.error('Error reading config, starting fresh:', e.message);
        }
    }

    const newUpdate = {
        date: new Date().toISOString(),
        title: title,
        content: content
    };

    // Add to the beginning so newest is first --thorns
    data.updates.unshift(newUpdate);

    await fs.writeFile(UPDATES_CONFIG, JSON.stringify(data, null, 2));
    console.log(`Added update: "${title}" to config. --thorns`);

    // Automatically regenerate the RSS file --thorns
    try {
        const { stdout, stderr } = await execAsync(`node "${GENERATE_SCRIPT}"`);
        if (stdout) process.stdout.write(stdout);
        if (stderr) process.stderr.write(stderr);
    } catch (e) {
        console.error('Failed to regenerate RSS:', e.message);
    }
}

addUpdate().catch(err => {
    console.error('add-update failed:', err);
    process.exit(1);
});
