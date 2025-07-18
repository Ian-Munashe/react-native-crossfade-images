import React from "react";
import { View, StyleSheet } from "react-native";
import { CrossfadeImage } from "react-native-crossfade-images";

const images: string[] = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
  "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
];

export default function App() {
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(index >= images.length - 1 ? 0 : index + 1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <View style={styles.container}>
      <CrossfadeImage src={images[index]}>{/* <CustomComponent /> */}</CrossfadeImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
