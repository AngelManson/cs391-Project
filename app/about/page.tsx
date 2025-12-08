/*
Done by Angel Manson
This file is the about page and it provides information about our application
*/

import Header from "@/components/Header"
import {auth} from "@/auth";
import davoodi from "@/src/davoodi.png";
import Image from "next/image";

export default async function aboutPage(){
    // for authentication
    const session = await auth();
    return (
        <>
            {/**/}
            <div className="flex flex-col items-center w-full !mb-12">
                <Header user={session?.user ?? null} />
            </div>

            <main className=" bg-white flex flex-col items-center !mb-12">
                <div className="flex flex-col justify-center items-center w-full flex-grow">
                    <Image
                        src={davoodi}
                        alt="our website logo"
                        className="!mb-1 rounded-lg !font-bold"
                    />
                    <p className="!mb-3">All Content Created by Professor Davoodi</p>

                    <div className="w-full max-w-3xl rounded-2xl bg-white shadow-sm border border-slate-200 p-10">
                        <h1 className="text-4xl font-bold text-blue-900  !mb-6 text-center">
                            About This Application
                        </h1>
                        <p className="text-slate-700 text-lg leading-relaxed !mb-4 text-center">
                            This application is a custom search engine built for <strong>CS391</strong>.
                            Instead of digging through slides, PDFs, and lecture notes manually, this tool centralizes
                            all course materials into a searchable interface powered by <strong>MongoDB</strong>.
                        </p>
                        <p className="text-slate-700 text-lg leading-relaxed text-center">
                            To use the app, go to the Home page and enter a keyword related to the material you’re looking for.
                            You will be redirected to a results page where all matching resources are displayed. Once you select
                            a source, its dedicated page will open, showing all the information and content associated with it.
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}