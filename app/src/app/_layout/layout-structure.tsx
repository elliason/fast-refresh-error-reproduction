import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BarChart3Icon, BellIcon, XIcon } from "lucide-react";
import { NavigationMenuDesktop, NavigationMenuMobile } from "./navigation-menu";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LayoutStructure({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex shrink-0 items-center"></div>
                <div className="hidden md:-my-px md:ml-6 md:flex md:space-x-8">
                  <NavigationMenuDesktop />
                </div>
              </div>

              <div className="-mr-2 flex items-center md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <BarChart3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <NavigationMenuMobile />
          </DisclosurePanel>
        </Disclosure>

        <div className="py-10">
          {/* <header>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                        </div>
                    </header> */}
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
