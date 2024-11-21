import {
  HTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  RefObject,
} from "react";
import { TSelection } from "../hooks/useSelectionZone";

const getPositionedStyles = (selection: NonNullable<TSelection>) => {
  return {
    top: Math.min(selection.y1, selection.y2),
    left: Math.min(selection.x1, selection.x2),
    width: Math.abs(selection.x2 - selection.x1),
    height: Math.abs(selection.y2 - selection.y1),
  };
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  selectionContainerRef: RefObject<HTMLDivElement>;
  isSelecting: boolean;
  selection: TSelection;
  handleMouseDown: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseUp: (e: MouseEvent) => void;
}

export const SelectionBoundary = ({
  children,
  selectionContainerRef,
  isSelecting,
  selection,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  style,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <div
      ref={selectionContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ ...style, position: "relative" }}
      {...props}
    >
      {/* children have to own the 'id' property */}
      {children}
      {selection && isSelecting && (
        <div
          style={{
            ...getPositionedStyles(selection),
            position: "absolute",
            zIndex: 50,
            border: "1px dashed #3b82f6",
            backgroundColor: "#bfdbfe",
            opacity: 0.5,
          }}
        />
      )}
    </div>
  );
};
