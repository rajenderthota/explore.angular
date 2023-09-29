// Define a type for your data items
interface MyDataItem {
  id: number;
  name: string;
  parentId?: number;
}

// Sample flat data
const flatData: MyDataItem[] = [
  { id: 1, name: 'Parent 1' },
  { id: 2, name: 'Child 1-1', parentId: 1 },
  { id: 3, name: 'Child 1-2', parentId: 1 },
  { id: 4, name: 'Parent 2' },
  { id: 5, name: 'Child 2-1', parentId: 4 },
];

// Generic function to convert flat data to tree data
function createTreeData<T extends { id: number; parentId?: number }>(
  flatData: T[]
): T[] {
  const map = new Map<number, T>();
  const roots: T[] = [];

  // Create a map of items by their IDs
  for (const item of flatData) {
    map.set(item.id, { ...item, children: [] });
  }

  // Populate the children arrays and identify root nodes
  for (const item of flatData) {
    if (item.parentId !== undefined) {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(item);
      }
    } else {
      // No parentId indicates a root node
      roots.push(item);
    }
  }

  return roots;
}

// Convert flat data to tree data
const treeData = createTreeData(flatData);

// Output the tree data (for demonstration purposes)
console.log(treeData);
