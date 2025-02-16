import { Github, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with ❤️ for creators worldwide. <br />
              <span className="font-semibold">Empowering your imagination, one illustration at a time.</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center gap-2">
          {/* <p className="text-xs text-muted-foreground">
            🎨 Discover more at <strong>PictoArt AI</strong> – where art meets innovation.
          </p>
          <p className="text-xs text-muted-foreground">
            Have questions? <Link href="/contact" className="hover:underline">Contact us</Link> anytime!
          </p> */}
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>© 2025 PictoArt AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
