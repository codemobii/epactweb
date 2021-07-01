// frontend/pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  // database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    session: async (session, user) => {
      if (!user.wallet) {
        try {
          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/wallets`,
              {
                users_permissions_user: user.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.jwt}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              session.wallet = user.wallet;
            })
            .catch((er) => console.log(er));
        } catch (error) {
          console.log(error);
        }
      } else {
        session.wallet = user.wallet;
      }

      session.jwt = user.jwt;
      session.id = user.id;
      session.username = user.username;

      return Promise.resolve(session);
    },
    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        );
        const data = await response.json();
        token.jwt = data.jwt;
        token.id = data.user.id;
        token.username = data.user.username;
        token.wallet = data.user.wallet;
      }

      return Promise.resolve(token);
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
