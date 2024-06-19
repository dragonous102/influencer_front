import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          // {
          //   title: t('app'),
          //   path: paths.dashboard.root,
          //   icon: ICONS.dashboard,
          // },
          // {
          //   title: t('ecommerce'),
          //   path: paths.dashboard.general.ecommerce,
          //   icon: ICONS.ecommerce,
          // },
          // {
          //   title: t('analytics'),
          //   path: paths.dashboard.general.analytics,
          //   icon: ICONS.analytics,
          // },
          // {
          //   title: t('banking'),
          //   path: paths.dashboard.general.banking,
          //   icon: ICONS.banking,
          // },
          // {
          //   title: t('booking'),
          //   path: paths.dashboard.general.booking,
          //   icon: ICONS.booking,
          // },
          {
            title: t('Articles'),
            path: paths.dashboard.fileManager,
            icon: ICONS.invoice,
            children: [
              { title: t('Influencer Marketing'), path: paths.dashboard.influencermarketing.root },
              { title: t('Social Media'), path: paths.dashboard.socialmediamarketing.root },
              { title: t('Affiliate Marketing'), path: paths.dashboard.affiliatemarketing.root },
              { title: t('eCommerce'), path: paths.dashboard.ecommerce.root },
              { title: t('AI Marketing'), path: paths.dashboard.aimarketing.root },
              // { title: t('eMail Marketing'), path: paths.dashboard.emailmarketing.root },
            ],
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          {
            title: t('Platforms'),
            path: paths.dashboard.invoice.root,
            icon: ICONS.blog,
            children: [
              { title: t('Influencer Marketing Platforms'), path: paths.dashboard.influencermarketing.platforms },
              { title: t('Social Media Marketing'), path: paths.dashboard.socialmediamarketing.platforms },
              { title: t('Social Media Mornitoring'), path: paths.dashboard.socialmediamarketing.mornitoring },
              { title: t('Affiliate Marketing Software'), path: paths.dashboard.affiliatemarketing.platforms },
              { title: t('eCommerce'), path: paths.dashboard.ecommerce.platforms },
              { title: t('AI Marketing'), path: paths.dashboard.aimarketing.platforms },
              { title: t('Amazon Marketing Software'), path: paths.dashboard.amazonmarketing.platforms },
            ],
          },
          {
            title: t('Agencies'),
            path: paths.dashboard.invoice.root,
            icon: ICONS.blog,
            children: [
              { title: t('Influencer Marketing Agencies'), path: paths.dashboard.influencermarketing.platforms },
              { title: t('Web-Development Agencies'), path: paths.dashboard.socialmediamarketing.platforms },
              { title: t('Digital Marketing Agencies'), path: paths.dashboard.amazonmarketing.platforms },
              { title: t('Social Media Agencies'), path: paths.dashboard.socialmediamarketing.mornitoring },
              { title: t('Crypto & NFT Agencies'), path: paths.dashboard.affiliatemarketing.platforms },
              { title: t('eCommerce Agencies'), path: paths.dashboard.ecommerce.platforms },
              { title: t('Branding Agencies'), path: paths.dashboard.aimarketing.platforms },
            ],
          },
          {
            title: t('Resources'),
            path: paths.dashboard.invoice.root,
            icon: ICONS.job,
            children: [
              { title: t('Benchmark Report 2024'), path: paths.dashboard.invoice.root },
              { title: t('Tools'), path: paths.dashboard.invoice.timeline },
              { title: t('Member Login'), path: paths.auth.jwt.login },
            ],
          },
          {
            title: t('About Us'),
            path: paths.dashboard.invoice.root,
            icon: ICONS.ecommerce,
            children: [
              { title: t('About Our Company'), path: paths.dashboard.invoice.root },
              { title: t('Agencies Testing Methodology'), path: paths.dashboard.invoice.timeline },
              { title: t('Software Testing Methodology'), path: paths.auth.jwt.login },
            ],
          },

        ],
      },
    ],
    [t]
  );

  return data;
}
