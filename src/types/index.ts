import type { EasingFunction, ImageProps } from "react-native";

export interface CrossfadeImageProps extends Omit<ImageProps, "blurRadius"> {
  /** The source URI of the image to display. */
  src: string;
  /** The source URI of the next image to display. */
  nextImage: string;
  /** Duration of the crossfade animation in milliseconds. */
  duration?: number;
  /** Interval between image transitions (ms). */
  interval?: number;
  /** Scale factor for the image during animation. */
  scaleFactor?: number;
  /** If true, reverses the direction of the fade animation. */
  reverseFade?: boolean;
  /** Custom easing function for the crossfade animation. */
  easing?: EasingFunction;
  /** Optional children to render over the image. */
  children?: React.ReactNode;
  /** Blur radius for the image. */
  blurRadius?: number;
}
