# React Selection

A powerful React library that enables interactive selection functionality similar to file explorers, with support for mouse-based selection boxes, collision detection, and customizable styling.

## Features

- 🎯 Click-and-drag selection box
- 🎨 Customizable selection box styling
- 🎮 Flexible collision detection modes
- 📦 Lightweight with zero external dependencies
- 🔄 Controlled selection state management
- 🎁 Written in TypeScript with full type safety
- 💅 Customizable CSS classes and styles

## Installation

```bash
npm install react-selection
# or
yarn add react-selection
```

## Core Components

### SelectionZone

The main container component that manages selection state and handles selection logic.

```tsx
import { SelectionZone } from "react-selection";

interface MyData {
  ID: string; // ID is required for all items
  // ... other properties
}

function App() {
  const [selectedItems, setSelectedItems] = useState<MyData[]>([]);

  return (
    <SelectionZone<MyData>
      items={data}
      onSelectReturn={setSelectedItems}
      collisionType="intersect"
      className="grid grid-cols-12 gap-2"
    >
      {/* SelectableItem components */}
    </SelectionZone>
  );
}
```

#### Props

| Prop                        | Type                                       | Required | Description                                                     |
| --------------------------- | ------------------------------------------ | -------- | --------------------------------------------------------------- |
| `items`                     | `T[]`                                      | Yes      | Array of selectable items. Each item must have an `ID` property |
| `onSelectReturn`            | `(items: T[]) => void`                     | Yes      | Callback fired with selected items when selection changes       |
| `collisionType`             | `"intersect" \| "absolutely-inside"`       | No       | Detection mode for item selection (default: "intersect")        |
| `className`                 | `string`                                   | No       | Additional CSS classes for the container                        |
| `style`                     | `CSSProperties`                            | No       | Additional inline styles for the container                      |
| `classes`                   | `{ root?: string; selectionBox?: string }` | No       | Custom classes for components                                   |
| `selectionBoxStyle`         | `CSSProperties`                            | No       | Custom styles for the selection box                             |
| `mouseDownExtendedCallBack` | `() => void`                               | No       | Additional callback for mouseDown events                        |

### SelectableItem

The component that wraps each selectable element.

```tsx
import { SelectableItem } from "react-selection";

<SelectableItem id="unique-id" className="aspect-square bg-gray-200">
  {/* Optional content */}
</SelectableItem>;
```

#### Props

| Prop        | Type        | Required | Description                                                     |
| ----------- | ----------- | -------- | --------------------------------------------------------------- |
| `id`        | `string`    | Yes      | Unique identifier for the item (must match the ID in your data) |
| `className` | `string`    | No       | Additional CSS classes                                          |
| `children`  | `ReactNode` | No       | Content to render inside the item                               |

## Selection Mechanics

### Collision Detection

The library supports two collision detection modes:

1. `"intersect"` (default): Items are selected when they intersect with the selection box
2. `"absolutely-inside"`: Items are selected only when they are completely inside the selection box

```tsx
<SelectionZone
  collisionType="absolutely-inside"
  // ... other props
>
```

### Selection Box Styling

The selection box can be customized using either classes or inline styles:

```tsx
<SelectionZone
  classes={{
    root: "selection-container",
    selectionBox: "selection-box"
  }}
  selectionBoxStyle={{
    border: "2px dashed #000",
    backgroundColor: "rgba(0, 0, 255, 0.1)"
  }}
>
```

Default selection box styles:

- Border: 1px dashed #3b82f6
- Background: #bfdbfe
- Opacity: 0.5
- Z-index: 50

## Advanced Usage

### Using the Selection Hook

For custom implementations, you can use the `useSelectionZone` hook directly:

```tsx
import { useSelectionZone } from "react-selection";

function CustomSelectionContainer<T extends { ID: string }>() {
  const {
    selectionContainerRef,
    isSelecting,
    selection,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useSelectionZone<T>({
    collisionType: "intersect",
  });

  // ... custom implementation
}
```

### Custom Styling Example

```tsx
import { SelectionZone, SelectableItem } from "react-selection";
import { cn } from "./utils";

function App() {
  return (
    <SelectionZone
      items={data}
      onSelectReturn={setSelected}
      classes={{
        root: "selection-container",
        selectionBox: "selection-box-custom",
      }}
      className="grid grid-cols-12 gap-2 p-4"
    >
      {data.map((item) => (
        <SelectableItem
          key={item.ID}
          id={item.ID}
          className={cn(
            "aspect-square rounded-lg transition-colors",
            "hover:bg-gray-100",
            selected.includes(item) && "bg-blue-500"
          )}
        />
      ))}
    </SelectionZone>
  );
}
```

## TypeScript Support

The library is written in TypeScript and provides full type safety. The only requirement is that your data type extends the `TSelectableItem` interface:

```tsx
interface TSelectableItem {
  ID: string;
}

interface MyData extends TSelectableItem {
  name: string;
  value: number;
  // ... other properties
}

<SelectionZone<MyData>
  items={myData}
  onSelectReturn={(selected) => {
    // Type-safe selected items
  }}
>
  {/* SelectableItem components */}
</SelectionZone>;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
