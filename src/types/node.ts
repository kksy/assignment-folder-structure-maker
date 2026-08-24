export type Node = {
  type: 'folder' | 'file' | 'unset';
  name?: string;
  children?: Node[];
  id: string;
}