type Node = {
  type: 'folder' | 'file' | 'unset';
  name?: string;
  children?: Node[];
  id: string;
};

type NodeListProps = {
  nodes: Node[];
};

function NodeList({ nodes }: NodeListProps) {
  return (
    <ul>
      {nodes.map((node) => {
        return <li key={node.id}>{node.name}</li>;
      })}
    </ul>
  );
}

export default NodeList;
