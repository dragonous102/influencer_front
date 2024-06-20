import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    contact: `${ROOTS.DASHBOARD}/contact`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,

    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },

    influencermarketing: {
      root: `${ROOTS.DASHBOARD}/influencermarketing`,
      platforms: `${ROOTS.DASHBOARD}/influencermarketing/platforms`,

    },
    socialmediamarketing: {
      root: `${ROOTS.DASHBOARD}/socialmedia`,
      platforms: `${ROOTS.DASHBOARD}/socialmedia/platforms`,
      mornitoring: `${ROOTS.DASHBOARD}/socialmedia/mornitoring`,

    },
    emailmarketing:
    {
      root: `${ROOTS.DASHBOARD}/emailmarketing`,
      platforms: `${ROOTS.DASHBOARD}/emailmarketing/platforms`,

    },
    aimarketing: {
      root: `${ROOTS.DASHBOARD}/aimarketing`,
      platforms: `${ROOTS.DASHBOARD}/aimarketing/platforms`,
    },
    affiliatemarketing: {
      root: `${ROOTS.DASHBOARD}/affiliatemarketing`,
      platforms: `${ROOTS.DASHBOARD}/affiliatemarketing/platforms`,
    },
    ecommerce: {
      root: `${ROOTS.DASHBOARD}/affiliatemarketing`,
      platforms: `${ROOTS.DASHBOARD}/affiliatemarketing/platforms`,
    },
    amazonmarketing: {
      root: `${ROOTS.DASHBOARD}/amazonmarketing`,
      platforms: `${ROOTS.DASHBOARD}/amazonmarketing/platforms`,
    },

  },
};
