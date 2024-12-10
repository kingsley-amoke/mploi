import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

export default function ViewImage({ image }: { image: string }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => handleGoBack()}
        style={{
          width: 60,
          height: 10,
          marginTop: 30,
          flex: 1,
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={40}
          color={Colors.primary}
        />
      </Pressable>

      <Image
        style={styles.image}
        source={{ uri: image }}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={100}
        cachePolicy="disk"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "relative",
  },
  image: {
    flex: 10,
    width: "100%",
  },
});
