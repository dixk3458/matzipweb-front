import { ChangeEvent, useEffect, useState } from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate?: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeValue = (
    name: keyof T,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues(prev => ({ ...prev, [name]: e.target.value }));
  };

  const handleChangeTouched = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChangeValue(name, e);

    const onBlur = () => handleChangeTouched(name);

    return { value, onChange, onBlur };
  };

  useEffect(() => {
    if (validate) {
      const newErrors = validate(values);
      setErrors(newErrors);
    }
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
