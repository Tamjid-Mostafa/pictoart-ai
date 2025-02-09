import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <main className="flex justify-center items-center min-h-screen w-full">{children}</main>;
};

export default Layout;
