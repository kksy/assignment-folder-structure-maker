import { addNode, deleteNode, updateNode } from './nodeTree';
import type { Node } from './types/node';

describe('nodeTree', () => {
  const project: Node = {
    id: 'project',
    type: 'folder',
    name: 'Project',
    children: [
      { id: 'readme', type: 'file', name: 'README' },
    ],
  };

  it('adds a node to the root', () => {
    const node: Node = { id: 'draft', type: 'unset' };

    expect(addNode([project], undefined, node)).toEqual([project, node]);
  });

  it('adds a node to a nested parent', () => {
    const node: Node = { id: 'draft', type: 'unset' };
    const tree: Node[] = [{
      ...project,
      children: [{ id: 'documents', type: 'folder', name: 'Documents' }],
    }];

    expect(addNode(tree, 'documents', node)[0].children?.[0].children).toEqual([node]);
  });

  it('updates a node without removing its children', () => {
    const tree: Node[] = [{
      ...project,
      children: [{ id: 'draft', type: 'unset', children: [{ id: 'child', type: 'file', name: 'Child' }] }],
    }];

    expect(updateNode(tree, 'draft', { type: 'folder', name: 'Documents' })[0].children?.[0]).toEqual({
      id: 'draft',
      type: 'folder',
      name: 'Documents',
      children: [{ id: 'child', type: 'file', name: 'Child' }],
    });
  });

  it('deletes a node and its descendants', () => {
    expect(deleteNode([project], 'project')).toEqual([]);
  });
});