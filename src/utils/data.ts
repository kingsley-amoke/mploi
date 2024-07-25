import { collection, doc, DocumentData, getDoc, getDocs } from 'firebase/firestore';
import NaijaStates from 'naija-state-local-government'
import { firestoreDB } from './firebaseConfig';


//get image blog
export const getBlobFroUri = async (uri:string) => {
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    return blob
  };

  //demo categories

  export  const categories = [
    {
      id: 1,
      name: "Printing/Publishing",
      subcategories: [
        { 
          name: "Graphics designer"
         }, 
         { 
          name: "Typist" 
        },
        {
          name: "Printer"
        }
      ],
    },
    {
      id: 2,
      name: "Fashion Designer",
      subcategories: [
        { name: "Male" }, 
        { name: "Female" }],
    },
    {
      id: 3,
      name: "Photographer/VideoGrapher",
      subcategories: [
        { name: "Passport/photographs" }, 
        { name: "Birthday coverage" },
        {name: "Wedding coverage"},
        {name: "burial coverage"},
        {name: "Naming ceremony" },
      ],
    },
  ];

  //social links

  export const socialLinks = {
    instagram: {
      link: "https://www.instagram.com/mploi24?igsh=MWpudmJuZWJrM3BwZA==",
      color: "#F560e4",
    },
    facebook: {
      link: "https://www.facebook.com/profile.php?id=61560893493484&mibextid=ZbWKwL",
      color: "blue",
    },
    whatsapp: {
      link: "https://whatsapp.com/channel/0029VadDAer5a23uDggtCK3d",
      color: "green",
    },
    twitter: { link: "https://x.com/MPLOi_Global?t=4Ct7lflX8xb-LtK-lN0emg&s=09", color: "#07143F" },
    youtube: { link: "https://youtube.com/@mploi_global?si=59YXxkVlqC75-LM3", color: "red" },
  };
  

  //states and lgas

  export const getStates = () => {
    const states = NaijaStates.all()
   
    const data = states.map((state, index:number) => (
      {
        id: index,
        name: state.state,
      }
    )
   )
   
   return data
   }
   
   export const getLGAsByState = (state: string) => {
     const stateLGAs = NaijaStates.lgas(state)
   
   
     const data = stateLGAs.lgas.map((lga:string, index:number) => (
       {
         id: index,
         name: lga,
       }
     ))
   return data
   }

   //fetch user

   export const getUser = async(id: string) => {

     const docRef = doc(firestoreDB, "users", id);
     const docSnap = await getDoc(docRef);
     
     if (docSnap.exists()) {
       const user = docSnap.data();
       
       return user;
      } else {

        console.log("No such document!");
        return []
      }
    }

    //fetch all users

    export const getUsers = async() => {
      const usersRef = collection(firestoreDB, "users");

      const users: DocumentData[] = [];
  
      const querySnapshot = await getDocs(usersRef);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      return users
    }

    //sort user by id

    export const fetchUserById = (users: DocumentData[], id:string) => {

      const user = users.find((user) => user._id === id);

      return user;
    }