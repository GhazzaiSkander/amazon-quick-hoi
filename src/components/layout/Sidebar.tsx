"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bot,
  Cable,
  CheckSquare,
  FolderArchive,
  Home,
  Laptop,
  MessageSquarePlus,
  Search,
  Settings2,
  UserCircle,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const mainNavigation: NavigationItem[] = [
  {
    label: "New chat",
    href: "/chat",
    icon: MessageSquarePlus,
  },
  {
    label: "Activity feed",
    href: "/activity",
    icon: Activity,
  },
  {
    label: "Saved",
    href: "/saved",
    icon: FolderArchive,
  },
  {
    label: "Agents & Skills",
    href: "/agents-skills",
    icon: Bot,
  },
];

const settingsNavigation: NavigationItem[] = [
  {
    label: "Setup",
    href: "/setup",
    icon: Wrench,
  },
  {
    label: "Capabilities",
    href: "/capabilities",
    icon: Cable,
  },
  {
    label: "My computer",
    href: "/my-computer",
    icon: Laptop,
  },
  {
    label: "My context",
    href: "/my-context",
    icon: Home,
  },
  {
    label: "Customization",
    href: "/customization",
    icon: Settings2,
  },
];

function NavigationLink({
  item,
  pathname,
}: {
  item: NavigationItem;
  pathname: string;
}) {
  const Icon = item.icon;
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
        isActive
          ? "bg-white/15 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon size={17} strokeWidth={1.8} />
      <span>{item.label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[280px] shrink-0 flex-col bg-hoi-navy text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-semibold">
            HOI
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              House of
            </p>
            <p className="text-lg font-semibold tracking-tight">Ichigo</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1 px-3 py-4">
        {mainNavigation.map((item) => (
          <NavigationLink
            key={item.href}
            item={item}
            pathname={pathname}
          />
        ))}
      </nav>

      <div className="px-5 py-2">
        <p className="text-xs font-medium text-white/45">Recents</p>

        <div className="mt-3 flex items-center gap-3 text-white/50">
          <button
            type="button"
            aria-label="Edit recents"
            className="rounded-md p-1.5 hover:bg-white/10 hover:text-white"
          >
            <CheckSquare size={15} />
          </button>

          <button
            type="button"
            aria-label="Search recents"
            className="rounded-md p-1.5 hover:bg-white/10 hover:text-white"
          >
            <Search size={15} />
          </button>
        </div>

        <p className="mt-4 text-xs text-white/30">
          No conversations yet
        </p>
      </div>

      <div className="mt-auto border-t border-white/10 px-3 py-4">
        <p className="px-3 pb-2 text-xs font-medium text-white/45">
          Settings
        </p>

        <nav className="space-y-1">
          {settingsNavigation.map((item) => (
            <NavigationLink
              key={item.href}
              item={item}
              pathname={pathname}
            />
          ))}
        </nav>

        <div className="mt-5 flex items-center gap-3 border-t border-white/10 px-3 pt-4">
          <UserCircle size={23} className="text-white/70" />

          <div>
            <p className="text-sm font-medium">Skander</p>
            <p className="text-xs text-white/45">Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}