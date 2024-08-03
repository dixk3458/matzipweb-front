import { ChangeEvent } from 'react';
import { ImageUri } from '../../../types';
import PlusIcon from '../../icon/PlusIcon';
import XIcon from '../../icon/XIcon';
import styles from './ImageSelector.module.css';

interface ImageSelectorProps {
  selectedImageUris: ImageUri[];
  handleRemoveImage: (uri: string) => void;
  handleChangeImageFile: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ImageSelector({
  selectedImageUris,
  handleRemoveImage,
  handleChangeImageFile,
}: ImageSelectorProps) {
  return (
    <section className={styles.container}>
      <p className={styles.titleText}>사진 추가</p>
      <div>
        {selectedImageUris.length > 0 && (
          <ul className={styles.imagePreviewContainer}>
            {selectedImageUris.map((image, index) => (
              <li key={image.id ?? index} className={styles.imagePreview}>
                <img
                  src={image.uri}
                  alt={`preview-${index}`}
                  className={styles.image}
                />
                <button
                  className={styles.removeButton}
                  type="button"
                  onClick={() => handleRemoveImage(image.uri)}
                >
                  <XIcon />
                </button>
              </li>
            ))}
            {selectedImageUris.length < 5 && (
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
        {selectedImageUris.length === 0 && (
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
