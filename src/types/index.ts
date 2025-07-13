import type { Animated, EasingFunction, ImageProps } from "react-native";

/**
 * Props for the CrossfadeImage component.
 *
 * @remarks
 * Extends all properties from `ImageProps` except for `blurRadius`, which is redefined to support animated values.
 *
 * @property {string} [src] - The source URI of the image to display.
 * @property {number} [duration] - Duration of the crossfade animation in milliseconds.
 * @property {boolean} [reverseFade] - If true, reverses the direction of the fade animation.
 * @property {EasingFunction} [easing] - Custom easing function for the crossfade animation.
 * @property {React.ReactNode} [children] - Optional children to render over the image.
 * @property {number | Animated.Value | Animated.AnimatedInterpolation<string | number>} [blurRadius] - The blur radius for the image, supporting static and animated values.
 */
export interface CrossfadeImageProps extends Omit<ImageProps, "blurRadius"> {
  src?: string;
  duration?: number;
  reverseFade?: boolean;
  easing?: EasingFunction;
  children?: React.ReactNode;
  blurRadius?: number | Animated.Value | Animated.AnimatedInterpolation<string | number> | undefined;
}
