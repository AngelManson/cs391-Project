import Link from "next/link"
export default function Footer() {
    return (
        <footer className="flex items-center justify-center"> All Rights Reserved <Link href={'/about'}> Credits</Link> &#169;</footer>
    );
}