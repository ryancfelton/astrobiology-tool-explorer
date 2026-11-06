# Astrobiology AI/ML Tool Explorer

Live site: https://ryancfelton.github.io/astrobiology-tool-explorer/

Double-click preview.command to open http://localhost:4173. Refresh after editing.
You can also open index.html directly.

The home page searches all tools and links to four category pages:
- exoplanet-detection.html
- biosignatures.html
- atmosphere-characterization.html
- language-models.html

Edit tools.js to curate the catalog. Each entry contains a science category, summary, AI/ML keywords, image and alt text, repository URL, and author publication links.
The catalog includes ExoMiner, ASTRAFier, the molecular biosignature classifier, HELA, TelescopeML, and INDUS-SDE. Add more entries using the same fields.
images/ contains tool logos, temporary category illustrations, and a figure from the linked biosignature publication.
styles.css controls the simple appearance; app.js handles search and listings.

Hosted with GitHub Pages from the main branch. To publish an update after editing and checking the local preview:

    git add .
    git commit -m "Update tool explorer"
    git push

GitHub Pages deploys the updated files automatically.

AI/ML keyword links open keyword.html with an exact keyword match across all categories.
All matching tools are included, with the originating tool listed first.
The Ames logo and creator cards are shared across pages through app.js.
The website and linkedin fields in the creators array in app.js control the profile links.
The creator portraits are placeholders.
