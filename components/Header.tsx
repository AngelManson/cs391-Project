import Link from "next/link"

export default function Header() {

    return (
        <nav className={"w-full flex justify-start"}>
            <ul>
                <li>
                    <Link
                        href = {'/'}
                        className = "block p-1 m-2 text-xl hover:underline">
                        Dav00di
                    </Link>
                </li>
            </ul>
        </nav>
    );
}