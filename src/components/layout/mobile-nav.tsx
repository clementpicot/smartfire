import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Sheet, Menu, X, Link } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import NavItem from "../ui/nav-item";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { MenuItem } from "./main-nav";

export default function MobileNav({ menu, isMobileMenuOpen, setIm }) {
  if (isLoading || !menu) return null;

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="block lg:hidden ml-auto"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between border-b pb-4">
          <SheetTitle>Menu</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </SheetHeader>

        <Accordion type="single" collapsible className="w-full">
          {menu.primary.map((item: MenuItem) => {
            // If item has a direct URL, render as a simple link
            if (item.url) {
              return (
                <AccordionItem key={item.id} value={item.title}>
                  <Link
                    href={item.url}
                    className="block px-4 py-3 hover:bg-accent/10"
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
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>
                  {item.acf?.complex ? (
                    <Accordion type="single" collapsible>
                      {item.children?.map((child: MenuItem) => (
                        <AccordionItem key={child.id} value={child.title}>
                          <AccordionTrigger>{child.title}</AccordionTrigger>
                          <AccordionContent>
                            {child.children?.map((subchild: MenuItem) => (
                              <NavItem
                                key={subchild.id}
                                item={subchild}
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
