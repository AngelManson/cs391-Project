import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";

export const {handlers, auth, signIn, signOut}=NextAuth(
    {
        providers: [Google],
    }
)