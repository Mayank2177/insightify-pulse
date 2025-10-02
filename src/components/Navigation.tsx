import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Inbox, Settings, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: TrendingUp, label: "Home" },
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/inbox", icon: Inbox, label: "Inbox" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Insightify
            </span>
          </Link>

          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
