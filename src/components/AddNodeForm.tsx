import type { SubmitEvent } from 'react';
import FolderOpenRegularIcon from '../icons/folder-open-regular.svg';

type AddNodeFormProps = {
  onSubmit: (name: string) => void;
  onCancel: () => void;
};

function AddNodeForm({ onSubmit, onCancel }: AddNodeFormProps) {
  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputValue = formData.get('name')?.toString().trim();

    if (inputValue) {
      onSubmit(inputValue);
    }
  }

  return (
    <form className="node-form" aria-label="Add folder" onSubmit={handleSubmit}>
      <label className="form__label">
        <img className="form__icon" src={FolderOpenRegularIcon} alt="" />
        <span className="visually-hidden">Folder name</span>
        <input aria-label="Folder name" name="name" />
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
