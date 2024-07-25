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
  user: DocumentData | null;
  storeUser: (user: DocumentData) => void;
}

export interface UsersStore {
  users: DocumentData[];
  storeUsers: (users: DocumentData[]) => void;
  updateUsers: (user: DBUser) => void;
}

export interface JobStore {
  jobs: jobTypes[];
  storeJobs: (jobs: jobTypes[]) => void;
  addJob: (job: jobTypes) => void;
}

export interface CareerStore {
    careers: RecruitmentTypes[];
    storeCareers: (careers: RecruitmentTypes[]) => void;
    addCareer: (career: RecruitmentTypes) => void;
    updateCareer: (career: RecruitmentTypes) => void;
    deleteCareer: (career: RecruitmentTypes) => void;
  }

export interface categoryStore {
  categories: serviceTypes[];
  storeCategory: (category: serviceTypes[]) => void;
  addCategory: (category: serviceTypes) => void;
}

export interface chatStore {
  chats: DocumentData[];
  storeChats: (chats: DocumentData[]) => void;
}

export interface notificationStore {
  notifications: NotificationTypes[];
  storeNotifications: (notifications: NotificationTypes[]) => void;
}

// global states

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  storeUser: (user) => {
    set((state) => {
      state.user = user;

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
        state.careers =careers;
  
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
              (storedCareer) => storedCareer._id!== career._id
            );

            updatedCareers.push(career);

            return {
                careers: state.careers,
            }
        })
    },

    deleteCareer: (career) => {
        set((state) => {
            const updatedCareers = state.careers.filter(
                (storedCareer) => storedCareer._id!== career._id
              );

              state.careers = updatedCareers
    
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