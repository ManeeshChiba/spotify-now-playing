import { useMemo } from "react";
import { useAuthContext } from "./AuthProvider";
import { useSpotifyPlaying } from "./hooks";
import "./App.css";
import cdcase from "/case.png";

export function App() {
  const { access_token, getToken } = useAuthContext();

  const nowPlaying = useSpotifyPlaying();

  const imageSrc = useMemo(() => {
    return nowPlaying?.data?.item?.album?.images?.[0]?.url;
  }, [nowPlaying.data]);

  return (
    <main className="app">
      {!!access_token ? (
        <div className="album-art">
          <img className="case" src={cdcase} />
          <img src={imageSrc} alt="{REPLACE_ME}" />
        </div>
      ) : (
        <button className="login-button" onClick={() => getToken()}>
          Sign In to Spotify
        </button>
      )}
    </main>
  );
}
