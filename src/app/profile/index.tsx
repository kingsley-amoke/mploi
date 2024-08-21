
import Map from "@/src/components/Map";
import Profile from "@/src/components/Profile";
import { useUserStore } from "@/src/state/store";

const UserProfile = () => {

  const {user} = useUserStore()

  // return <Profile user={user}/>;

  return <Map user={user} requestID='1' />
};

export default UserProfile;

