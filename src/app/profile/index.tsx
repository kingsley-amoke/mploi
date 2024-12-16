import Map from "@/src/components/Map";
import Profile from "@/src/components/Profile";
import { useUsersStore, useUserStore } from "@/src/state/store";
import { auth } from "@/src/utils/firebaseConfig";

const UserProfile = () => {
  const { users } = useUsersStore();

  const user = users.find((usr) => usr._id === auth.currentUser?.uid)!;

  return <Profile user={user} />;
};

export default UserProfile;
