import type { ReactNode } from 'react';
import type { Node } from '../types/node';
import styles from './NodeList.module.css';

type SetNodeProps = {
  node: Node;
  children?: ReactNode;
  onAddNode: (parentId: string, node: Node) => void;
  onDeleteNode: (nodeId: string) => void;
};

export function SetNode({ node, children, onAddNode, onDeleteNode }: SetNodeProps) {
  return (
    <li>
      <div className={styles.nodeItemRow}>
        <span>{node.name}</span>

        {node.type === 'folder' && (
            <>
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
              <button
                className={styles.nodeItemAddButton}
                aria-label={`Delete ${node.name}`}
                onClick={() => onDeleteNode(node.id)}
              >
                ×
              </button>
            </>
        )}
      </div>

      {children}
    </li>
  )
}
