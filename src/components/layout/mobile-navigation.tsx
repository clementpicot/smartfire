import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import NavItem from "@/components/ui/nav-item";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuItem } from "@/types/menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";

interface MobileNavigationProps {
  menu?: MenuItem[];
}

export default function MobileNavigation({ menu }: MobileNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!menu) return null;

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
            <Logo />
        </SheetHeader>

        <Accordion type="single" collapsible className="w-full">
          {menu.map((item: MenuItem) => {
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
}