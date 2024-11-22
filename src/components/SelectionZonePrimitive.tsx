import {
  HTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  RefObject,
} from "react";
import { SelectionZoneBaseProps, TSelection } from "../shared/types";
import { getPositionedStyles } from "../shared/utils";

interface Props extends HTMLAttributes<HTMLDivElement>, SelectionZoneBaseProps {
  selectionContainerRef: RefObject<HTMLDivElement>;
  isSelecting: boolean;
  selection: TSelection;
  handleMouseDown: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseUp: (e: MouseEvent) => void;
}

export default function SelectionZonePrimitive({
  children,
  selectionContainerRef,
  isSelecting,
  selection,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  classes,
  className,
  style,
  selectionBoxStyle,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div
      {...props}
      ref={selectionContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ ...style, position: "relative" }}
      className={`${classes?.root || ""} ${className || ""}`}
    >
      {/* children have to own the 'id' property */}
      {children}
      {selection && isSelecting && (
        <div
          className={classes?.selectionBox || ""}
          style={{
            zIndex: 50,
            border: "1px dashed #3b82f6",
            backgroundColor: "#bfdbfe",
            opacity: 0.5,
            ...selectionBoxStyle,
            ...getPositionedStyles(selection),
            position: "absolute",
          }}
        />
      )}
    </div>
  );
}
