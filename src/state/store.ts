import {
  DBUser,
  NotificationTypes,
  RecruitmentTypes,
  jobTypes,
  serviceTypes,
} from "@/src/utils/types";
import { DocumentData } from "firebase/firestore";
import { create } from "zustand";

//state types
export interface UserStore {
  user: DocumentData;
  storeUser: (user: DocumentData) => void;
  increaseUserBalance: (amount: number) => void;
  decreaseUserBalance: (amount: number) => void;
}

export interface UsersStore {
  users: DocumentData[];
  storeUsers: (users: DocumentData[]) => void;
  updateUsers: (user: DBUser) => void;
}

export interface JobStore {
  jobs: DocumentData[];
  storeJobs: (jobs: DocumentData[]) => void;
  addJob: (job: DocumentData) => void;
}

export interface CareerStore {
  careers: RecruitmentTypes[];
  storeCareers: (careers: RecruitmentTypes[]) => void;
  addCareer: (career: RecruitmentTypes) => void;
  updateCareer: (career: RecruitmentTypes) => void;
  deleteCareer: (career: RecruitmentTypes) => void;
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

export interface ProductsStore{
  products: DocumentData[];
  storeProducts: (products: DocumentData[]) => void;  
  addProduct: (product: DocumentData) => void;
}

export interface ReviewsStore{
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
  storeRequests: (requests: DocumentData[]) => void;
  deleteRequest: (request: DocumentData) => void;
}

export interface notificationStore {
  notifications: NotificationTypes[];
  storeNotifications: (notifications: NotificationTypes[]) => void;
}

export interface imageStore {
  image: string | null;
  updateImage: (image: string) => void;
}

// global states

export const useUserStore = create<UserStore>((set) => ({
  user: {"walletBalance": "100000000", "email": "smoq1@gmail.com", "is_admin": true, "referee": "",},
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
  decreaseUserBalance: ( amount) => {
    set((state) => {
      state.user.walletBalance = (
        parseFloat(state.user?.walletBalance) - amount
      ).toString();
      return {
        user: state.user,
      };
    });
  }
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
}));

export const useCareerStore = create<CareerStore>((set) => ({
  careers: [],
  storeCareers: (careers) => {
    set((state) => {
      state.careers = careers;

      return {
        careers: state.careers,
      };
    });
  },
  addCareer: (career) => {
    set((state) => {
      state.careers.push(career);

      return {
        careers: state.careers,
      };
    });
  },

  updateCareer: (career) => {
    set((state) => {
      const updatedCareers = state.careers.filter(
        (storedCareer) => storedCareer._id !== career._id
      );

      updatedCareers.push(career);

      return {
        careers: state.careers,
      };
    });
  },

  deleteCareer: (career) => {
    set((state) => {
      const updatedCareers = state.careers.filter(
        (storedCareer) => storedCareer._id !== career._id
      );

      state.careers = updatedCareers;

      return {
        careers: state.careers,
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
  storeProducts: (products) => {
    set((state) => {
      state.products = products;

      return {
        products: state.products,
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
  }
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
      const updatedReviews = [...state.reviews, reviews]

      return {
        reviews: updatedReviews
      }
    })
  }
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
  storeRequests: (requests) => {
    set((state) => {
      state.requests = requests;

      return {
        requests: state.requests,
      };
    });
  },
  deleteRequest: (request) => {
    set((state) => {
      const filteredRequests = state.requests.filter(req => req._id !== request._id);

      return {
        requests: filteredRequests
      }
    })
  }
}));

export const useNotificationStore = create<notificationStore>((set) => ({
  notifications: [],
  storeNotifications: (notifications) => {
    set((state) => {
      state.notifications = notifications;

      return {
        notifications: state.notifications,
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
}) )