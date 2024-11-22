import { TSelection } from "./types";

export const getPositionedStyles = (selection: NonNullable<TSelection>) => {
  return {
    top: Math.min(selection.y1, selection.y2),
    left: Math.min(selection.x1, selection.x2),
    width: Math.abs(selection.x2 - selection.x1),
    height: Math.abs(selection.y2 - selection.y1),
  };
};
