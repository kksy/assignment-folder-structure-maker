import { useState } from 'react';
import type { JSX } from 'react/jsx-runtime';
import type { Node } from '../types/node';
import AddNodeForm from './AddNodeForm';
import styles from './NodeList.module.css';

type NodeListProps = {
  nodes: Node[];
  onAddNode: (parentId: string, node: Node) => void;
};

function NodeList({ nodes, onAddNode }: NodeListProps) {
  const [selectedNodeType, setSelectedNodeType] = useState<{
    nodeId: string;
    type: 'file' | 'folder';
  } | null>(null)

  function renderNode(node: Node, parentId?: string): JSX.Element {
    if (node.type === 'unset') {
      const isNamingNode = selectedNodeType?.nodeId === node.id

      return (
        <li key={node.id}>
          {isNamingNode && (
            <AddNodeForm
              type={selectedNodeType.type}
              onSubmit={(name) => {
                if (!parentId || !selectedNodeType) return

                onAddNode(parentId, { ...node, type: selectedNodeType.type, name })
                setSelectedNodeType(null)
              }}
              onCancel={() => setSelectedNodeType(null)}
            />
          )}
          {!isNamingNode && (
            <>
              <button type="button" onClick={() => setSelectedNodeType({ nodeId: node.id, type: 'file' })}>
                file
              </button>
              <button type="button" onClick={() => setSelectedNodeType({ nodeId: node.id, type: 'folder' })}>
                folder
              </button>
            </>
          )}
        </li>
      )
    }

    return (
      <li key={node.id}>
        <div className={styles.nodeItemRow}>
          <span>{node.name}</span>

          {node.type === 'folder' && (
            <button
              className={styles.nodeItemAddButton}
              aria-label={`Add child to ${node.name}`}
              onClick={() => {
                const unsetChild: Node = {
                  id: crypto.randomUUID(),
                  type: 'unset',
                }

                onAddNode(node.id, unsetChild)
              }}
            >
              +
            </button>
          )}
        </div>

        {node.children && node.children.length > 0 && (
          <ul>
            {node.children.map((child) => renderNode(child, node.id))}
          </ul>
        )}
      </li>
    )
  }

  return <ul className={styles.nodeList}>{nodes.map((node) => renderNode(node))}</ul>
}

export default NodeList;
