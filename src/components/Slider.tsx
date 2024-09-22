import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { FlatList, Image, StyleSheet } from "react-native";

const width = Dimensions.get("screen").width;

export const CarouselAutoScroll = ({ data, interval }) => {
  const imageRef = useRef();
  const [active, setActive] = useState(0);
  const indexRef = useRef(active);
  indexRef.current = active;

  useInterval(() => {
    if (active < Number(data?.length) - 1) {
      setActive(active + 1);
    } else {
      setActive(0);
    }
  }, interval);

  useEffect(() => {
    imageRef.current.scrollToIndex({ index: active, animated: true });
  }, [active]);

  const onViewableItemsChangedHandler = useCallback(
    ({ viewableItems, changed }) => {
      if (active != 0) {
        setActive(viewableItems[0].index);
      }
    },
    []
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChangedHandler}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      ref={imageRef}
      pagingEnabled
      data={data}
      horizontal
      renderItem={({ item, index }) => (
        <Image
          key={index}
          source={item.image}
          resizeMode={"contain"}
          style={{
            flex: 1,
            height: "100%",
            width: width,
          }}
        />
      )}
      style={{ ...StyleSheet.AbsoluteFill }}
    />
  );
};

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
