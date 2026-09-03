"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Activity,
  BookOpen,
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
  /** Key inside the `sidebar` namespace. */
  labelKey: string;
  href: string;
  icon: LucideIcon;
};

const mainNavigation: NavigationItem[] = [
  { labelKey: "newChat", href: "/chat", icon: MessageSquarePlus },
  { labelKey: "wiki", href: "/wiki", icon: BookOpen },
  { labelKey: "activity", href: "/activity", icon: Activity },
  { labelKey: "saved", href: "/saved", icon: FolderArchive },
  { labelKey: "agents", href: "/agents-skills", icon: Bot },
];

const settingsNavigation: NavigationItem[] = [
  { labelKey: "setup", href: "/setup", icon: Wrench },
  { labelKey: "capabilities", href: "/capabilities", icon: Cable },
  { labelKey: "myComputer", href: "/my-computer", icon: Laptop },
  { labelKey: "myContext", href: "/my-context", icon: Home },
  { labelKey: "customization", href: "/customization", icon: Settings2 },
];

function NavigationLink({
  item,
  pathname,
  label,
}: {
  item: NavigationItem;
  pathname: string;
  label: string;
}) {
  const Icon = item.icon;
  const isActive =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

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
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("sidebar");

  return (
    <aside className="flex h-screen w-[280px] shrink-0 flex-col bg-hoi-navy text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-semibold">
            {t("brandInitials")}
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              {t("brandTop")}
            </p>
            <p className="text-lg font-semibold tracking-tight">
              {t("brandName")}
            </p>
          </div>
        </div>
      </div>

      <nav className="space-y-1 px-3 py-4">
        {mainNavigation.map((item) => (
          <NavigationLink
            key={item.href}
            item={item}
            pathname={pathname}
            label={t(item.labelKey)}
          />
        ))}
      </nav>

      <div className="px-5 py-2">
        <p className="text-xs font-medium text-white/45">{t("recents")}</p>

        <div className="mt-3 flex items-center gap-3 text-white/50">
          <button
            type="button"
            aria-label={t("editRecents")}
            className="rounded-md p-1.5 hover:bg-white/10 hover:text-white"
          >
            <CheckSquare size={15} />
          </button>

          <button
            type="button"
            aria-label={t("searchRecents")}
            className="rounded-md p-1.5 hover:bg-white/10 hover:text-white"
          >
            <Search size={15} />
          </button>
        </div>

        <p className="mt-4 text-xs text-white/30">{t("noConversations")}</p>
      </div>

      <div className="mt-auto border-t border-white/10 px-3 py-4">
        <p className="px-3 pb-2 text-xs font-medium text-white/45">
          {t("settings")}
        </p>

        <nav className="space-y-1">
          {settingsNavigation.map((item) => (
            <NavigationLink
              key={item.href}
              item={item}
              pathname={pathname}
              label={t(item.labelKey)}
            />
          ))}
        </nav>

        <div className="mt-5 flex items-center gap-3 border-t border-white/10 px-3 pt-4">
          <UserCircle size={23} className="text-white/70" />

          <div>
            {/* Account name is user data, not UI copy. */}
            <p className="text-sm font-medium">Skander</p>
            <p className="text-xs text-white/45">{t("role")}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
