"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "motion/react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import NavItem from "../ui/nav-item";

export interface MenuItem {
  title: string;
  url: string;
  parent: string;
  id: number;
  acf?: {
    image: any;
    localisation: string;
    description: string;
    complex: boolean;
  };
  children?: MenuItem[];
}

const menuAnimations = {
  // Parent menu container
  container: {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  },

  // First-level menu items
  menuItem: {
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  },

  // Submenu items
  submenuItem: {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  },
};

export default function MainNav() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeChildMenu, setActiveChildMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const toggleSubmenu = (title: string) => {
    // If clicking the same submenu, keep it open
    if (activeSubmenu === title) {
      // If it's already open, keep it open and set the first child menu
      if (menu) {
        const activeSubmenuItem = menu.primary.find(
          (item: MenuItem) => item.title === title
        );

        if (
          activeSubmenuItem?.acf?.complex &&
          activeSubmenuItem.children?.length
        ) {
          setActiveChildMenu(activeSubmenuItem.children[0].title);
        }
        return;
      }
    }

    // Otherwise, toggle as before
    setActiveSubmenu(activeSubmenu === title ? null : title);
    setActiveChildMenu(null);
  };

  const toggleChildMenu = (title: string) => {
    // If clicking the same child menu, ensure it stays open
    setActiveChildMenu(activeChildMenu === title ? title : title);
  };

  useClickOutside(ref, () => {
    if (activeSubmenu) {
      setActiveSubmenu(null);
      setActiveChildMenu(null);
    }
  });

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

  // Set the first child menu title as active
  useEffect(() => {
    if (activeSubmenu && menu) {
      const activeSubmenuItem = menu.primary.find(
        (item: MenuItem) => item.title === activeSubmenu
      );

      if (
        activeSubmenuItem?.acf?.complex &&
        activeSubmenuItem.children?.length
      ) {
        setActiveChildMenu(activeSubmenuItem.children[0].title);
      }
    }
  }, [activeSubmenu, menu]);

  const MobileMegaMenu = () => {
    if (isLoading || !menu) return null;

    return (
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTitle className="sr-only">Megamenu</SheetTitle>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex lg:hidden ml-auto"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-full overflow-y-auto px-6"
          aria-describedby="Mobile navigation"
        >
          <SheetHeader className="px-0">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt=""
                width={175}
                height={70}
                priority={true}
                className="w-30"
              />
            </Link>
          </SheetHeader>

          <Accordion type="single" collapsible className="w-full">
            {menu.primary.map((item: MenuItem) => {
              // If item has a direct URL, render as a simple link
              if (item.url) {
                return (
                  <AccordionItem
                    key={item.id}
                    value={item.title}
                    className="py-3"
                  >
                    <Link
                      href={item.url}
                      className="font-extrabold text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </AccordionItem>
                );
              }

              // If item has children, render as an accordion
              return (
                <AccordionItem key={item.id} value={item.title}>
                  <AccordionTrigger className="py-3 font-extrabold">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.acf?.complex ? (
                      <Accordion type="single" collapsible>
                        {item.children?.map((child: MenuItem) => (
                          <AccordionItem
                            key={child.id}
                            value={child.title}
                            className="*:data-[state=open]:bg-foreground/5 p-0"
                          >
                            <AccordionTrigger className="px-4 [&_svg]:hidden text-xs rounded-none font-bold">
                              {child.title}
                            </AccordionTrigger>
                            <AccordionContent className="px-4">
                              <div className="w-full h-1 px-4 border-t border-t-foreground/20 mb-4" />
                              {child.children?.map((subchild: MenuItem) => (
                                <NavItem
                                  key={subchild.id}
                                  item={subchild}
                                  className="mb-2"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                />
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      item.children?.map((subItem: MenuItem) => (
                        <NavItem
                          key={subItem.id}
                          item={subItem}
                          className="mb-2 px-4"
                          onClick={() => setIsMobileMenuOpen(false)}
                        />
                      ))
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
            <AccordionItem value="contact">
              <Button
                variant="default"
                className="w-full mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact us
              </Button>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
    );
  };

  if (isLoading) return null;

  return (
    <div ref={ref}>
      <nav className="py-4 px-6 md:py-8 md:px-10 flex items-center">
        <ul>
          <li>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt=""
                width={175}
                height={70}
                priority={true}
                className="w-30 xl:w-full"
              />
            </Link>
          </li>
        </ul>

        {/* Desktop Navigation */}
        <ul className="items-center hidden lg:flex lg:gap-4 xl:gap-8 ml-auto uppercase font-bold text-xs *:hover:text-primary">
          {menu.primary.map((item: MenuItem) => {
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

        {/* Mobile Navigation */}
        <MobileMegaMenu />
      </nav>

      <AnimatePresence>
        {activeSubmenu && menu && (
          <motion.div
            className="absolute left-0 right-0 bg-background shadow-lg top-full"
            variants={menuAnimations.container}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="max-w-[1140px] mx-auto py-20 px-5">
              {menu.primary.map((item: MenuItem) => {
                if (item.title === activeSubmenu) {
                  if (item.acf?.complex) {
                    return (
                      <div
                        className="grid gap-20 grid-cols-8"
                        key={item.title}
                        id={`${item.title}-menu`}
                      >
                        {/* Animated first-level children column */}
                        <motion.div
                          className="col-span-2 flex flex-col divide-y divide-accent/20"
                          variants={menuAnimations.container}
                        >
                          {item.children?.map((child: MenuItem) => (
                            <motion.div
                              className={cn("py-5")}
                              key={child.id}
                              variants={menuAnimations.menuItem}
                            >
                              <Button
                                variant="link"
                                className={`text-lg w-full font-bold px-0 flex justify-between ${
                                  activeChildMenu === child.title
                                    ? "text-accent"
                                    : ""
                                }`}
                                onClick={() => toggleChildMenu(child.title)}
                                aria-expanded={activeChildMenu === child.title}
                                aria-controls={`${child.title}-submenu`}
                              >
                                {child.title}
                                <ChevronRight />
                              </Button>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Animated submenu items grid */}
                        <motion.div
                          className="col-span-6 grid grid-cols-3 gap-8"
                          variants={menuAnimations.container}
                        >
                          {item.children?.map((child: MenuItem) => {
                            if (child.title === activeChildMenu) {
                              return child.children?.map(
                                (subchild: MenuItem) => (
                                  <motion.div
                                    key={subchild.id}
                                    variants={menuAnimations.submenuItem}
                                    whileHover="hover"
                                  >
                                    <NavItem
                                      item={subchild}
                                      className="transition-transform"
                                    />
                                  </motion.div>
                                )
                              );
                            }
                            return null;
                          })}
                        </motion.div>
                      </div>
                    );
                  }

                  // Similar animation approach for non-complex menus
                  return (
                    <motion.div
                      id={`${item.title}-menu`}
                      key={item.title}
                      className="grid gap-18 grid-cols-4"
                      variants={menuAnimations.container}
                    >
                      {item.children?.map((subItem: MenuItem) => (
                        <motion.div
                          className={cn()}
                          key={subItem.id}
                          variants={menuAnimations.submenuItem}
                          whileHover="hover"
                        >
                          <NavItem item={subItem} />
                        </motion.div>
                      ))}
                    </motion.div>
                  );
                }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
