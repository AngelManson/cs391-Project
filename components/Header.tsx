"use client";

import Image from "next/image";
import logo from "@/src/logo.png";
import Link from "next/link"
import { signIn, signOut } from "next-auth/react";
import {HeaderProps} from "@/types/HeaderProps";


export default function Header({user}: HeaderProps) {
    console.log("HEADER USER:", user);

    return (
        <nav className="w-full flex justify-between items-center p-3 border-b border-gray-200">
                    <Link
                        href = {'/'}
                        className = "block p-1 m-2 text-xl hover:underline">
                        <Image
                            src={logo}
                            alt="our website logo"
                            height={200}
                            width={200}
                            className="!p-1 m-2"
                        />
                    </Link>
            {/*Header rightside*/}
            <div className="flex items-center gap-3">
                {/*show profile img if logged in */}
                {user?.image && (
                    <img
                        src={user.image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border"
                    />
                )}
                {!user ? (
                    <button
                        onClick={() => signIn("google")}
                        className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-800 transition cursor-pointer"
                    >
                        Sign in with Google
                    </button>
                ) : (
                    <button
                        onClick={() => signOut()}
                        className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition cursor-pointer"
                    >
                        Sign out
                    </button>
                )}

            </div>
        </nav>
    );
}