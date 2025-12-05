"use client";

import Link from "next/link"
import { signIn, signOut } from "next-auth/react";
import {HeaderProps} from "@/types/HeaderProps";


export default function Header({user}: HeaderProps) {

    return (
        <nav className="w-full flex justify-between items-center p-3 border-b border-gray-200">
                    <Link
                        href = {'/'}
                        className = "block p-1 m-2 text-xl hover:underline">
                        Dav00di
                    </Link>
            {/*Header rightside*/}
            <div>
                {!user ? (
                    <button
                        onClick={() => signIn("google")}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Sign in with Google
                    </button>
                ) : (
                    <button
                        onClick={() => signOut()}
                        className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition"
                    >
                        Sign out
                    </button>
                )}

            </div>
        </nav>
    );
}