import { DocumentData } from "firebase/firestore";
import moment from "moment";
import { ImageSourcePropType } from "react-native";

export interface chatTypes {
  _id: string;
  chatName: string;
  user: DBUser;
  employer?: DBUser;
}

export interface userTypes {
  status: { isVerifired: boolean; isVIP: boolean };
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  address: string;
  nin: string;
  image: any;
  phone: string;
  gender: string;
  guarantors: guarantorTypes[];
  jobs?: jobTypes[];
  skills: string[];
  location: string;
  walletBalance: string;
  referralBalance: string;
  referral: string[];
}

export interface guarantorTypes {
  name: string;
  phone: string;
}

export interface jobTypes {
  _id: string;
  title: string;
  description: string;
  location: loacationTypes;
  minPay: number;
  maxPay: number;
  company?: string;
  isOpen: boolean;
  date?: string;
  employer: DBUser;
  categories: string[];
  notifications?: NotificationTypes[];
}

export interface serviceTypes {
  _id: string;
  name: string;
  icon: string;
  jobs: jobTypes[];
}

export interface BankTypes {
  bank: string;
  accountName: string;
  accountNumber: string;
}

export interface loacationTypes {
  country: string;
  state: string;
  lga: string;
}

export interface Coordinstes {
  latitude: number;
  longitude: number;
}

export interface DBUser {
  _id: string;
  address: string | null;
  email: string;
  firstName: string;
  guarantors?: ContactType[];
  image: string;
  jobs?: jobTypes[] | null;
  lastName: string;
  nin: string;
  phone: string;
  skills?: string[] | null;
  status: Status;
  bio: string;
  location?: loacationTypes;
  walletBalance: string;
  referralBalance: string;
  referral: string[];
  bankDetails?: BankTypes;
  isAdmin: boolean;
  referee: string;
  phoneVerified: boolean;
  createdAt: Number;
  coordinates: Coordinstes;
}

export interface SyncUserTypes {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  phone: string;
  password: string;
  referee: string;
}
export interface ContactType {
  phone: string;
  name: string;
}
export interface Status {
  isVIP: boolean;
  isVerified: boolean;
}

interface PhoneEntry {
  number: string;
  type: string;
}

interface EmailEntry {
  address: string;
  type: string;
}

interface AddressEntry {
  formattedAddress: string; // android only
  type: string; // android only
  street: string;
  city: string;
  state: string;
  postalCode: string;
  isoCountryCode: string;
}

interface Contact {
  name: string;
  phones: PhoneEntry[];
  emails: EmailEntry[];
  postalAddresses: AddressEntry[];
}

interface ContactPhoneSelection {
  contact: Contact;
  selectedPhone: PhoneEntry;
}

interface ContactEmailSelection {
  contact: Contact;
  selectedEmail: EmailEntry;
}

interface ContactPostalAddressSelection {
  contact: Contact;
  selectedAddress: AddressEntry;
}

export interface LoanTypes {
  id: number;
  name: string;
  icon: string;
}

export interface RecruitmentTypes {
  _id: string;
  name: string;
  icon?: string;
  experience: string;
  location: loacationTypes;
  workTime: string;
  desc: string;
  requirements: string;
  others: string;
  pay: string;
}

export interface NotificationTypes {
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  _id: string;
  __v: number;
}

export interface SubscriptionTypes {
  id: number;
  name: string;
  price: number;
  duration: string;
}

interface SubShopTypes {
  name: string;
}
export interface ShopTypes {
  _id: string;
  name: string;
  subshops?: SubShopTypes[];
}

export interface ProductTypes {
  _id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  negotiable: boolean;
  sellerID: string;
  images: string[];
  video: string;
  category: string;
  promo: string;
  promoExpiresOn: string;
}

export interface ReviewTypes {
  _id: string;
  productID: string;
  userID: string;
  rating: number;
  review: string;
}
