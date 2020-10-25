import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="flex bg-black justify-center pt-8">
        <p className="text-lg text-bold text-accent-1">
          Contato:
          <Link href="https://twitter.com/tongedev"> Twitter </Link>—
          <Link href="https://instagram.com/tomb.dev"> Instagram </Link>—
          <Link href="https://dev.to/tombenevides"> Dev.to </Link>—
          <Link href="https://github.com/tombenevides"> Github </Link>
        </p>
      </div>
      <div className="flex bg-black justify-center pb-2">
        <p className="text-lg text-bold text-accent-1">© 2020 cogitare.press</p>
      </div>
    </footer>
  );
}
