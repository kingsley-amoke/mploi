import {
  DBUser,
  NotificationTypes,
  RecruitmentTypes,
  jobTypes,
  serviceTypes,
} from "@/src/utils/types";
import { LocationGeocodedAddress, LocationObject } from "expo-location";
import { DocumentData } from "firebase/firestore";
import { create } from "zustand";

//state types
export interface UserStore {
  user: DocumentData;
  storeUser: (user: DocumentData) => void;
  increaseUserBalance: (amount: number) => void;
  decreaseUserBalance: (amount: number) => void;
  updateUserImage: (image: string) => void;
  removeUserImage: (image: string) => void;
}

export interface UsersStore {
  users: DocumentData[];
  storeUsers: (users: DocumentData[]) => void;
  updateUsers: (user: DBUser) => void;
}

interface Location {
  coordinates: { latitude: number; longitude: number };
  regionName: LocationGeocodedAddress;
}

export interface UserLocation {
  location: Location[];
  storeLocation: (location: Location) => void;
}

export interface TransactionStore {
  transactions: DocumentData[];
  storeTransactions: (transactions: DocumentData[]) => void;
  addTransaction: (transaction: DocumentData) => void;
}

export interface JobStore {
  jobs: DocumentData[];
  storeJobs: (jobs: DocumentData[]) => void;
  addJob: (job: DocumentData) => void;
  deleteJob: (job: DocumentData) => void;
}

export interface categoryStore {
  categories: DocumentData[];
  storeCategory: (category: DocumentData[]) => void;
  addCategory: (category: DocumentData) => void;
}

export interface shopsStore {
  shops: DocumentData[];
  storeShops: (shops: DocumentData[]) => void;
}

export interface ProductsStore {
  products: DocumentData[];
  promoted: DocumentData[];
  storeProducts: (products: DocumentData[]) => void;
  storePromoted: (products: DocumentData[]) => void;
  addProduct: (product: DocumentData) => void;
  addPromoted: (product: DocumentData) => void;
  updateProductImages: (product: DocumentData, images: string) => void;
  deleteProduct: (product: DocumentData) => void;
  deletePromoted: (product: DocumentData) => void;
}

export interface ReviewsStore {
  reviews: DocumentData[];
  storeReviews: (reviews: DocumentData[]) => void;
  updateReviews: (reviews: DocumentData) => void;
}
export interface chatStore {
  chats: DocumentData[];
  storeChats: (chats: DocumentData[]) => void;
}

export interface requestStore {
  requests: DocumentData[];
  newRequestId: string;
  storeNewRequestId: (id: string) => void;
  storeRequests: (requests: DocumentData[]) => void;
  addRequest: (request: DocumentData) => void;
  deleteRequest: (request: DocumentData) => void;
}

export interface imageStore {
  image: string | null;
  updateImage: (image: string) => void;
}

// global states

export const useUserStore = create<UserStore>((set) => ({
  user: {
    walletBalance: "100000000",
    email: "smoq1@gmail.com",
    is_admin: true,
    referee: "",
  },
  storeUser: (user) => {
    set((state) => {
      state.user = user;

      return {
        user: state.user,
      };
    });
  },
  increaseUserBalance: (amount) => {
    set((state) => {
      state.user.walletBalance = (
        parseFloat(state.user?.walletBalance || 0) + amount
      ).toString();
      return {
        user: state.user,
      };
    });
  },
  decreaseUserBalance: (amount) => {
    set((state) => {
      state.user.walletBalance = (
        parseFloat(state.user?.walletBalance) - amount
      ).toString();
      return {
        user: state.user,
      };
    });
  },
  updateUserImage: (image) => {
    set((state) => {
      state.user.photos = state.user.photos.push(image);

      return {
        user: state.user,
      };
    });
  },
  removeUserImage: (image) => {
    set((state) => {
      // const index = state.user.photos.indexOf(image);

      // if (index > -1) {
      //   const updatedArray = state.user.photos
      //     .slice(0, index)
      //     .concat(state.user.photos.slice(index + 1));

      const updatedArray = state.user.photos.filter(
        (img: string) => img !== image
      );

      state.user.photos = updatedArray;

      return {
        user: state.user,
      };
    });
  },
}));

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  storeUsers: (users) => {
    set((state) => {
      state.users = users;

      return {
        users: state.users,
      };
    });
  },
  updateUsers: (user) => {
    set((state) => {
      const updatedUsers = state.users.filter(
        (storedUser) => storedUser._id !== user._id
      );

      updatedUsers.push(user);

      state.users = updatedUsers;

      return {
        users: state.users,
      };
    });
  },
}));

export const useLocationStore = create<UserLocation>((set) => ({
  location: [],
  storeLocation: (location) => {
    set((state) => {
      state.location.push(location);

      return {
        location: state.location,
      };
    });
  },
}));

export const useTransactionsStore = create<TransactionStore>((set) => ({
  transactions: [],
  storeTransactions: (transactions) => {
    set((state) => {
      state.transactions = transactions;

      return {
        transactions: state.transactions,
      };
    });
  },
  addTransaction: (transaction) => {
    set((state) => {
      state.transactions.push(transaction);

      return {
        transactions: state.transactions,
      };
    });
  },
}));

export const useJobsStore = create<JobStore>((set) => ({
  jobs: [],
  storeJobs: (jobs) => {
    set((state) => {
      state.jobs = jobs;

      return {
        jobs: state.jobs,
      };
    });
  },
  addJob: (job) => {
    set((state) => {
      state.jobs.push(job);

      return {
        jobs: state.jobs,
      };
    });
  },
  deleteJob: (job) => {
    set((state) => {
      const updatedJobs = state.jobs.filter((p) => p._id !== job._id);

      return {
        jobs: updatedJobs,
      };
    });
  },
}));

export const useCategoryStore = create<categoryStore>((set) => ({
  categories: [],
  storeCategory: (categories) => {
    set((state) => {
      state.categories = categories;

      return {
        categories: state.categories,
      };
    });
  },
  addCategory: (category) => {
    set((state) => {
      state.categories.push(category);

      return {
        categories: state.categories,
      };
    });
  },
}));

export const useShopsStore = create<shopsStore>((set) => ({
  shops: [],
  storeShops: (shops) => {
    set((state) => {
      state.shops = shops;

      return {
        shops: state.shops,
      };
    });
  },
}));

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  promoted: [],
  storeProducts: (products) => {
    set((state) => {
      state.products = products;

      return {
        products: state.products,
      };
    });
  },
  storePromoted: (products) => {
    set((state) => {
      state.promoted = products;

      return {
        promoted: state.promoted,
      };
    });
  },
  addProduct: (product) => {
    set((state) => {
      state.products.push(product);

      return {
        products: state.products,
      };
    });
  },
  addPromoted: (product) => {
    set((state) => {
      state.promoted.push(product);

      return {
        promoted: state.promoted,
      };
    });
  },
  updateProductImages: (product, images) => {
    set((state) => {
      const thisProduct = state.products.find((p) => p._id === product._id);
      if (!thisProduct) return { products: state.products };

      const remainingProducts = state.products.filter(
        (p) => p._id !== product._id
      );

      thisProduct.images.push(images);

      const updatedProducts = [...remainingProducts, thisProduct];

      return {
        products: updatedProducts,
      };
    });
  },

  deleteProduct: (product) => {
    set((state) => {
      const updatedProducts = state.products.filter(
        (p) => p._id !== product._id
      );

      return {
        products: updatedProducts,
      };
    });
  },
  deletePromoted: (product) => {
    set((state) => {
      const updatedPromomoted = state.promoted.filter(
        (p) => p._id !== product._id
      );

      return {
        promoted: updatedPromomoted,
      };
    });
  },
}));

export const useReviewsStore = create<ReviewsStore>((set) => ({
  reviews: [],
  storeReviews: (reviews) => {
    set((state) => {
      state.reviews = reviews;

      return {
        reviews: state.reviews,
      };
    });
  },
  updateReviews: (reviews) => {
    set((state) => {
      const updatedReviews = [...state.reviews, reviews];

      return {
        reviews: updatedReviews,
      };
    });
  },
}));

export const useChatStore = create<chatStore>((set) => ({
  chats: [],
  storeChats: (chats) => {
    set((state) => {
      state.chats = chats;

      return {
        chats: state.chats,
      };
    });
  },
}));

export const useRequestStore = create<requestStore>((set) => ({
  requests: [],
  newRequestId: "",
  storeRequests: (requests) => {
    set((state) => {
      state.requests = requests;

      return {
        requests: state.requests,
      };
    });
  },
  storeNewRequestId: (id) => {
    set((state) => {
      state.newRequestId = id;
      return {
        newRequestId: state.newRequestId,
      };
    });
  },
  addRequest: (request) => {
    set((state) => {
      state.requests.push(request);

      return {
        requests: state.requests,
      };
    });
  },
  deleteRequest: (request) => {
    set((state) => {
      const filteredRequests = state.requests.filter(
        (req) => req._id !== request._id
      );

      return {
        requests: filteredRequests,
      };
    });
  },
}));

export const useImageStore = create<imageStore>((set) => ({
  image: null,
  updateImage: (image) => {
    set((state) => {
      state.image = image;

      return {
        image: state.image,
      };
    });
  },
}));
