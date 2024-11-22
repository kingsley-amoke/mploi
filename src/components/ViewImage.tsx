import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ViewImage({ image }: { image: string }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={40}
        style={{ position: "absolute", top: 30, left: 10 }}
        onPress={() => router.back()}
      />
      <Image
        style={styles.image}
        source={{ uri: image }}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={1000}
        cachePolicy="disk"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
