
import Footer from "@/layout/user/Footer";
import Header from "@/layout/user/Header";


export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="flex flex-col">
    <Header/>
           {children}
           <Footer/>
   </div>
     

  );
}
