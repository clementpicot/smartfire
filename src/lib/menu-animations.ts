export const menuAnimations = {
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