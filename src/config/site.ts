import { SiteConfig } from '@/types';

/**
 * TODO: get site_url via T3 env
 *
 * @see https://env.t3.gg/
 */
export const siteConfig: SiteConfig = {
  name: 'cakegaly-web',
  description: 'cakegaly blog',
  url: 'https://cakegaly.com',
  ogImage: 'https://cakegaly.com/og.png',
  links: {
    twitter: 'https://twitter.com/cakegaly',
    github: 'https://github.com/cakegaly',
  },
  copyRight: 'cakegaly',
  email: 'cakegaly@gmail.com',
};
