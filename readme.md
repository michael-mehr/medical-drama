# Medical Drama OBS Tool

## Install + Run

```bash
git clone https://github.com/michael-mehr/medical-drama
cd medical-drama
npm i
npm run dev
```

### Create a `/.env` and fill in these values

```env
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
TWITCH_CALLBACK_URL=
SESSION_SECRET=
CLIENT_URL=
VITE_SERVER_URL=
```

**Note**: *`VITE_SERVER_URL` must start with `VITE_` to be exposed to client code*

### Minify frontend code for production into `/dist/`

```bash
npm run build
```

### Run node server

```bash
node server/medical-drama-server.js
```

## TODO

### Doing

- [ ] Resize sprites to fit frame height

### Soon

- [ ] Refactor `phaserCanvas.js`
- [ ] Have `main` buttons change pose
- [ ] `sub` buttons change expression
- [ ] Convert user interface into phaser

### Eventually

- [ ] Swappable background
- [ ] 2+ models displayed and independently controlled
- [ ] Load model based on Twitch username/id

### Done

- [X] Button Selectors
- [X] Event handlers for buttons
- [X] Import assets
- [X] Reorganize project tree
- [X] vite config
- [X] Swapping assets
- [X] Functional websocket
- [X] remote backend
- [X] Direction buttons change position
- [X] Implement a state object handle multiple variables
- [X] Rewrite `handleSubButton` to be character-agnostic, and easily expanded
- [X] Character change
- [X] Change `textContent` values to `data-` values
- [X] Drop-down menu for character selection
- [X] Either fix gif playback or use sprite sheets, video files
- [X] Refactor code
  - [X] Separate into different `.js` files
    - [X] Event handlers
    - [X] Websocket
    - [X] Canvas
- [X] Adjust sizing and padding
- [X] Microphone detection
- [X] Sprite updates based on microphone volume
- [X] Replace HTML Canvas with Phaser
- [X] Sprites move into position instead of 'teleporting'
- [X] Remote client hosting
- [X] Twitch Auth
- [X] Update UI
- [X] Only whitelisted users can update state
- [X] `obs.html` page
