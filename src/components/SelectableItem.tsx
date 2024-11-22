import { PropsWithChildren } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onSelect: () => void;
  className?: string;
  id: string;
}

export default function SelectableItem({
  children,
  onSelect,
  id,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div id={id} onClick={onSelect} className={className} {...props}>
      {children}
    </div>
  );
}
