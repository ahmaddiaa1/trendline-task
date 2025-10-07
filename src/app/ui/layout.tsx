import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tinytales | UI Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
