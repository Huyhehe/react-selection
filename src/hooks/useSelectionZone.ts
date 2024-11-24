import { type MouseEvent, useCallback, useRef, useState } from "react";
import { CollisionType, TSelectableItem, TSelection } from "../shared/types";

type HandleMouseMoveCBProps<T> = {
  e: MouseEvent;
  selection: TSelection;
  isSelecting: boolean;
  items: T[];
  selectionContainerRefCurrent: HTMLDivElement | null;
  callback: (items: T[]) => void;
};

const checkIntersecting = (
  selectionBox: NonNullable<TSelection>,
  itemBox: NonNullable<TSelection>,
  collisionType: CollisionType = "intersect"
) => {
  const selectionX1 = Math.min(selectionBox.x1, selectionBox.x2);
  const selectionY1 = Math.min(selectionBox.y1, selectionBox.y2);
  const selectionX2 = Math.max(selectionBox.x1, selectionBox.x2);
  const selectionY2 = Math.max(selectionBox.y1, selectionBox.y2);

  // Check if item intersects with the selection box
  const intersect =
    Math.min(selectionX2, itemBox.x2) > Math.max(selectionX1, itemBox.x1) &&
    Math.min(selectionY2, itemBox.y2) > Math.max(selectionY1, itemBox.y1);

  const absolutelyInside =
    selectionX1 <= itemBox.x1 &&
    selectionX2 >= itemBox.x2 &&
    selectionY1 <= itemBox.y1 &&
    selectionY2 >= itemBox.y2;

  const collisionTypes = {
    intersect,
    "absolutely-inside": absolutelyInside,
  };

  return collisionTypes[collisionType];
};

interface UseSelectionZoneProps<_> {
  collisionType?: CollisionType;
}

export const useSelectionZone = <T extends TSelectableItem>({
  collisionType,
}: UseSelectionZoneProps<T> = {}) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState<TSelection>(null);

  const selectionContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    const selectionContainerRefCurrent = selectionContainerRef.current;
    if (!selectionContainerRefCurrent) return;

    setIsSelecting(true);

    const { left, top } = selectionContainerRefCurrent.getBoundingClientRect();

    setSelection({
      x1: e.clientX - left,
      y1: e.clientY - top,
      x2: e.clientX - left,
      y2: e.clientY - top,
    }); // to define the start of the selection
  };

  const handleMouseMove = useCallback(
    ({
      e,
      selection,
      isSelecting,
      items,
      selectionContainerRefCurrent,
      callback,
    }: HandleMouseMoveCBProps<T>) => {
      if (!selectionContainerRefCurrent || !isSelecting || !selection) return;

      const containerRect =
        selectionContainerRefCurrent.getBoundingClientRect();

      const { left, top } = containerRect;
      const newSelection = {
        ...selection,
        x2: e.clientX - left,
        y2: e.clientY - top,
      };

      setSelection(newSelection); // to draw the selection box

      const selectedItems = items.filter((item) => {
        const itemElement = document.getElementById(item.ID);

        if (!itemElement) return false;

        const { left, top, right, bottom } =
          itemElement.getBoundingClientRect();
        const itemBox = {
          x1: left - containerRect.left,
          y1: top - containerRect.top,
          x2: right - containerRect.left,
          y2: bottom - containerRect.top,
        };

        return checkIntersecting(newSelection, itemBox, collisionType);
      });

      callback(selectedItems);
    },
    [collisionType]
  );

  const handleMouseUp = (extendedCallback?: () => void) => {
    extendedCallback?.();
    setIsSelecting(false);
  };

  return {
    selectionContainerRef,
    isSelecting,
    selection,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
