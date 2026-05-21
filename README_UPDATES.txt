================================================================================
                       ZC2 MICROSITE UPDATES GUIDE
================================================================================

This guide explains how to add new changelogs and updates to the ZC2 Microsite
RSS feed and Update page.

--------------------------------------------------------------------------------
1. REQUIREMENTS
--------------------------------------------------------------------------------
Before you begin, ensure you have the following installed on your computer:

- Node.js (Version 16 or higher recommended)
  Download from: https://nodejs.org/

- A Terminal / Command Prompt (CMD, PowerShell, or Bash)

--------------------------------------------------------------------------------
2. OPTION A: THE UPDATE WIZARD (RECOMMENDED)
--------------------------------------------------------------------------------
The easiest way to add an update is to use the interactive wizard. This handles
the formatting and timestamps for you.

1. Open your terminal in the project root folder.
2. Run the following command:
   
   node scripts/new-update.js

3. Follow the prompts:
   - Enter your Title.
   - Type or paste your content (supports multiple lines).
   - Press [ENTER] twice to finish.

The wizard will create the Markdown file and automatically update the RSS feed.

--------------------------------------------------------------------------------
3. OPTION B: MANUAL CREATION
--------------------------------------------------------------------------------
If you prefer to write the file yourself:

1. Create a new file in the "updates/" folder ending in ".md".
2. Use the following format (Frontmatter is REQUIRED):

---
title: Your Title Here
date: 2026-05-21T15:00:00Z
---

Your content goes here. You can use Markdown:
- **Bold text**
- *Italics*
- [Links](https://example.com)
- Bullet points

3. Save the file.
4. Run the generator to update the site (see section 4).

--------------------------------------------------------------------------------
4. REGENERATING THE RSS FEED
--------------------------------------------------------------------------------
If you manually edited or added files, you MUST run the generator script to 
rebuild the "rss.xml" file:

   node scripts/generate-rss.js

--------------------------------------------------------------------------------
Created by thorns
================================================================================
