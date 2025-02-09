import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
