export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView').default
  },
  {
    path: '/login',
    name: 'login',
    component: require('components/Login').default
  },
  {
    path: '/generate',
    name: 'generate',
    component: require('components/Generate').default
  },
  {
    path: '/create',
    name: 'create-issuance',
    component: require('components/CreateIssuance').default,
    meta: { authRequired: true }
  },
  {
    path: '/change-issuer',
    name: 'change-issuer',
    component: require('components/CreateChangeSingerOp').default,
    meta: { authRequired: true }
  },
  {
    path: '/view',
    name: 'view-issuance',
    component: require('components/ViewIssuance').default,
    meta: { authRequired: true }
  },
  {
    path: '*',
    redirect: '/'
  }
]
