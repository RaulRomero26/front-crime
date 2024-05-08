import { useState } from "react";

export const useForm = <T extends Record<string, any>>(initialForm: T) => {
    const [formState, setFormState] = useState<T>(initialForm);
  
    const onInputChange = ({ target }:any) => {
      const { name, value } = target;
      setFormState({
        ...formState,
        [name]: value
      } as T);
    }
  
    const onResetForm = () => {
      setFormState(initialForm);
    }
  
    return {
      formState,
      onInputChange,
      onResetForm,
    }
  }