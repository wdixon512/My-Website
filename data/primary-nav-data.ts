export type PrimaryNavItem = {
  label: string;
  href: string;
};
export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { label: 'Home', href: '/home' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Setup', href: '/setup' },
  { label: 'Contact', href: '/contact' },
];

export const isActiveNav = (href: string, path: string) =>
  href === '/home' ? path === '/' || path === '/home' : path === href || path.startsWith(href + '/');
