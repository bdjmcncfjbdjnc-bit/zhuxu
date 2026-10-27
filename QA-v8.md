# V8 verification — 2026-10-13

- DOM/algorithm regression: previous 27 groups passed; remaining 6 groups passed after updating removed-porcelain expectations. 33 distinct groups covered in test-studio.cjs.
- Export checks: current-frame snapshot, successful export, image-load failure, null canvas blob, drawing exception, duplicate-click guard, stable filename during product switch, URL cleanup and button recovery passed in test-export.cjs.
- Actual Chromium / Codex in-app browser: handbag, three-screen wallpaper, shaped fan and paper tote renders inspected. PNG downloads succeeded for all four. Downloaded handbag PNG opened and visually inspected (1600×1200).
- Actual browser: changed weave to inlay and palette to mist blue; all three wallpaper screens updated. Fan shape and dark/ivory background switching worked. No console errors observed.
- Narrow viewport checked at 390×844: no horizontal page overflow. Mobile product stage changed to 4:3 to avoid unused black margins.
- Scope: checks verify digital design previews, not physical manufacturing feasibility. Native picture upload was not part of this regression.
