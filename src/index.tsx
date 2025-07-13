import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

import type { CrossfadeImageProps } from "./types";
import { useCrossfade } from "./hooks/useCrossfade";

/**
 * A React component that smoothly crossfades between images when the `src` prop changes.
 *
 * @param props.duration - Duration of the crossfade animation in milliseconds. Defaults to 500.
 * @param props.easing - Easing function for the animation. Defaults to `Easing.ease`.
 * @param props.src - The source of the image to display. Changing this prop triggers the crossfade.
 * @param props.style - Optional style to apply to the root View.
 * @param props.children - Optional children to render inside the root View.
 *
 * @returns A React element that displays an image with a crossfade transition when the source changes.
 */
export const CrossfadeImage: React.FC<CrossfadeImageProps> = ({ duration = 500, easing = Easing.ease, ...props }) => {
  const { handleLoad, handleUpdate, previousImageOpacity, currentImageOpacity, prevImageSrc, currentImageSrc } =
    useCrossfade(duration, easing, props.src);

  return (
    <View style={[styles.root, props.style]}>
      <Animated.Image
        style={[styles.image, { opacity: previousImageOpacity }]}
        source={prevImageSrc}
        fadeDuration={0}
        onLoad={handleUpdate}
      />
      {currentImageSrc && (
        <Animated.Image
          style={[styles.image, { opacity: currentImageOpacity }]}
          source={currentImageSrc}
          fadeDuration={0}
          onLoad={handleLoad}
        />
      )}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
});
