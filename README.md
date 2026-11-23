# JOB NOTE EDITOR

A small Windows app for writing and checking off job notes: commissioning and pre-energization check sheets, test steps, and issue logs. Notes are plain `.txt` or `.md` files, so they open in any editor. The app adds check marks, colours, tables, pictures and PDF export on top.

## Download

Get the installer from the **[Releases page](https://github.com/NingFeng33/NoteEditor/releases)**: download `JOB NOTE EDITOR Setup.exe` and run it.

The installer is not code-signed, so Windows SmartScreen may warn you the first time. Click **More info**, then **Run anyway**.

## What it does

- **New note** (button or `Ctrl+N`): a form builds the header (equipment tag, subject, revision, date, basis, scope) and a check-sheet skeleton. Types: pre-energization check sheet, commissioning test sheet, maintenance / inspection, issue log, or blank. The suggested file name is `<tag>_<type>_<date>.txt`.
- **Open / Save / Save as** (`Ctrl+O`, `Ctrl+S`, `Ctrl+Shift+S`), or drag a file onto the window. If there are unsaved changes, New, Open and closing the window ask: Save / Don't save / Cancel.
- **Check marks:** every line has a box on the left. Click it to cycle: empty, ✔ done, ✖ problem. The header shows how many are done, problem and to do.
- **Check marks anywhere:** write `[ ]` in the text (for example in a P/F column) and it becomes a clickable box. **Add box** inserts one where you last clicked. Click a box to cycle empty, ✔, ✖.
- **Tables:**
  - Markdown tables (with a `|---|---|` row under the header) are drawn as real tables.
  - ASCII box tables (`+-----+` borders) are shown exactly as typed, in a fixed-width font.
  - Tables never wrap on screen; a wide table scrolls sideways. Each table line keeps its own check box.
- **Formatting:** bold, underline, strike-through, four text colours, three highlight colours, and notes under a line. Auto-highlighting for step numbers (`T1`), `HOLD POINT`, `PASS`, `FAIL`, `DO NOT`, `(was …)` and values like `0.100 s`.
- **Pictures:** insert a file, paste a screenshot with `Ctrl+V`, or drop an image file. Click a picture to resize it, double-click its caption to edit it. Pictures are stored inside the note file.
- **Views:** *Mark view* for checking off and *Edit view* for typing the raw text.
- **Screen layout:** *Wrap* on/off and *Width* Normal / Wide / Full. These affect the screen only, not the PDF.
- **Export PDF** (`Ctrl+P`): in the print window choose *Save as PDF* and pick the paper size and orientation you need.
- **New window:** `Ctrl+Shift+N` opens a second window, so you can work on two notes side by side.

## Shortcuts

| Key | Action |
|---|---|
| `Ctrl+N` | New note |
| `Ctrl+Shift+N` | New window |
| `Ctrl+O` | Open |
| `Ctrl+S` / `Ctrl+Shift+S` | Save / Save as |
| `Ctrl+P` | Export PDF |
| `Ctrl+Z` / `Ctrl+Y` | Undo / Redo (Mark view) |

## Note format

A note is plain text. The app reads these conventions:

```text
- [ ] Settings file matches the approved revision      <- to do
- [x] Test set ID recorded                              <- done
- [!] Trip time out of tolerance                        <- problem
> A note under the line above
**bold**  ~~strike~~  <u>underline</u>  {red}text{/}  {=yellow}highlight{/=}
| Step | Action |
|:-----|:-------|
| 1    | A markdown table |
| P/F  | [ ] [x] [!] inline boxes work anywhere |
```

Pictures are saved as reference lines (`![caption|60][img1]`) with the image data at the end of the file. Keep those lines if you edit the file by hand.

## Run from source

Requires [Node.js](https://nodejs.org/).

```powershell
npm install
npm run start
```

The whole interface is in one file, `job-note-editor_v1.1.html`. `main.js` is the small Electron wrapper (window, new-window, close prompt).

## Build the Windows version

```powershell
npm run package   # runnable folder in out\JOB NOTE EDITOR-win32-x64\
npm run make      # installer in out\make\squirrel.windows\x64\
```

Before making a release, update `version` in `package.json`.

## Customising

Near the top of the HTML file:

- `RULES` sets the auto-highlight words and their colours.
- `TEMPLATES` (search for "new note") sets the note types, titles, and the check-sheet text under each header.

## Author

Ning Feng. License: ISC.
