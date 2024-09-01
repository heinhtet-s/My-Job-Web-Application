import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axios from "axios";
import {
  EmployerLogin,
  EmployerSsoLogin,
  SeekerLogin,
  SeekerSsoLogin,
} from "../modules/services/auth";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "OTP_LOGIN",
      credentials: {
        credentials: {
          type: "text",
        },
        rememberMe: {
          type: "text",
        },
      },
      authorize: async (credentials) => {
        const maxAge = 24 * 60 * 60;
        const user = JSON.parse(credentials?.credentials);
        if (user.role === "seeker") {
          if (user.isSso) {
            const data = await SeekerSsoLogin(user);
            return {
              email: user.email,
              ...data.data[0],
              role: user.role,
            };
          }
          const data = await SeekerLogin(user);
          return {
            email: user.email,
            ...data.data[0],
            role: user.role,
          };
        } else {
          if (user.isSso) {
            const data = await EmployerSsoLogin(user);
            return {
              email: user.email,
              ...data.data[0],
              role: user.role,
            };
          }
          const data = await EmployerLogin(user);
          return {
            email: user.email,
            ...data.data[0],
            role: user.role,
          };
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },
    jwt: ({ token, user, account, trigger, session }) => {
      if (user) {
        token = { ...token, ...user };
      }
      //   if (trigger === "update") {
      //     token.first_name = session?.first_name;
      //     token.last_name = session?.last_name;
      //     token.phone = session?.phone || null;
      //     token.acct_type = session?.acct_type || null;
      //     token.identityStatus = session?.identityStatus;
      //     token.sp_session = session?.sp_session;
      //     token.access_token = session?.access_token;
      //     token.refresh_token = session?.refresh_token;
      //     token.theme = session?.theme;
      //     token.migrate_ind = session?.migrate_ind;
      //   }
      if (account) {
        token.token = account.token;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      const currentDate = Date.now();
      //   if (token.expires && Math.floor(Date.now() / 1000) > token.expires) {
      //     return null;
      //   }
      // if (currentDate > token?.expires) {
      //   return null;
      // }
      // if (currentDate > session.expires) {
      //   return null; // Session has expired, logout user
      // }

      return {
        ...session,
        user: {
          ...session.user,
          ...token,
          ...user,
        },
      };
    },
  },
};
