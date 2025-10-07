import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tinytales | Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
