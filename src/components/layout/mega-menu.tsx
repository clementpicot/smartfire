import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import NavItem from "@/components/ui/nav-item";
import { MenuItem } from "@/types/menu";
import { menuAnimations } from "@/lib/menu-animations";

interface DesktopMegaMenuProps {
  menu?: MenuItem[];
  activeSubmenu: string | null;
  activeChildMenu: string | null;
  toggleChildMenu: (title: string) => void;
}

export default function DesktopMegaMenu({
  menu,
  activeSubmenu,
  activeChildMenu,
  toggleChildMenu,
}: DesktopMegaMenuProps) {
  if (!menu) return null;

  return (
    <AnimatePresence>
      {activeSubmenu && (
        <motion.div
          className="absolute left-0 right-0 bg-background shadow-lg top-full"
          variants={menuAnimations.container}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="max-w-[1140px] mx-auto py-20 px-5">
            {menu.map((item: MenuItem) => {
              if (item.title === activeSubmenu) {
                if (item.acf?.complex) {
                  return (
                    <div
                      className="grid gap-20 grid-cols-8"
                      key={item.title}
                      id={`${item.title}-menu`}
                    >
                      {/* First-level children column */}
                      <motion.div
                        className="col-span-2 flex flex-col divide-y divide-accent/20"
                        variants={menuAnimations.container}
                      >
                        {item.children?.map((child: MenuItem) => (
                          <motion.div
                            className={"py-5"}
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

                      {/* Submenu items grid */}
                      <motion.div
                        className="col-span-6 grid grid-cols-3 gap-8"
                        variants={menuAnimations.container}
                      >
                        {item.children?.map((child: MenuItem) => {
                          if (child.title === activeChildMenu) {
                            return child.children?.map((subchild: MenuItem) => (
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
                            ));
                          }
                          return null;
                        })}
                      </motion.div>
                    </div>
                  );
                }

                // Non-complex menu rendering
                return (
                  <motion.div
                    id={`${item.title}-menu`}
                    key={item.title}
                    className="grid gap-18 grid-cols-4"
                    variants={menuAnimations.container}
                  >
                    {item.children?.map((subItem: MenuItem) => (
                      <motion.div
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
  );
}