import { Github } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with ❤️ for fitness enthusiasts everywhere.
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
          </div>
        </div>
      </div>
    </footer>
    //    <footer className="py-12 border-t border-white/10">
    //    <div className="container mx-auto px-4">
    //      <div className="grid md:grid-cols-4 gap-8 mb-8">
    //        <div>
    //          <div className="flex items-center gap-2 mb-4">
    //            <Wand2 className="h-6 w-6 text-blue-400" />
    //            <span className="font-bold text-xl">PictoArt AI</span>
    //          </div>
    //          <p className="text-gray-400">
    //            The future of vector art creation, powered by artificial intelligence
    //          </p>
    //        </div>
    //        <div>
    //          <h5 className="font-semibold mb-4">Product</h5>
    //          <ul className="space-y-2 text-gray-400">
    //            <li>Features</li>
    //            <li>Pricing</li>
    //            <li>Gallery</li>
    //            <li>API</li>
    //          </ul>
    //        </div>
    //        <div>
    //          <h5 className="font-semibold mb-4">Company</h5>
    //          <ul className="space-y-2 text-gray-400">
    //            <li>About</li>
    //            <li>Blog</li>
    //            <li>Careers</li>
    //            <li>Contact</li>
    //          </ul>
    //        </div>
    //        <div>
    //          <h5 className="font-semibold mb-4">Stay Updated</h5>
    //          <p className="text-gray-400 mb-4">
    //            Get notified about new features and updates
    //          </p>
    //          <div className="flex gap-2">
    //            <Input
    //              type="email"
    //              placeholder="Enter your email"
    //              value={email}
    //              onChange={(e) => setEmail(e.target.value)}
    //              className="bg-white/10 border-white/20"
    //            />
    //            <Button>Subscribe</Button>
    //          </div>
    //        </div>
    //      </div>
    //      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
    //        <p className="text-gray-400 text-sm">
    //          © 2025 PictoArt AI. All rights reserved.
    //        </p>
    //        <div className="flex gap-4 mt-4 md:mt-0">
    //          <Button variant="ghost" size="icon">
    //            <Twitter className="h-5 w-5" />
    //          </Button>
    //          <Button variant="ghost" size="icon">
    //            <Github className="h-5 w-5" />
    //          </Button>
    //          <Button variant="ghost" size="icon">
    //            <Instagram className="h-5 w-5" />
    //          </Button>
    //        </div>
    //      </div>
    //    </div>
    //  </footer>
  );
}