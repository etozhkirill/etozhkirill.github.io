import React from 'react';

import AboutPageContent from '@/components/AboutPageContent';
import Page from '@/components/Page';
import BreadcrumbsLink from '@/types/BreadcrumbsLink';

const breadcrumbs: BreadcrumbsLink[] = [
  { href: '/', name: 'Главная' },
  { href: '/about', name: 'Обо мне' }
];

export default function AboutPage() {
  return (
    <Page breadcrumbs={breadcrumbs}>
      <AboutPageContent />
    </Page>
  );
}
