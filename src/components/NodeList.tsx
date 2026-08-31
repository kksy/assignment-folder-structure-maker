import type { JSX } from 'react/jsx-runtime';
import type { Node } from '../types/node';
import { SetNode } from './SetNode';
import { UnsetNode } from './UnsetNode';
import styles from './NodeList.module.css';

type NodeListProps = {
  nodes: Node[];
  onAddNode: (parentId: string | undefined) => void;
  onUpdateNode: (nodeId: string, updates: Pick<Node, 'type' | 'name'>) => void;
  onDeleteNode: (nodeId: string) => void;
};

function NodeList({ nodes, onAddNode, onUpdateNode, onDeleteNode }: NodeListProps) {
  function renderNode(node: Node, parentId?: string): JSX.Element {
    if (node.type === 'unset') {
      return (
        <UnsetNode
          key={node.id}
          node={node}
          parentId={parentId}
          onUpdateNode={onUpdateNode}
          onDeleteNode={onDeleteNode}
        />
      )
    }

    return (
      <SetNode
        key={node.id}
        node={node}
        onAddNode={onAddNode}
        onDeleteNode={onDeleteNode}
      >
        {node.children && node.children.length > 0 && (
          <ul>
            {node.children.map((child) => renderNode(child, node.id))}
          </ul>
        )}
      </SetNode>
    )
  }

  return <ul className={styles.nodeList}>{nodes.map((node) => renderNode(node))}</ul>
}

export default NodeList;
