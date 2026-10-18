import { createContext, useContext } from "react";

// Lets every 3D part know about reduced-motion / mobile without prop drilling.
export const SceneContext = createContext({ reduced: false, mobile: false });
export const useScene = () => useContext(SceneContext);
