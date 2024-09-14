# 10ft Display for Spotify Now Playing
Designed to run on your local network and keep active on a spare monitor. Display your currently playing songs as album art.

<img width="832" alt="Screenshot 2024-09-14 at 7 24 11 PM" src="https://github.com/user-attachments/assets/766f3f9d-c73f-45f0-8d67-b75a8b50136f">


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
