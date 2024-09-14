# 10ft Display for Spotify Now Playing

Designed to run on your local network and keep active on a spare monitor. Display your currently playing songs as album art.

## To Run

```
git clone git@github.com:ManeeshChiba/spotify-now-playing.git
cd ./spotify-now-playing
echo VITE_SPOTIFY_CLIENT_ID={YOUR_ID_HERE} > .env
yarn install
yarn start
```

[Information on how to get your client ID by creating a Spotify app](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)

# ⚠️ DO NOT use this in production

There is no proper token management here and your client ID will be exposed in the app.
