import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Saket Verma Profile",
  description: "Edit your webpen profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center">
      <div className="p-4 pb-0 pt-6 w-screen max-w-[1440px] h-full">
        <nav className="flex w-full px-1 mb-4">
          <div className="flex-1 font-semibold">WebPen</div>
          <Link href={"/home"}>Home</Link>
        </nav>
        <div className=" grid grid-cols-5">
          <div className="flex flex-col col-span-1 rounded-lg">
            <Link href={"/profile"} className="sidebarTab">
              General
            </Link>
            <Link href={"/profile/privacy"} className="sidebarTab">
              Privacy
            </Link>
            <Link href={"/profile/subscription"} className="sidebarTab">
              Subscription
            </Link>
          </div>
          <div className="col-span-4">{children}</div>
        </div>
      </div>
    </main>
  );
}
