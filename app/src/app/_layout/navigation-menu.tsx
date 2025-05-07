"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@project/ui/components/navigation-menu";
import Link from "next/link";
import { cn } from "@project/ui/lib/utils";
import { usePathname } from "next/navigation";

const DataGridComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Data grid (no features)",
    href: "/demo/grid/no-features",
    description: "A basic data grid with no features",
  },
  {
    title: "Data grid (simple paging)",
    href: "/demo/grid/simple-paging",
    description: "A data grid with simple paging",
  },
  {
    title: "Data grid (example)",
    href: "/demo/grid/example",
    description: "A full-featured data grid with sorting, filtering and actions",
  },
];

const AutoFormComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Auto form (login)",
    href: "/demo/auto-form/login",
    description: "A login form with email and password fields",
  },
  {
    title: "Auto form (example)",
    href: "/demo/auto-form/example",
    description: "A full-featured auto form with validation",
  },
];

export function NavigationMenuDesktop() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>MDP</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <div className="mb-2 mt-4 text-lg font-medium">Baseon</div> */}
                    <p className="text-sm leading-tight text-muted-foreground">
                      Development Platform Sandbox & Documentation
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="https://storybook.fe.sandbox.localhost/" title="UI">
                Storybook overview
              </ListItem>
              <ListItem href="/docs" title="Documentation">
                Documentation
              </ListItem>
              <ListItem href="/solutions" title="Solutions">
                Solutions & Templates
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col gap-4 py-4">
            <div className="">
              <div className="relative">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-base font-semibold text-gray-900">Data grid</span>
                </div>
              </div>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {DataGridComponents.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </div>
            <div>
              <div className="relative">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-base font-semibold text-gray-900">Auto form</span>
                </div>
              </div>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {AutoFormComponents.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs" className={navigationMenuTriggerStyle()}>
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = ({ className, title, children, ref, ...props }: React.ComponentPropsWithRef<"a">) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export function NavigationMenuMobile() {
  const pathname = usePathname();

  return (
    <nav aria-label="Sidebar" className="flex flex-1 flex-col">
      <ul role="navigation" className="-mx-2 space-y-1">
        <li>
          <Link
            href={"/docs"}
            className={cn(
              pathname === "/docs"
                ? "bg-gray-50 text-primary-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-primary-600",
              "group flex gap-x-3 rounded-md p-2 pl-3 text-sm/6 font-semibold"
            )}
          >
            Documentation
          </Link>
        </li>
        <li>
          <Link
            href={"/solutions"}
            className={cn(
              pathname === "/solutions"
                ? "bg-gray-50 text-primary-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-primary-600",
              "group flex gap-x-3 rounded-md p-2 pl-3 text-sm/6 font-semibold"
            )}
          >
            Solutions
          </Link>
        </li>
        {DataGridComponents.map((component) => {
          const isCurrent = component.href === pathname;
          return (
            <li key={component.title}>
              <Link
                href={component.href}
                className={cn(
                  isCurrent ? "bg-gray-50 text-primary-600" : "text-gray-700 hover:bg-gray-50 hover:text-primary-600",
                  "group flex gap-x-3 rounded-md p-2 pl-3 text-sm/6 font-semibold"
                )}
              >
                {component.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
