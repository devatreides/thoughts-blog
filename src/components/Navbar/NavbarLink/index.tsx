import Link from 'next/link';

type NavbarLinkProps = {
  children?;
  href: string;
};

export default function NavbarLink({ children, href }: NavbarLinkProps) {
  return (
    <Link href={href}>
      <a
        className="font-bold
        no-underline
        text-sm
        sm:text-base
        lg:text-lg
        text-accent-1"
      >
        {children}
      </a>
    </Link>
  );
}
