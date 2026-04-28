// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Phone, Heart, Menu, X } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function HomePage() {
//   const navigate = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/aboutus" },
//     { name: "Services", path: "/services" },
//     { name: "Doctors", path: "/doctors" },
//     { name: "Blog", path: "/blog" },
//     { name: "Contact", path: "/contactus" },
//   ];

//   return (
//     <main className="font-sans">
//       {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
//               <Heart className="w-4 h-4 text-white fill-white" />
//             </div>
//             <span className="text-xl font-bold text-blue-900">Maxcare</span>
//           </div>

//           <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.path}
//                 className="hover:text-cyan-500 transition-colors"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>

//           <div className="hidden md:flex items-center gap-3">
//             <span className="text-sm text-gray-500 flex items-center gap-1">
//               <Phone className="w-3 h-3 text-cyan-500" /> +123-456-7890
//             </span>
//             <Button className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm rounded-full px-5">
//               Book Appointment
//             </Button>
//           </div>

//           <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? (
//               <X className="w-5 h-5" />
//             ) : (
//               <Menu className="w-5 h-5" />
//             )}
//           </button>
//         </div>

//         {menuOpen && (
//           <div className="md:hidden bg-white border-t px-4 pb-4">
//             {["Home", "About", "Services", "Doctors", "Blog", "Contact"].map(
//               (item) => (
//                 <a
//                   key={item}
//                   href="#"
//                   className="block py-2 text-sm text-gray-600 hover:text-cyan-500"
//                 >
//                   {item}
//                 </a>
//               ),
//             )}
//             <Button
//               className="w-full mt-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full"
//               onClick={() => navigate.push("/login")}
//             >
//               Book Appointment
//             </Button>
//           </div>
//         )}
//       </header>
//     </main>
//   );
// }



"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuth"; // Import your store

export default function HomePage() {
  const navigate = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Get auth state from Zustand
  const { token, role } = useAuthStore();

  const handleAppointmentClick = () => {
    if (token) {
      // If logged in, send them to the appropriate booking/dashboard page
      if (role === "doctor") {
        navigate.push("/doctor/dashboard");
      } else {
        // Patient is already logged in, send to appointment booking or home
        navigate.push("/appointment"); 
      }
    } else {
      // Not logged in, send to login
      navigate.push("/login");
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/aboutus" },
    { name: "Services", path: "/services" },
    { name: "Doctors", path: "/doctors" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contactus" },
  ];

  return (
    <main className="font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-blue-900">Maxcare</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path} className="hover:text-cyan-500 transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Phone className="w-3 h-3 text-cyan-500" /> +123-456-7890
            </span>
            {/* Desktop Button */}
            <Button 
              className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm rounded-full px-5"
              onClick={handleAppointmentClick}
            >
              Book Appointment
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block py-2 text-sm text-gray-600 hover:text-cyan-500"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Button */}
            <Button
              className="w-full mt-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full"
              onClick={handleAppointmentClick}
            >
              Book Appointment
            </Button>
          </div>
        )}
      </header>
    </main>
  );
}