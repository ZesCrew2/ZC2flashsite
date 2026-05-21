const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const UPDATES_CONFIG = path.join(__dirname, '../assets/img/updates-config.json');
const GENERATE_SCRIPT = path.join(__dirname, 'generate-rss.js');

const title = process.argv[2];
const content = process.argv[3];

if (!title || !content) {
    console.log('Usage: node scripts/add-update.js "Update Title" "Update Content"');
    console.log('Example: node scripts/add-update.js "Site Launch" "We are finally live!"');
    process.exit(1);
}

function addUpdate() {
    let data = { updates: [] };

    if (fs.existsSync(UPDATES_CONFIG)) {
        try {
            data = JSON.parse(fs.readFileSync(UPDATES_CONFIG, 'utf8'));
        } catch (e) {
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

    fs.writeFileSync(UPDATES_CONFIG, JSON.stringify(data, null, 2));
    console.log(`Added update: "${title}" to config. --thorns`);

    // Automatically regenerate the RSS file --thorns
    try {
        execSync(`node "${GENERATE_SCRIPT}"`, { stdio: 'inherit' });
    } catch (e) {
        console.error('Failed to regenerate RSS:', e.message);
    }
}

addUpdate();
