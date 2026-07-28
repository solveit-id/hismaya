import Navbar from "@/components/main/navbar/navbar";
import Footer from "@/components/main/footer/footer";

export default function MainLayout({
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