import Navbar from "@/components/layout/user/navbar/navbar";
import Footer from "@/components/layout/user/footer/footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
        {children}
      <Footer />
    </div>
  );
}