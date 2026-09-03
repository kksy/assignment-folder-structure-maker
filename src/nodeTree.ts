import type { Node } from './types/node';

export function addNode(nodes: Node[], parentId: string | undefined, nodeToAdd: Node): Node[] {
  if (!parentId) {
    return [...nodes, nodeToAdd];
  }

  return nodes.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children ?? []), nodeToAdd],
      };
    }

    return node.children
      ? { ...node, children: addNode(node.children, parentId, nodeToAdd) }
      : node;
  });
}

export function updateNode(nodes: Node[], nodeId: string, updates: Pick<Node, 'type' | 'name'>): Node[] {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return { ...node, ...updates };
    }

    return node.children
      ? { ...node, children: updateNode(node.children, nodeId, updates) }
      : node;
  });
}

export function deleteNode(nodes: Node[], nodeId: string): Node[] {
  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => node.children
      ? { ...node, children: deleteNode(node.children, nodeId) }
      : node);
}