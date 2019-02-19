export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/login',
    name: 'login',
    component: require('components/Login')
  },
  {
    path: '/generate',
    name: 'generate',
    component: require('components/Generate')
  },
  {
    path: '/create',
    name: 'create-issuance',
    component: require('components/CreateIssuance'),
    meta: { authRequired: true }
  },
  {
    path: '/change-issuer',
    name: 'change-issuer',
    component: require('components/CreateChangeSingerOp'),
    meta: { authRequired: true }
  },
  {
    path: '/view',
    name: 'view-issuance',
    component: require('components/ViewIssuance'),
    meta: { authRequired: true }
  },
  {
    path: '*',
    redirect: '/'
  }
]
