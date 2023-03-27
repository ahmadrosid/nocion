import { createContext, useContext } from "react";
import getCaretPosition from "../get-carret-position";

type PopupState = {
  open: boolean;
  position: {
    top: number;
    left: number;
  };
};

type PopupAction = {
  type: "TOGGLE_POPUP";
};

const PopupContext = createContext<{
  state: PopupState;
  dispatch: React.Dispatch<PopupAction>;
} | null>(null);

export function popupReducer(state: PopupState, action: PopupAction) {
  switch (action.type) {
    case "TOGGLE_POPUP":
      const position = getCaretPosition();
      return { open: !state.open, position };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function usePopupContext() {
  const context = useContext(PopupContext);
  if (!context)
    throw new Error(
      "usePopupContext must be used within a PopupContextProvider"
    );
  return context;
}

export default PopupContext;
