import { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  id: string;
}

export default function SelectableItem({
  children,
  id,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div id={id} className={className} {...props}>
      {children}
    </div>
  );
}
