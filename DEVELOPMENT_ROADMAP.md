# Development Roadmap

## 2025-10-23 — Mobile Explorer Overlay

- **Scope:** Rework the small-screen layout so the file explorer appears inside a slide-in overlay triggered from a dedicated top bar.
- **Status:** In Progress
- **Notes:**
  - Added a mobile-only top bar with an “Explorer” trigger that reveals an overlay occupying 80% of the viewport width.
  - Hid the terminal and social dock on sub-`md` breakpoints to keep the mobile focus on file content.
  - Overlay now dismisses when tapping the scrim or selecting a file, restoring the full content view.
  - Refined the overlay surface and scrim to respect light/dark theme tokens and added slide/fade transitions for smoother entry and exit.
  - Introduced a full-screen blur layer so the background stays frosted while the drawer animates into place, preventing visual pop-throughs.
  - Tuned the implementation to rely only on the default theme tokens by removing bespoke brand/terminal color variables, keeping light and dark modes consistent.

## 2025-10-23 — Palette Remap

- **Scope:** Restore the signature brown palette while keeping component tokens aligned to the default `primary`, `secondary`, and related variables.
- **Status:** Completed
- **Notes:**
  - Replaced the light and dark theme token sets in `src/index.css` with warm brown HSL values that match the earlier custom palette.
  - Kept utility classes (e.g., `gradient-bg`) tied to the default tokens so components automatically inherit the refreshed palette.
  - Ensured primary/secondary contrast remains AA-compliant in both modes after the remap.

## 2025-10-24 — Theme Switcher Revamp

- **Scope:** Replace the simple dark-mode toggle with a dropdown that supports light/dark/system modes and palette selection (e.g., Darkmatter).
- **Status:** In Progress
- **Notes:**
  - Added a new dropdown-based theme controller with nested palette selection using the existing component stack.
  - Theme choices now persist `mode` and `palette` separately in `localStorage`, and system preference changes are watched live.
  - Introduced `data-theme="darkmatter"` overrides in `src/index.css` so third-party palettes can ride on the standard token names.
  - Migrated the warm and Darkmatter palettes into Tailwind `@theme` blocks (light + dark variants) so the token cascade matches the Tailwind 4 guidance.

## 2025-10-21 — Terminal Panel Integration

- **Scope:** Add a collapsible faux terminal beneath the main content area that understands the portfolio file tree (`ls`, `cd`, `cat` commands) and ties back into the explorer.
- **Status:** Completed (initial pass)
- **Notes:**
  - Implemented `Terminal` component with command handling, history, and theme-aware styling.
  - Hooked terminal `cat` actions into existing `FileExplorer` selection flow.
  - Added TODO reminder to surface a floating preview for `education/degrees.md` in a future iteration.
  - Refined typography scale and moved terminal colors onto global theme tokens for easier maintenance.

## 2025-10-21 — Terminal Tab Completion

- **Scope:** Bring shell-like Tab completion to the faux terminal, including double-Tab suggestions.
- **Status:** Completed
- **Notes:**
  - Added command/path match helpers with case-insensitive lookups and directory awareness.
  - Implemented single-Tab auto-fill with trailing `/` for folders and intelligently appended spaces for files/commands.
  - Added double-Tab listing via terminal system entries when multiple matches remain.

## 2025-10-21 — Theme Token Realignment

- **Scope:** Sync global Tailwind tokens with the brown/blue palette used by the explorer and content panels.
- **Status:** In Progress
- **Notes:**
  - Migrated `:root` and `.dark` color variables in `src/index.css` to the shared OKLCH-based token set (background, primary, secondary, accent, etc.).
  - Updated the `@theme` mapping to reference the core tokens directly so future tweak-cn themes can drop in without extra custom variables.
  - Refactored `ContentPanel` styling to consume the shared tokens (cards, badges, buttons, list markers) in preparation for retiring component-specific palettes.
  - Updated `FileExplorer` interactions (selection, hover, headers, divider) to rely solely on the shared primary/muted tokens.
  - Restyled `SocialDock` to use the global secondary/primary tokens for its background and hover states, removing custom color references.
  - Simplified the faux terminal to reuse shared card/muted/primary tokens and removed bespoke terminal CSS variables.
