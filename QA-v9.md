# Gallery verification, 2026-10-14

- Desktop browser: left canvas and right information column share the same vertical center (measured centers differ by less than 0.1px). 4:3 canvas fits without black letterboxing.
- 390px viewport: document width equals scroll width, no horizontal overflow; stacked layout inspected.
- Photographic bookmark overlay inspected in the browser. Native canvas PNG export completed successfully; no console errors observed.
- Product labels, background availability and current-design overlay remain synchronized. Bookmark photo uses a fixed natural-light background.
- DOM regression covers all four product families, all craft carriers, current-design views, old-state migration and local assets. Export success and failure handling checked separately.
