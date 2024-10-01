// projectData.js

// Project Details
export const projects = [
  {
    id: 1,
    title: 'SAVINGS ACCOUNT',
    description: 'One-time deposit FD options with returns for different tenures.',
    position: 'left',
    image: 'https://img.freepik.com/premium-photo/view-smart-savings-plan-saving-money-real-estate-financial-stability-vertical-mobile-wallpaper_892776-26779.jpg',
    webapp: 'https://example.com/fd-apply',
    data: {
      'Initial Deposit': '₹10,000',
      'Interest Rate': '4%',
      'Duration': '12 Months',
      'Projected Returns': '₹10,400',
    },
    info: 'A savings account is a secure way to save money while earning interest.',
  },
  {
    id: 2,
    title: 'FIXED DEPOSIT',
    description: 'Invest monthly to gain better returns over the years.',
    position: 'right',
    image: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202303/fixed-deposit-sixteen_nine_2.jpg',
    webapp: 'https://example.com/md-apply',
    data: [
      {
        amount: '₹10,000',
        returns: [10850, 11800, 13000, 14200, 20000],
      },
      {
        amount: '₹25,000',
        returns: [27125, 27125, 32500, 35500, 50000],
      },
      {
        amount: '₹50,000',
        returns: [54250, 59000, 65000, 71000, 100000],
      },
      {
        amount: '₹100,000',
        returns: [108500, 118000, 130000, 142000, 200000],
      },
      {
        amount: '₹250,000',
        returns: [271250, 295000, 325000, 355000, 500000],
      },
      {
        amount: '₹500,000',
        returns: [542500, 590000, 650000, 710000, 1000000],
      },
    ],
    info: 'Fixed Deposits offer a higher interest rate than a regular savings account.',
  },
  {
    id: 3,
    title: 'RECURRING DEPOSIT',
    description: 'Earn regular income through systematic investments.',
    position: 'left',
    image: 'https://cdn.zeebiz.com/sites/default/files/2024/06/11/298803-money-12.jpg',
    webapp: 'https://example.com/mf-apply',
    data: [
      {
        amount: '₹500',
        returns: [6000, 6333, 13320, 21034, 29549],
      },
      {
        amount: '₹1,000',
        returns: [12000, 12666, 26640, 42068, 59098],
      },
      {
        amount: '₹2,000',
        returns: [24000, 25332, 53280, 84136, 118196],
      },
      {
        amount: '₹3,000',
        returns: [36000, 37998, 79920, 126204, 177294],
      },
      {
        amount: '₹4,000',
        returns: [48000, 50664, 106560, 168272, 236392],
      },
      {
        amount: '₹5,000',
        returns: [60000, 63330, 133200, 210340, 295490],
      },
      {
        amount: '₹10,000',
        returns: [120000, 126660, 266400, 420680, 590980],
      },
    ],
    info: 'Recurring Deposits allow you to save a fixed amount every month and earn interest.',
  },
  {
    id: 4,
    title: 'SMIS',
    description: 'Get consistent returns with minimum risks.',
    position: 'right',
    image: 'https://cdn.zeebiz.com/sites/default/files/2024/06/11/298803-money-12.jpg',
    webapp: 'https://example.com/smis-apply',
    data: [
      {
        amount: '₹25,000',
        returns: [167, 177, 188, 198, 219],
      },
      {
        amount: '₹50,000',
        returns: [333, 354, 375, 396, 438],
      },
      {
        amount: '₹100,000',
        returns: [667, 708, 750, 792, 875],
      },
      {
        amount: '₹250,000',
        returns: [1667, 1771, 1875, 1979, 2188],
      },
      {
        amount: '₹500,000',
        returns: [3333, 3542, 3750, 3958, 4375],
      },
      {
        amount: '₹1,000,000',
        returns: [6667, 7083, 7500, 7917, 8750],
      },
    ],
    info: 'A systematic monthly income scheme designed for retirees.',
  },
];

// Default export
export default projects;