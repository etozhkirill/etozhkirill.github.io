import { LinkProps } from 'next/link';

export default interface BreadcrumbsLink extends LinkProps {
  name: string;
}
