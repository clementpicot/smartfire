"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MenuItem } from "../layout/main-nav";

export default function NavItem({
  item,
  className,
  onClick,
  ...delegated
}: {
  item: MenuItem;
  onClick?: () => void;
  className?: string | undefined;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn("max-w-75", item.acf?.image && "max-w-58", className)}
      onClick={onClick}
      {...delegated}
    >
      {item.acf?.image ? (
        <Link
          href={item.url}
          className={`group block rounded-lg ${
            pathname === item.url ? "bg-gray-50" : ""
          }`}
        >
          {item.acf.image.url && (
            <Image
              src={item.acf.image.url}
              alt=""
              width={230}
              height={100}
              className="hidden md:block w-full mb-2"
            />
          )}
          {item.acf.localisation && (
            <span className="hidden md:block text-accent text-xs font-medium mb-1">
              {item.acf.localisation}
            </span>
          )}
          <h3 className="font-medium md:font-extrabold group-hover:text-accent-hover transition-colors">
            {item.title}
          </h3>
          {item.acf.description && (
            <p className="hidden md:block mt-1 font-light text-xs">
              {item.acf.description}
            </p>
          )}
        </Link>
      ) : (
        <div className="group block rounded-lg">
          <h3 className="text-inherit md:text-lg font-medium md:font-extrabold group-hover:text-accent-hover transition-colors">
            {item.title}
          </h3>
          {item.acf?.description && (
            <p className="hidden md:block mt-1 font-light text-xs">
              {item.acf.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
