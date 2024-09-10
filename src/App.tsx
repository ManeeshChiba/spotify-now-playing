import logo from "./logo.svg";
import "./App.css";
import { useSpotifyPlaying } from "./hooks";
import { useAuthContext } from "./AuthProvider";
import { useMemo } from "react";

function App() {
  const { access_token } = useAuthContext();
  const nowPlaying = useSpotifyPlaying();

  const handleNowPlayingFetch = () => {
    nowPlaying.refetch();
  };

  const imageSrc = useMemo(() => {
    return nowPlaying?.data?.item?.album?.images?.[0]?.url;
  }, [nowPlaying.data]);

  console.log(nowPlaying.data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={imageSrc ?? logo} className="App-logo" alt="logo" />
        <p>Access token {access_token}</p>
        <button onClick={() => handleNowPlayingFetch()}>Get Now Playing</button>
      </header>
    </div>
  );
}

export default App;
