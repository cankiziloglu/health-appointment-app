import { Locale } from '@/i18n-config';
import { DictionaryType } from '@/lib/types';
import React from 'react';

const CreateHealthcareProviderForm = ({
  dictionary,
  lang,
}: {
  dictionary: DictionaryType['CreateProfileForm'];
  lang: Locale['key'];
}) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      cpassword: '',
      role: undefined,
    },
  });

  return (

    // Form Fields:
    // Name: input
    // email input
    // phone input

    
    <div>CreateProfileForm</div>;
  )
};

export default CreateHealthcareProviderForm;
