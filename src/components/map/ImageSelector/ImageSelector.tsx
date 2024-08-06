import { ChangeEvent } from 'react';
import PlusIcon from '../../icon/PlusIcon';
import XIcon from '../../icon/XIcon';
import styles from './ImageSelector.module.css';

interface ImageSelectorProps {
  selectedImageFiles: File[];
  handleRemoveImage: (uri: string) => void;
  handleChangeImageFile: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ImageSelector({
  selectedImageFiles,
  handleRemoveImage,
  handleChangeImageFile,
}: ImageSelectorProps) {
  return (
    <section className={styles.container}>
      <p className={styles.titleText}>사진 추가</p>
      <div>
        {selectedImageFiles.length > 0 && (
          <ul className={styles.imagePreviewContainer}>
            {selectedImageFiles.map((file, index) => (
              <li key={index} className={styles.imagePreview}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className={styles.image}
                />
                <button
                  className={styles.removeButton}
                  type="button"
                  onClick={() => handleRemoveImage(URL.createObjectURL(file))}
                >
                  <XIcon />
                </button>
              </li>
            ))}
            {selectedImageFiles.length < 5 && (
              <li className={styles.imagePreview}>
                <label htmlFor="image-upload" className={styles.plusButton}>
                  <PlusIcon />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={event => handleChangeImageFile(event)}
                  style={{ display: 'none' }}
                />
              </li>
            )}
          </ul>
        )}
        {selectedImageFiles.length === 0 && (
          <label htmlFor="image-upload" className={styles.plusButton}>
            <PlusIcon />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleChangeImageFile}
              style={{ display: 'none' }}
            />
          </label>
        )}
      </div>
    </section>
  );
}

export default ImageSelector;
