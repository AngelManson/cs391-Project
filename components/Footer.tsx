//This is done by Cheyenne Mowatt
import Link from "next/link"
export default function Footer() {
    return (
        <footer className="flex items-center justify-center">
            All Rights Reserved <Link href={'/about'} className={`font-bold text-blue-900 !ml-1 !mr-1`}> Credits </Link> &#169;
        </footer>
    );
}