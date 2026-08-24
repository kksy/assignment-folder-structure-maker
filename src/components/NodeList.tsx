import type { Node } from '../types/node';
import styles from './NodeList.module.css';

type NodeListProps = {
  nodes: Node[];
};

function NodeList({ nodes }: NodeListProps) {
  return (
    <ul className={styles.nodeList}>
      {nodes.map((node) => {
        return (
          <li key={node.id} className={styles.nodeItem}>
            <span className={styles.nodeItemLabel}>{node.name}</span>
            <button
              type="button"
              className={styles.nodeItemAddButton}
              aria-label={`Add child to ${node.name}`}
            >
              +
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default NodeList;
