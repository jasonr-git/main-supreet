// Application routes configuration
export const ROUTES = {
  HOME: '/',
  ABOUT: '/aboutus',
  GALLERY: '/gallery',
  DEPOSIT: '/deposit',
  LOAN: '/loan',
  OTHERS: '/others',
  CONTACT: '/contact',
  NEWS: '/news',
  OPEN_ACCOUNT: '/openaccount',
  PAYMENT: '/payment',
  PAYMENT_LINK: '/paymentlink',
  APPLICATION: '/application',
  PROGRESS: '/progress',
  CHAT_MOBILE: '/chatmob'
};

// Navigation menu items
export const NAV_ITEMS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'About Us', path: ROUTES.ABOUT },
  { label: 'Gallery', path: ROUTES.GALLERY },
  { 
    label: 'Services', 
    submenu: [
      { label: 'Deposit', path: ROUTES.DEPOSIT },
      { label: 'Loan', path: ROUTES.LOAN },
      { label: 'Others', path: ROUTES.OTHERS }
    ]
  },
  { label: 'Stats', path: ROUTES.PROGRESS }
];

export default ROUTES;