import Authify from "@/components/Authify";
import { SessionProvider } from "@/components/SessionContext";
import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
import Script from "next/script";

<Script src="https://unpkg.com/@hello-pangea/dnd@x.x.x/dist/dnd.js"></Script>;

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <GoogleOAuthProvider clientId="91585630488-e503614jt9uqo1na275i7k9in6clofma.apps.googleusercontent.com">
        <SessionProvider>
          <Authify>
            <Component {...pageProps} />
          </Authify>
        </SessionProvider>
      </GoogleOAuthProvider>
    </DndProvider>
  );
}
