import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      location.pathname === path
        ? "bg-primary/20 text-primary glow-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-heading text-lg font-bold tracking-wider text-foreground">
            FRAUD<span className="text-primary">SHIELD</span>
          </span>
        </Link>
        <div className="flex gap-2">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/predict" className={linkClass("/predict")}>Predict</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
