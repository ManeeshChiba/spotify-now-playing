import logo from "./logo.svg";
import "./App.css";
import { useSpotifyPlaying } from "./hooks";
import { useAuthContext } from "./AuthProvider";
import { useMemo } from "react";
import cdcase from "/case.png";
import album from "/album.jpg";

export function App() {
  // const { access_token } = useAuthContext();
  // const nowPlaying = useSpotifyPlaying();

  // const handleNowPlayingFetch = () => {
  //   nowPlaying.refetch();
  // };

  // const imageSrc = useMemo(() => {
  //   return nowPlaying?.data?.item?.album?.images?.[0]?.url;
  // }, [nowPlaying.data]);

  // console.log(nowPlaying.data);

  return (
    <main className="app">
      <div className="album-art">
        <img className="case" src={cdcase} />
        <img src={album} alt="{REPLACE_ME}" />
      </div>
    </main>
  );
}
