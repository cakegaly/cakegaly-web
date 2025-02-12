export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string };

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
  copyRight: string;
  email: string;
};

declare global {
  interface Window {
    instgrm: any;
  }
}
