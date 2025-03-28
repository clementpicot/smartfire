import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/types/menu";

interface DesktopNavigationProps {
  menu?: MenuItem[];
  activeSubmenu: string | null;
  toggleSubmenu: (title: string) => void;
}

export default function DesktopNavigation({
  menu,
  activeSubmenu,
  toggleSubmenu,
}: DesktopNavigationProps) {
  if (!menu) return null;

  return (
    <ul className="items-center hidden lg:flex lg:gap-4 xl:gap-8 ml-auto uppercase font-bold text-xs *:hover:text-primary">
      {menu.map((item: MenuItem) => {
        if (item.url) {
          return (
            <li key={item.title}>
              <Link
                href={item.url}
                className={`flex items-center gap-2 p-0 hover:text-accent transition-colors
                  ${activeSubmenu === item.title ? "text-accent" : ""}
                `}
                aria-expanded={activeSubmenu === item.title}
                aria-controls={`${item.title}-submenu`}
              >
                {item.title}
              </Link>
            </li>
          );
        }
        return (
          <li key={item.title}>
            <Button
              variant="link"
              onClick={() => toggleSubmenu(item.title)}
              className={`flex items-center gap-2 p-0 hover:text-accent transition-colors
                ${activeSubmenu === item.title ? "text-accent" : ""}
              `}
              aria-expanded={activeSubmenu === item.title}
              aria-controls={`${item.title}-submenu`}
            >
              {item.title}
            </Button>
          </li>
        );
      })}
      <li>
        <Button variant="default">Contact us</Button>
      </li>
    </ul>
  );
}