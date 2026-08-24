import { useState } from 'react';
import type { Node } from '../types/node';
import AddNodeForm from './AddNodeForm';

type UnsetNodeProps = {
  node: Node;
  parentId?: string;
  onAddNode: (parentId: string, node: Node) => void;
};

export function UnsetNode({ node, parentId, onAddNode }: UnsetNodeProps) {
  const [selectedNodeType, setSelectedNodeType] = useState<
    'file' | 'folder' | null
  >(null)

  return (
    <li>
      {selectedNodeType ? (
        <AddNodeForm
          type={selectedNodeType}
          onSubmit={(name) => {
            if (!parentId) return

            onAddNode(parentId, { ...node, type: selectedNodeType, name })
            setSelectedNodeType(null)
          }}
          onCancel={() => setSelectedNodeType(null)}
        />
      ) : (
        <>
          <button type="button" onClick={() => setSelectedNodeType('file')}>
            file
          </button>
          <button type="button" onClick={() => setSelectedNodeType('folder')}>
            folder
          </button>
        </>
      )}
    </li>
  )
}
