import type { SubmitEvent } from 'react';
import FileRegularIcon from '../icons/file-regular.svg';
import FolderOpenRegularIcon from '../icons/folder-open-regular.svg';

type AddNodeFormProps = {
  onSubmit: (name: string) => void;
  onCancel: () => void;
  type: 'file' | 'folder';
};

function AddNodeForm({ onSubmit, onCancel, type }: AddNodeFormProps) {
  const nodeLabel = type === 'file' ? 'File' : 'Folder';
  const nodeIcon = type === 'file' ? FileRegularIcon : FolderOpenRegularIcon;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputValue = formData.get('name')?.toString().trim();

    if (inputValue) {
      onSubmit(inputValue);
    }
  }

  return (
    <form className="node-form" aria-label={`Add ${nodeLabel}`} onSubmit={handleSubmit}>
      <label className="form__label">
        <img className="form__icon" src={nodeIcon} alt="" />
        <span className="visually-hidden">{nodeLabel} name</span>
        <input aria-label={`${nodeLabel} name`} name="name" />
      </label>
      <button className="button button--primary button--sm" type="submit" aria-label="confirm">
        ✓
      </button>
      <button
        className="button button--secondary button--sm"
        aria-label="cancel"
        type="button"
        onClick={onCancel}
      >
        ×
      </button>
    </form>
  );
}

export default AddNodeForm;
