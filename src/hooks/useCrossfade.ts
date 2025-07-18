import React from "react";
import { Animated, Image, type EasingFunction, type ImageSourcePropType } from "react-native";

/**
 * Custom React hook for managing crossfade transitions between images in React Native.
 *
 * This hook provides animated opacity values and handlers to smoothly transition
 * between two images when the source changes, using the specified duration and easing function.
 *
 * @param duration - The duration of the crossfade animation in milliseconds.
 * @param easing - The easing function to use for the animation.
 * @param src - The URI of the current image source.
 * @returns An object containing:
 *   - handleLoad: Callback to trigger the crossfade animation when the new image loads.
 *   - handleUpdate: Callback to update the current image source and reset animation state.
 *   - previousImageOpacity: Animated value for the previous image's opacity.
 *   - currentImageOpacity: Animated value for the current image's opacity.
 *   - prevImageSrc: The previous image source.
 *   - currentImageSrc: The current image source.
 *
 * @example
 * const {
 *   handleLoad,
 *   handleUpdate,
 *   previousImageOpacity,
 *   currentImageOpacity,
 *   prevImageSrc,
 *   currentImageSrc
 * } = useCrossfade(300, Easing.linear, imageUri);
 */
export const useCrossfade = (duration: number, easing: EasingFunction, src?: string) => {
  const source: ImageSourcePropType = React.useMemo(() => ({ uri: src }), [src]);

  const prevSource = React.useRef<ImageSourcePropType>(undefined);
  const nextSource = React.useRef<ImageSourcePropType>(undefined);

  const currentImageOpacity = React.useRef(new Animated.Value(0)).current;
  const previousImageOpacity = currentImageOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const [prevImageSrc, setPrevImageSrc] = React.useState<ImageSourcePropType>(source);
  const [currentImageSrc, setCurrentImageSrc] = React.useState<ImageSourcePropType>();

  React.useEffect(() => {
    if (src) {
      if (prevSource && !isEqual(source, prevSource.current)) {
        if (!nextSource.current) setCurrentImageSrc(source);
      }
      prevSource.current = source;
    }
  }, [src, source, prevSource]);

  const handleUpdate = React.useCallback(() => {
    setCurrentImageSrc(nextSource.current);
    currentImageOpacity.setValue(0);
    if (isEqual(prevImageSrc, nextSource.current)) nextSource.current = undefined;
  }, [currentImageOpacity, prevImageSrc]);

  const handleLoad = React.useCallback(() => {
    Animated.timing(currentImageOpacity, {
      toValue: 1,
      duration,
      easing,
      useNativeDriver: true,
    }).start(() => {
      currentImageSrc && !isEqual(prevImageSrc, currentImageSrc) ? setPrevImageSrc(currentImageSrc) : handleUpdate();
    });
  }, [currentImageOpacity, prevImageSrc, currentImageSrc, duration, easing, handleUpdate]);

  return { handleLoad, handleUpdate, previousImageOpacity, currentImageOpacity, prevImageSrc, currentImageSrc };
};

const isEqual = (one?: ImageSourcePropType, two?: ImageSourcePropType): boolean => {
  if (!one && !two) return true;
  if (!one || !two) return false;
  try {
    return Image.resolveAssetSource(one).uri === Image.resolveAssetSource(two).uri;
  } catch (error) {
    return one === two;
  }
};
