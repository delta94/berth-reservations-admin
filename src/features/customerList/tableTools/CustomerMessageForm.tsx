import * as React from 'react';
import { Formik } from 'formik';
import { Button, TextArea, TextInput } from 'hds-react';
import { TFunction } from 'i18next';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { useTranslation } from 'react-i18next';

import { MessageFormValues, MessageTemplate } from '../types';
import Text from '../../../common/text/Text';
import styles from './customerMessageForm.module.scss';
import Select from '../../../common/select/Select';

type CustomerMessageFormProps = {
  closeModal: () => void;
  handleSendMessage?: (message: MessageFormValues) => void;
};

const getMessageFormValidationSchema = (t: TFunction): ObjectSchema => {
  return Yup.object().shape({
    subject: Yup.string().required(t('forms.common.errors.required')),
    message: Yup.string().required(t('forms.common.errors.required')),
  });
};

const mockTemplates: MessageTemplate[] = [
  {
    id: '1',
    name: 'Tiedote',
  },
  {
    id: '2',
    name: 'Viesti',
  },
];

const initialValues: MessageFormValues = {
  templateId: '1',
  subject: '',
  message: '',
};

export const CustomerMessageForm: React.FC<CustomerMessageFormProps> = ({ closeModal, handleSendMessage }) => {
  const { t } = useTranslation();

  const templateOptions = mockTemplates.map(({ id, name }) => {
    return {
      value: id,
      label: name,
    };
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSendMessage?.(values)}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={getMessageFormValidationSchema(t)}
    >
      {({ values, errors, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Text as="h4">{t('customerList.message.header')}</Text>
            <div className={styles.template}>
              <Select
                id="templateId"
                value={values.templateId}
                options={templateOptions}
                onChange={handleChange}
                labelText={t('customerList.message.template')}
                required
              />
            </div>
            <TextInput
              id="subject"
              value={values.subject}
              onChange={handleChange}
              labelText={t('customerList.message.subject')}
              invalid={!!errors.subject}
              helperText={errors.subject}
            />
            <TextArea
              id="message"
              className={styles.message}
              value={values.message}
              onChange={handleChange}
              labelText={t('customerList.message.message')}
              invalid={!!errors.message}
              helperText={errors.message || t('customerList.message.messageHelperText')}
            />
            <div className={styles.formActionButtons}>
              <Button variant="secondary" theme="black" onClick={closeModal}>
                {t('common.cancel')}
              </Button>
              <div className={styles.formActionButtonsRight}>
                <Button variant="secondary" theme="black" onClick={closeModal}>
                  {t('customerList.message.preview')}
                </Button>
                <Button theme="coat" type="submit">
                  {t('customerList.message.send')}
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
