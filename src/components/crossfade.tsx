import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

import type { CrossfadeImageProps } from "../types";
import { useCrossfade } from "../hooks/useCrossfade";

/**
 * CrossfadeImage is a React functional component that displays an image with a crossfade transition effect
 * when the image source changes. It uses two overlaid Animated.Image components to smoothly transition
 * between the previous and current image sources by animating their opacity.
 *
 * @param {number} [props.duration=500] - Duration of the crossfade animation in milliseconds.
 * @param {EasingFunction} [props.easing=Easing.ease] - Easing function for the crossfade animation.
 * @param {ImageSourcePropType} props.src - The source of the image to display.
 * @param {number} [props.blurRadius=60] - The blur radius applied to both images during the crossfade transition.
 * @param {StyleProp<ImageStyle>} [props.style] - Optional style to apply to the image container.
 * @param {React.ReactNode} [props.children] - Optional children to render inside the container.
 *
 * @returns {JSX.Element} A view containing the crossfading images and any children.
 */
export const CrossfadeImage: React.FC<CrossfadeImageProps> = ({ duration = 500, easing = Easing.ease, ...props }) => {
  const { handleLoad, handleUpdate, previousImageOpacity, currentImageOpacity, prevImageSrc, currentImageSrc } =
    useCrossfade(duration, easing, props.src);

  console.log("Prev: ", prevImageSrc);

  return (
    <View style={[styles.root, props.style]}>
      <Animated.Image
        blurRadius={props.blurRadius}
        style={[styles.image, { opacity: previousImageOpacity }]}
        source={prevImageSrc}
        fadeDuration={0}
        onLoad={handleUpdate}
      />
      {currentImageSrc && (
        <Animated.Image
          blurRadius={props.blurRadius}
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
