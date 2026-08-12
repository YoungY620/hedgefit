# Product film

Remotion source for the Semantic Hedge Fund product film.

The 28-second cut gives each information state time to resolve while keeping low-intensity motion moving through every scene. It uses separate title and content zones, and never crossfades two dense screens over one another.

```bash
npm install
npm run studio
npm run render
```

`npm run render` generates the soundtrack, renders a PNG sequence, encodes H.264, muxes AAC audio, and creates the poster. PNG frames and intermediate video files are ignored by Git.
