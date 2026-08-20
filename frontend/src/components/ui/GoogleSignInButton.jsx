"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { authService } from "../../services/authService";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function GoogleSignInButton({ onError }) {
  const router = useRouter();
  const divRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !CLIENT_ID || !window.google) return;

    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: async (response) => {
      try {
          await authService.googleAuth(response.credential);
          // Full reload so AuthContext picks up the new session before routing.
          window.location.href = "/dashboard";
        } catch (err) {
          onError?.(err?.data?.message || "Google sign-in failed");
        }
      },
    });

    window.google.accounts.id.renderButton(divRef.current, {
      theme: "filled_black",
      size: "large",
      width: 320,
      text: "continue_with",
      shape: "rectangular",
    });
  }, [ready, router, onError]);

  if (!CLIENT_ID) return null;

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <div className="flex justify-center">
        <div ref={divRef} />
      </div>
    </>
  );
}