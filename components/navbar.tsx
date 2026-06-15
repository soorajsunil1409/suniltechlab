"use client";

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { Goal, Shield } from "lucide-react";

const NavBar = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Wiki", href: "/wiki" },
    { label: "World Cup 2026", href: "/worldcup2026" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="z-50 border-b border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />

            <div>
              <h1 className="text-xl font-black tracking-wider text-white md:text-2xl">
                SUNILTECHLAB
              </h1>
              <p className="text-xs uppercase tracking-[0.25em] text-green-400">
                Football Hub
              </p>
            </div>
          </div>

          <NavigationMenu className="max-w-none">
            <NavigationMenuList className="flex flex-wrap justify-end gap-2">
              {menuItems.map((item) => {
                const isActive =
                  pathname.split("/")[1] === item.href.split("/")[1];

                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      href={item.href}
                      className={`group relative overflow-hidden rounded-full px-4 py-2 text-sm font-semibold transition-all md:text-base ${isActive
                          ? "bg-green-500 text-black shadow-lg shadow-green-500/30"
                          : "text-white hover:bg-white/10"
                        }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isActive && <Shield className="h-4 w-4" />}
                        {item.label}
                      </span>

                      {!isActive && (
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-green-400 transition-all duration-300 group-hover:w-full" />
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default NavBar;