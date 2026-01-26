# Audio Files Directory

This directory contains audio files for the Metron Intelligence Brief page.

## Current File

- `metron-intelligence-brief.mp3` - The main Metron Intelligence Brief audio file

## File Location

The audio file has been placed in this directory and is referenced in `intelligence-brief.html` as:
```html
<source src="audio/metron-intelligence-brief.mp3" type="audio/mpeg">
```

## Vercel Deployment

This directory structure is compatible with Vercel deployment. The audio file will be served as a static asset.

## Adding New Audio Files

To add additional audio files:
1. Place the audio file in this directory
2. Update the HTML in `intelligence-brief.html` to reference the new file
3. Ensure the file format is supported (MP3, M4A, OGG, WAV)
