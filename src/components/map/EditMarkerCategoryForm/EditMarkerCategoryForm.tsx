import { MouseEvent } from 'react';
import { markerColor } from '../../../constants';
import useForm from '../../../hooks/useForm';
import { MarkerColor } from '../../../types';
import CustomButton from '../../common/CustomButton/CustomButton';
import InputField from '../../common/InputField/InputField';

import styles from './EditMarkerCategoryForm.module.css';
import useMutateEditMarkerCategory from '../../../hooks/queries/useMutateEditMarkerCategory';
import messages from '../../../constants/messages';

interface EdittMarkerCategoryFormProps {
  onClose: () => void;
}

const colors: MarkerColor[] = [
  markerColor.RED,
  markerColor.BLUE,
  markerColor.YELLOW,
  markerColor.GREEN,
  markerColor.PURPLE,
];

function EditMarkerCategoryForm({ onClose }: EdittMarkerCategoryFormProps) {
  const { values, getInputProps } = useForm({
    initialValue: {
      RED: '',
      BLUE: '',
      YELLOW: '',
      GREEN: '',
      PURPLE: '',
    },
  });

  const editMarkerCategory = useMutateEditMarkerCategory();

  const handleClickUpdateButton = (e: MouseEvent) => {
    e.preventDefault();

    editMarkerCategory.mutate(values, {
      onSuccess: () => {
        onClose();
      },
      onError: error => {
        console.log(error.response?.data.message);
        alert(messages.CAN_NOT_UPDATE_MARKER_CATEGORY);
      },
    });
  };

  return (
    <form className={styles.formContainer}>
      <ul className={styles.itemList}>
        {colors.map(color => (
          <li className={styles.item} key={color}>
            <span className={`${styles.color} ${styles[color]}`} />
            <InputField
              type="text"
              placeholder={color}
              value={getInputProps(color).value}
              onChange={getInputProps(color).onChange}
            />
          </li>
        ))}
      </ul>
      <CustomButton
        label="업데이트"
        onClick={e => handleClickUpdateButton(e)}
      />
    </form>
  );
}

export default EditMarkerCategoryForm;
