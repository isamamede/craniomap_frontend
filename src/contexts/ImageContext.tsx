import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { TLayout, TImage as TPicture } from "../@types/image";

type TImage = {
  image: TPicture | null;
  setImage: Dispatch<SetStateAction<TPicture | null>>;
  layout: TLayout;
  setLayout: Dispatch<SetStateAction<TLayout>>;
};

interface IProps {
  children: React.ReactNode;
}
const ImageContext = createContext<TImage>({
  image: null,
  setImage: () => {},
  layout: "Frontal",
  setLayout: () => {},
});

const ImageProvider: React.FC<IProps> = ({ children }) => {
  const [image, setImage] = useState<TPicture | null>(null);
  const [layout, setLayout] = useState<TLayout>("Frontal");
  return (
    <ImageContext.Provider value={{ image, setImage, layout, setLayout }}>
      {children}
    </ImageContext.Provider>
  );
};

function useImage() {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImage must be used within a ImageProvider");
  }
  return context;
}

export { ImageProvider, useImage };
