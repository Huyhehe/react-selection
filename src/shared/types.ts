import { CSSProperties } from "react";

export type TSelection = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} | null;

export type TSelectableItem = {
  ID: string;
};

export type CollisionType = "absolutely-inside" | "intersect";

interface Classes {
  root: string;
  selectionBox: string;
}

export type SelectionZoneBaseProps = {
  className?: string;
  classes?: Partial<Classes>;
  selectionBoxStyle?: CSSProperties;
};
