import {
  Image,
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { ResizeMode, Video } from "expo-av";
import ProgressBar from "./ProgressBar";
export function Uploading({
  image,
  video,
  progress,
}: {
  image?: string;
  video?: string;
  progress: number;
}) {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          backgroundColor: "black",
          opacity: 0.5,
        },
      ]}
    >
      {/* Background blur */}
      {/* <VibrancyView
        blurType="ultraThinMaterialDark"
        style={StyleSheet.absoluteFill}
        blurAmount={10}
      ></VibrancyView> */}
      {/* // Content blur */}
      <View
        style={{
          width: "70%",
          alignItems: "center",
          paddingVertical: 16,
          rowGap: 12,
          borderRadius: 14,
          backgroundColor: "white",
        }}
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              borderRadius: 6,
            }}
          />
        )}
        {video && (
          <Video
            source={{
              uri: video,
            }}
            videoStyle={{}}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.CONTAIN}
            // shouldPlay
            // isLooping
            style={{ width: 200, height: 200 }}
            // useNativeControls
          />
        )}
        <Text style={{ fontSize: 12 }}>Uploading...</Text>
        <ProgressBar progress={progress} />
        <View
          style={{
            height: 1,
            borderWidth: StyleSheet.hairlineWidth,
            width: "100%",
            borderColor: "#00000020",
          }}
        />
        <TouchableOpacity>
          <Text style={{ fontWeight: "500", color: "#3478F6", fontSize: 17 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
