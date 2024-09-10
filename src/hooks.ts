import { useQuery } from "react-query";
import { useAuthContext } from "./AuthProvider";

const BASE_URI = "https://api.spotify.com/v1";

export function useSpotifyPlaying() {
  const { access_token } = useAuthContext();
  return useQuery({
    queryFn: async () => {
      if (!access_token) {
        throw new Error("Access token undefined. Check your env");
      }
      const response = await fetch(`${BASE_URI}/me/player/currently-playing`, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => data);
      return response;
    },
    queryKey: ["player"],
    retry: false,
    enabled: false,
  });
}
