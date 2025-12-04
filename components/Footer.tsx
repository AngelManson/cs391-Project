import Link from "next/link"
export default function Footer() {
    return (
        <footer> All Rights Reserved <Link href={'/about'}>Credits</Link> &#169;</footer>
    );
}