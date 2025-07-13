import type { EasingFunction, ImageProps } from "react-native";

export interface CrossfadeImageProps extends ImageProps {
  src?: string;
  duration?: number;
  reverseFade?: boolean;
  easing?: EasingFunction;
  children?: React.ReactNode;
}
