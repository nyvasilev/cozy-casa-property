import Navbar from "@/components/NavBar";
import "@/styles/global.css";

export const metadata = {
  title: "Cozy Casa Property | Find The Perfect Home",
  description:
    "Find the perfect home for you and your family. We have a wide range of properties to choose from. Contact us today to find your dream home.",
  keywords: "property, home, real estate, cozy casa, cozy casa property",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
