import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

interface AuthContextValues {
  getToken: () => void;
  access_token?: string | null;
}

const authContextValues: AuthContextValues = {
  getToken: () => null,
  access_token: null,
};

const AuthContext = createContext<AuthContextValues>(authContextValues);

export interface AuthContextProviderProps {
  location: Location;
  children: ReactNode;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export function AuthContextProvider(props: AuthContextProviderProps) {
  const params = new URLSearchParams(props.location.search);
  const [code, setCode] = useState(params.get("code"));
  const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>(
    null
  );

  const redirectToAuthCodeFlow = async (clientId: string) => {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000");
    params.append("scope", "user-read-currently-playing");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  const generateCodeVerifier = (length: number) => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const generateCodeChallenge = async (codeVerifier: string) => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const getAccessToken = async (clientId: string, code: string) => {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const isGood = result.status >= 200 && result.status < 300;

    const response = await result.json();
    if (isGood) {
      setTokenResponse(response);
    }
  };

  const authenticate = () => {
    if (!code) {
      console.log("There is no code, redirecting");
      redirectToAuthCodeFlow(CLIENT_ID);
    } else {
      console.log("There is a code, no need to redirect");
    }
  };

  useEffect(() => {
    if (code && !tokenResponse) {
      console.log("There is a code, but no access token");
      getAccessToken(CLIENT_ID, code);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getToken: () => authenticate(),
        access_token: tokenResponse?.access_token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
