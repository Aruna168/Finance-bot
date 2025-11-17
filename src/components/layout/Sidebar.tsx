import { NavLink } from "react-router-dom";
import { LayoutDashboard, Receipt, Wallet, Target, Settings, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/transactions", icon: Receipt, label: "Transactions" },
  { to: "/budgets", icon: Wallet, label: "Budgets" },
  { to: "/goals", icon: Target, label: "Goals" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">FinanceHub</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
