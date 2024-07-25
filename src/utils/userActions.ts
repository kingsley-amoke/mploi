import AsyncStorage from "@react-native-async-storage/async-storage";
import {  SyncUserTypes } from "./types";

const url = process.env.EXPO_PUBLIC_DB_URL as string;


//fetch all users
export const fetchUsers = async () => {
  try {
    const result = await fetch(`${url}/users`);
    if(!result.ok) return []
    const res = await result.json();
    return res;
  } catch (error) {
    console.log("user" + error);
  }
};

//fetch a user
export const fetchUser = async (email: string) => {

  try {
    const res = await fetch(`${url}/users/${email}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

//get user from local storage

export const getLoggedUser = async () => {
  const user = await AsyncStorage.getItem("@user");
  if (!user) return null;

  const parsedUser = JSON.parse(user);
  return parsedUser;
};

//create user

export const addUser = async (data: any) => {


  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }

  const result = await fetch(`${url}/users/create`, options);

  const res = await result.json();
 
  console.log(res)
  return res;
};

export const syncUser = async (user: SyncUserTypes) => {


  const userData = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    image: user.image,
    password: user.password,
    role: "user",
    address: "enter your address",
    nin: "123456789",
    status: { isVerified: false, isVIP: false },
    guarantors: []
  };

  const data = await fetchUser(userData.email);


  if (data.message){

  const dbUser = addUser(userData).then(async(syncUser) =>{

    //add referral bonus to user
    if(!user.referee) return
      const referee = await fetchUser(user.referee)
      if(referee){
    
    
        const referrals = [...referee.referrals, userData.email]
    
        const data = {
          email: referee.email,
          walletBalance: (parseInt(referee.walletBalance) + 200).toString(),
          referrals: referrals
        }
      
    
        await updateWallet(data)
      }
      return syncUser
    });

    return dbUser
  }

};



//update user job fields

export const updateUserJob = async (data: any) => {
  const job = { jobs: data };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  };

  const loggedUser = await getLoggedUser();

  const user = await fetch(
    `${url}/users/update/jobs/${loggedUser?.email}`,
    options
  );

  return await user;

  // return services.json()
};

export const updateUser = async (data: any) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const loggedUser = await getLoggedUser();

  if (loggedUser) {
    console.log(`User logged`);
    const user = await fetch(
      `${url}/users/update/${loggedUser?.email}`,
      options
    );
    console.log(user.json());
  }
};

//upload profile image or proof of address or nin

export const uploadImage = async (data: {
  url: string;
  userName: string;
  type: string;
}) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${url}/image/upload`, options);

  return response.json();
};

//update wallet

export const updateWallet = async (data: any) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({walletBalance:data.walletBalance, referrals: data.referrals}),
  };

 

  if (data.email) {
    console.log(`Update balance`);
    const user = await fetch(
      `${url}/users/update/${data.email}`,
      options
    );
    console.log(user.json());
  }
};
