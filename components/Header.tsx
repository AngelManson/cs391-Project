import Link from "next/link"

export default function Header() {

    const linkStyling = "p-1 m-2 text-xl hover:underline"
    return (
        <nav>
            <ul>
                <li>
                    <Link href = {'/'} className = {linkStyling}>Dav00di</Link>
                </li>
            </ul>
        </nav>
    );
}