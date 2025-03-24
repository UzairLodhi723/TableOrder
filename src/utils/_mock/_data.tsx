import {
  _id,
  _price,
  _times,
  _company,
  _boolean,
  _fullName,
  _taskNames,
  _postTitles,
  _description,
  _productNames,
  _size,
  _priority,
  _paymentStatus,
  _items,
} from './_mock';
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReviewsIcon from "@mui/icons-material/Reviews";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: 'Uzair Lodhi',
  email: 'uzairlodhi723@gmail.com',
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  orderDate:_times(index),
  name: _fullName(index),
  priority:_priority(index),
  productName: _productNames(index),
  productUrl: `/assets/images/fashion/${index + 1}.jpg`,
  paymentStatus:_paymentStatus(index),
  price:_price(index),
  items:_items(index),
  company: _company(index),
  isVerified: _boolean(index),
  avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  status: index % 4 ? 'Processing' : 'Delivered',
  role:
    [
      'Leader',
      'Hr Manager',
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Project Manager',
      'Backend Developer',
      'Full Stack Designer',
      'Front End Developer',
      'Full Stack Developer',
    ][index] || 'UI Designer',
}));

// ----------------------------------------------------------------------

export const _posts = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  },
}));

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const _products = [...Array(40)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: _id(index),
    price: _price(index),
    name: _productNames(index),
    coverUrl: [`/Assets/images/fashion/${setIndex}.jpg`, `/Assets/images/fashion/${setIndex +2}.jpg`],
    description: _description(index),
    size:_size(),
    priceSale: setIndex % 3 ? null : _price(index),
    colors:
      (setIndex === 1 && COLORS.slice(0, 2)) ||
      (setIndex === 2 && COLORS.slice(1, 3)) ||
      (setIndex === 3 && COLORS.slice(2, 4)) ||
      (setIndex === 4 && COLORS.slice(3, 6)) ||
      (setIndex === 23 && COLORS.slice(4, 6)) ||
      (setIndex === 24 && COLORS.slice(5, 6)) ||
      COLORS,
    status:
      ([1, 3, 5].includes(setIndex) && 'sale') || ([4, 8, 12].includes(setIndex) && 'new') || '',
  };
});

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic-flag-de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
];

// ----------------------------------------------------------------------

export const _timeline = [...Array(5)].map((_, index) => ({
  id: _id(index),
  title: [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index],
  type: `order${index + 1}`,
  time: _times(index),
}));

// ----------------------------------------------------------------------

export const _tasks = [...Array(5)].map((_, index) => ({
  id: _id(index),
  name: _taskNames(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [
  {
    id: _id(1),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: _fullName(2),
    description: 'answered to your comment on the Minimal',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: _times(2),
    isUnRead: true,
  },
  {
    id: _id(3),
    title: 'You have new message',
    description: '5 unread messages',
    avatarUrl: null,
    type: 'chat-message',
    postedAt: _times(3),
    isUnRead: false,
  },
  {
    id: _id(4),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatarUrl: null,
    type: 'mail',
    postedAt: _times(4),
    isUnRead: false,
  },
  {
    id: _id(5),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatarUrl: null,
    type: 'order-shipped',
    postedAt: _times(5),
    isUnRead: false,
  },
];
export const orderCards = [
  {
    cardName: "Order Delivering",
    cardNumber: "170",
    cardIcon: (
      <DeliveryDiningIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />
    ),
  },
  {
    cardName: "Payment Refund",
    cardNumber: "490",
    cardIcon: (
    <CloudSyncIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />
  ),
},
  {
    cardName: "Order Cancel",
    cardNumber: "241",
    cardIcon: (
      <RemoveShoppingCartIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />
    ),
  },
  {
    cardName: "Order Shipped",
    cardNumber: "630",
    cardIcon: <LocalShippingIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />,
  },
  {
    cardName: "Pending Review",
    cardNumber: "210",
    cardIcon: <ReviewsIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />,
  },
  {
    cardName: "Pending Payment",
    cardNumber: "608",
    cardIcon: <AccessTimeIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />,
  },
  {
    cardName: "Delivered",
    cardNumber: "200",
    cardIcon: (
      <SendTimeExtensionIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />
    ),
  },
  {
    cardName: "In Progress",
    cardNumber: "656",
    cardIcon: <ModelTrainingIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />,
  },
];
export const invoiceCards = [
  {
    cardName: "Total Invoice",
    cardNumber: "2310",
    cardIcon: (
    <CloudSyncIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />
  ),
},
  {
    cardName: "Pending Invoice",
    cardNumber: "1000",
    cardIcon: (
      <RemoveShoppingCartIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />
    ),
  },
  {
    cardName: "Paid Invoice",
    cardNumber: "1310",
    cardIcon: <LocalShippingIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />,
  },
  {
    cardName: "Inactive Invoice",
    cardNumber: "1243",
    cardIcon: (
      <DeliveryDiningIcon sx={{ color: "#ff6d2f", fontSize: "26px" }} />
    ),
  },
];
