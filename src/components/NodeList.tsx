import type { JSX } from 'react/jsx-runtime';
import type { Node } from '../types/node';
import styles from './NodeList.module.css';

type NodeListProps = {
  nodes: Node[];
  onAddNode: (parentId: string, node: Node) => void;
};

function NodeList({ nodes, onAddNode }: NodeListProps) {
  function renderNode(node: Node, depth: number, parentId?: string): JSX.Element {
    if (node.type === 'unset' && depth > 0) {
      return (
        <li key={node.id}>
          <button
            type="button"
            onClick={() => {
              if (!parentId) return

              onAddNode(parentId, {
                ...node,
                type: 'file',
                name: 'new file',
              })
            }}
          >
            file
          </button>
          <button
            type="button"
            onClick={() => {
              if (!parentId) return

              onAddNode(parentId, {
                ...node,
                type: 'folder',
                name: 'new folder',
              })
            }}
          >
            folder
          </button>
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
            {node.children.map((child) => renderNode(child, depth + 1, node.id))}
          </ul>
        )}
      </li>
    )
  }

  return <ul className={styles.nodeList}>{nodes.map((node) => renderNode(node, 0))}</ul>
}

export default NodeList;
