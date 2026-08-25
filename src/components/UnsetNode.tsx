import { useState } from 'react';
import type { Node } from '../types/node';
import AddNodeForm from './AddNodeForm';

type UnsetNodeProps = {
  node: Node;
  parentId?: string;
  onAddNode: (parentId: string | undefined, node: Node) => void;
  onDeleteNode: (nodeId: string) => void;
};

export function UnsetNode({ node, parentId, onAddNode, onDeleteNode }: UnsetNodeProps) {
  const [selectedNodeType, setSelectedNodeType] = useState<
    'file' | 'folder' | null
  >(parentId ? null : 'folder')

  return (
    <li>
      {selectedNodeType ? (
        <AddNodeForm
          type={selectedNodeType}
          onSubmit={(name) => {
            onAddNode(parentId, { ...node, type: selectedNodeType, name })
            setSelectedNodeType(null)
          }}
          onCancel={() => {
            if (!parentId) {
              onDeleteNode(node.id)
              return
            }

            setSelectedNodeType(null)
          }}
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
