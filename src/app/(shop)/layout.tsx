import { Footer, SideBar, TopMenu } from "@/components";

export default function ShopLayoutLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu/>
      <SideBar/>
      <div className="px:0 sm:px-5 ">
        { children }
      </div>
      <Footer/>
    </main>
  );
}