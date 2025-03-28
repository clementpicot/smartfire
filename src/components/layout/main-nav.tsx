"use client";

import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useClickOutside } from "@/hooks/use-click-outside";
import { MenuItem } from "@/types/menu";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";
import DesktopMegaMenu from "./mega-menu";
import Logo from "./logo";

export default function MainNav() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeChildMenu, setActiveChildMenu] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const { data: menu, isLoading } = useQuery({
    queryKey: ["menu", "primary"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/menus/v1/menus`
      );
      if (!response.ok) {
        throw new Error("Could not fetch menu");
      }
      return response.json();
    },
  });

  useClickOutside(ref, () => {
    if (activeSubmenu) {
      setActiveSubmenu(null);
      setActiveChildMenu(null);
    }
  });

  const toggleSubmenu = (title: string) => {
    // If clicking the same submenu, toggle it off
    if (activeSubmenu === title) {
      setActiveSubmenu(null);
      setActiveChildMenu(null);
      return;
    }

    // Set the new active submenu
    setActiveSubmenu(title);

    // If the selected menu item is complex and has children, 
    // automatically set the first child menu as active
    if (menu) {
      const activeSubmenuItem = menu.primary.find(
        (item: MenuItem) => item.title === title
      );

      if (
        activeSubmenuItem?.acf?.complex &&
        activeSubmenuItem.children?.length
      ) {
        setActiveChildMenu(activeSubmenuItem.children[0].title);
      } else {
        setActiveChildMenu(null);
      }
    }
  };

  const toggleChildMenu = (title: string) => {
    setActiveChildMenu(title);
  };

  if (isLoading) return null;

  return (
    <div ref={ref}>
      <nav className="py-4 px-6 md:py-8 md:px-10 flex items-center">
        <Logo />
        
        <DesktopNavigation 
          menu={menu?.primary} 
          activeSubmenu={activeSubmenu}
          toggleSubmenu={toggleSubmenu}
        />
        
        <MobileNavigation menu={menu?.primary} />
      </nav>

      <DesktopMegaMenu 
        menu={menu?.primary}
        activeSubmenu={activeSubmenu}
        activeChildMenu={activeChildMenu}
        toggleChildMenu={toggleChildMenu}
      />
    </div>
  );
}