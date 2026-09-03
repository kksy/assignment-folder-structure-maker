import type { ReactNode } from 'react';
import FileRegularIcon from '../icons/file-regular.svg';
import FolderOpenRegularIcon from '../icons/folder-open-regular.svg';
import type { Node } from '../types/node';
import styles from './NodeList.module.css';

type SetNodeProps = {
  node: Node;
  children?: ReactNode;
  onAddNode: (parentId: string) => void;
  onDeleteNode: (nodeId: string) => void;
};

export function SetNode({ node, children, onAddNode, onDeleteNode }: SetNodeProps) {
  const nodeIcon = node.type === 'file' ? FileRegularIcon : FolderOpenRegularIcon;

  return (
    <li>
      <div className={styles.nodeItemRow}>
        <img className={styles.nodeIcon} src={nodeIcon} alt="" />
        <span>{node.name}</span>

        {node.type === 'folder' && (
          <button
            className={styles.nodeItemButton}
            aria-label={`Add child to ${node.name}`}
            onClick={() => onAddNode(node.id)}
          >
            +
          </button>
        )}
        <button
          className={styles.nodeItemButton}
          aria-label={`Delete ${node.name}`}
          onClick={() => onDeleteNode(node.id)}
        >
          ×
        </button>
      </div>

      {children}
    </li>
  )
}
