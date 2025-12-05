type HeaderUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;

} | null;

export type HeaderProps = {
    user: HeaderUser;
};