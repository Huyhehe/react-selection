import { HTMLAttributes, PropsWithChildren } from "react";
import { useSelectionZone } from "../hooks/useSelectionZone";
import {
  CollisionType,
  SelectionZoneBaseProps,
  TSelectableItem,
} from "../shared/types";
import { getPositionedStyles } from "../shared/utils";

type Props<T> = HTMLAttributes<HTMLDivElement> &
  SelectionZoneBaseProps & {
    items: T[];
    collisionType?: CollisionType;
    onSelectReturn: (items: T[]) => void;
    mouseDownExtendedCallBack?: () => void;
  };

export default function SelectionZone<T extends TSelectableItem>({
  children,
  classes,
  className,
  style,
  selectionBoxStyle,
  collisionType,
  items,
  onSelectReturn,
  mouseDownExtendedCallBack,
  ...props
}: PropsWithChildren<Props<T>>) {
  const {
    selectionContainerRef,
    isSelecting,
    selection,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useSelectionZone<T>({ collisionType });

  return (
    <div
      {...props}
      ref={selectionContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={(e) =>
        handleMouseMove({
          e,
          selection,
          isSelecting,
          items,
          selectionContainerRefCurrent: selectionContainerRef.current,
          callback: (items) => onSelectReturn(items),
        })
      }
      onMouseUp={() => handleMouseUp()}
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
