import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Buffer } from "buffer";

interface DjangoAuthResponse {
  access?: string;
  refresh?: string;
  detail?: string;
  is_2fa_enabled?: boolean;
  is_superuser?: boolean;
  [key: string]: any;
}

// Helper to determine if the user is a superuser (admin) based on JWT payload
function isSuperUser(accessToken: string): boolean {
  try {
    const payloadPart = accessToken.split(".")[1];
    const decodedJson = Buffer.from(payloadPart, "base64").toString("utf8");
    const payload = JSON.parse(decodedJson);
    return !!(
      payload?.is_superuser ||
      payload?.is_staff ||
      payload?.role === "admin" ||
      payload?.is_admin
    );
  } catch {
    return false;
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  secret:
    process.env.NEXTAUTH_SECRET ||
    process.env.AUTH_SECRET ||
    "SOLUTION_EPI_DEVELOPMENT_SECRET",
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const { username, password, otp } = credentials as {
          username?: string;
          password?: string;
          otp?: string;
        };

        // If OTP is provided, verify it
        if (otp) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/verify/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password, otp }),
            }
          );

          if (!res.ok) {
            console.error("2FA verification failed:", res.status);
            // This error will be caught by the client and shown in a toast.
            throw new Error("Invalid OTP code.");
          }
          const user = (await res.json()) as DjangoAuthResponse;
          if (!user.access || !user.refresh) {
            throw new Error(
              "2FA verification successful, but no token received."
            );
          }
          return {
            id: username,
            backendTokens: { access: user.access, refresh: user.refresh },
            is_superuser: user.is_superuser ?? false,
          };
        }

        // Standard username/password login attempt
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/token/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          }
        );

        const tokenData: DjangoAuthResponse = await res.json();

        if (tokenData.is_2fa_enabled) {
          return { id: username, is_2fa_enabled: true };
        }

        if (!res.ok) {
          throw new Error(tokenData.detail || "Authentication failed");
        }

        if (!tokenData.access || !tokenData.refresh) {
          throw new Error("Login successful, but no token received.");
        }

        return {
          id: username,
          backendTokens: {
            access: tokenData.access,
            refresh: tokenData.refresh,
          },
          is_superuser: tokenData.is_superuser ?? false,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // This block only runs on sign-in or when the OTP is submitted
        token.id = user.id;

        // Case 1: Login is complete (either no 2FA, or 2FA was just verified)
        if (user.backendTokens) {
          token.accessToken = user.backendTokens.access;
          token.refreshToken = user.backendTokens.refresh;
          token.is_2fa_enabled = false; // Mark 2FA as completed
          token.is_superuser =
            typeof user.is_superuser !== "undefined"
              ? user.is_superuser
              : isSuperUser(user.backendTokens.access);
        }
        // Case 2: 2FA is required, and we are waiting for the OTP
        else if (user.is_2fa_enabled) {
          token.is_2fa_enabled = true;
        }
      }

      // Ensure we always have the superuser flag on subsequent JWT callbacks
      if (token.accessToken && typeof token.is_superuser === "undefined") {
        token.is_superuser = isSuperUser(token.accessToken as string);
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      if (token.id && session.user) {
        session.user.id = token.id;
      }

      // Expose flag at session root level for convenience (optional)
      (session as any).is_superuser = token.is_superuser;

      // Expose the admin flag to the client
      session.is_2fa_enabled = token.is_2fa_enabled;

      if (session.user) {
        (session.user as any).is_superuser = token.is_superuser;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
