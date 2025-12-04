import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";

export const {handlers, auth}=NextAuth(
    {
        providers: [Google],
    }
)