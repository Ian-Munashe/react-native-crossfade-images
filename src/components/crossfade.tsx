import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { View, StyleSheet, Image } from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import type { CrossfadeImageProps } from "../types";

/**
 * CrossfadeImage
 *
 * A React Native component that smoothly crossfades between images using animation.
 * When the `src` prop changes, the previous image fades out while the new image fades in,
 * optionally scaling during the transition. You can also overlay children on top of the image.
 *
 * @param {CrossfadeImageProps} props - The props for the CrossfadeImage component.
 * @param {string} [props.src] - The URI of the image to display.
 * @param {number} [props.duration=500] - Duration of the crossfade animation in milliseconds.
 * @param {number} [props.interval] - Interval between image transitions (used for scale animation).
 * @param {number} [props.scaleFactor=1] - Scale factor for the image during animation (default is 1) max is 1.2.
 * @param {boolean} [props.reverseFade] - If true, reverses the direction of the fade animation.
 * @param {EasingFunction} [props.easing] - Custom easing function for the crossfade animation.
 * @param {React.ReactNode} [props.children] - Optional children to render over the image.
 * @param {number|Animated.Value|Animated.AnimatedInterpolation} [props.blurRadius] - Blur radius for the image.
 * @param {StyleProp<ImageStyle>} [props.style] - Style for the image container.
 *
 * @example
 * <CrossfadeImage src={imageUrl} duration={800} scaleFactor={1.05}>
 *   <Text style={{ color: 'white' }}>Overlay Text</Text>
 * </CrossfadeImage>
 */
export const CrossfadeImage: React.FC<CrossfadeImageProps> = ({
  duration = 500,
  scaleFactor = 1,
  blurRadius = 0,
  easing = Easing.inOut(Easing.ease),
  ...props
}) => {
  const [currentImage, setCurrentImage] = useState(props.src);
  const [prevImage, setPrevImage] = useState<string | null>(null);

  const scale: number = scaleFactor < 1 ? 1 : scaleFactor > 1.2 ? 1.2 : scaleFactor;

  useEffect(() => {
    if (props.src !== currentImage) {
      setPrevImage(currentImage ?? null);
      setCurrentImage(props.src);
    }
  }, [props.src, currentImage]);

  const commonTransition = useMemo(
    () => ({
      type: "timing" as const,
      duration,
      easing,
    }),
    [duration, easing]
  );

  const scaleTransition = useMemo(
    () => ({
      type: "timing" as const,
      duration: props.interval ?? 0,
      easing,
    }),
    [props.interval, easing]
  );

  return (
    <View style={[styles.root, props.style]}>
      <MotiView
        from={{ opacity: 1, scale }}
        animate={{ opacity: 0, scale: 1 }}
        style={StyleSheet.absoluteFill}
        key={`prev-image-${prevImage}`}
        transition={{ ...commonTransition, scale: scale > 1 ? scaleTransition : undefined }}
      >
        {prevImage && <Image blurRadius={blurRadius} source={{ uri: prevImage }} style={styles.image} />}
      </MotiView>
      <MotiView
        from={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale }}
        style={StyleSheet.absoluteFill}
        key={`current-image-${currentImage}`}
        transition={{ ...commonTransition, scale: scale > 1 ? scaleTransition : undefined }}
      >
        {currentImage && <Image blurRadius={blurRadius} source={{ uri: currentImage }} style={styles.image} />}
      </MotiView>
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
