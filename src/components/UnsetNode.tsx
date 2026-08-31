import { useState } from 'react';
import type { Node } from '../types/node';
import AddNodeForm from './AddNodeForm';

type UnsetNodeProps = {
  node: Node;
  parentId?: string;
  onUpdateNode: (nodeId: string, updates: Pick<Node, 'type' | 'name'>) => void;
  onDeleteNode: (nodeId: string) => void;
};

export function UnsetNode({ node, parentId, onUpdateNode, onDeleteNode }: UnsetNodeProps) {
  const [selectedNodeType, setSelectedNodeType] = useState<
    'file' | 'folder' | null
  >(parentId ? null : 'folder')

  return (
    <li>
      {selectedNodeType ? (
        <AddNodeForm
          type={selectedNodeType}
          onSubmit={(name) => {
            onUpdateNode(node.id, { type: selectedNodeType, name })
            setSelectedNodeType(null)
          }}
          onCancel={() => onDeleteNode(node.id)}
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
