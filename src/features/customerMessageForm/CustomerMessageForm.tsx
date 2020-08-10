import * as React from 'react';
import { Formik } from 'formik';
import { TextArea, TextInput } from 'hds-react';
import { TFunction } from 'i18next';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { useTranslation } from 'react-i18next';

import { MessageFormValues, NotificationTemplate } from './types';
import Text from '../../common/text/Text';
import styles from './customerMessageForm.module.scss';
import Select from '../../common/select/Select';
import Button from '../../common/button/Button';

type CustomerMessageFormProps = {
  templates: NotificationTemplate[];
  handleCancel: () => void;
  handlePreview: (templateId: string) => void;
  handleSendMessage?: (message: MessageFormValues) => void;
};

const getMessageFormValidationSchema = (t: TFunction): ObjectSchema => {
  return Yup.object().shape({
    subject: Yup.string().required(t('forms.common.errors.required')),
    message: Yup.string().required(t('forms.common.errors.required')),
  });
};

export const CustomerMessageForm = ({
  handleCancel,
  handlePreview,
  handleSendMessage,
  templates,
}: CustomerMessageFormProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const templateOptions = templates.map(({ id, translations }) => {
    return {
      value: id,
      label: translations[language.toUpperCase()]?.subject || id,
    };
  });

  const initialValues: MessageFormValues = {
    templateId: templates[0].id,
    subject: '',
    message: '',
  };

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
            <Select
              id="templateId"
              value={values.templateId}
              options={templateOptions}
              onChange={handleChange}
              label={t('customerList.message.template')}
              required
            />
            <TextInput
              id="subject"
              value={values.subject}
              onChange={handleChange}
              label={t('customerList.message.subject')}
              invalid={!!errors.subject}
              helperText={errors.subject}
            />
            <TextArea
              id="message"
              className={styles.message}
              value={values.message}
              onChange={handleChange}
              label={t('customerList.message.message')}
              invalid={!!errors.message}
              helperText={errors.message || t('customerList.message.messageHelperText')}
            />
            <div className={styles.formActionButtons}>
              <Button variant="secondary" onClick={handleCancel}>
                {t('common.cancel')}
              </Button>
              <div className={styles.formActionButtonsRight}>
                <Button variant="secondary" onClick={() => handlePreview(values.templateId)}>
                  {t('customerList.message.preview')}
                </Button>
                <Button type="submit">{t('customerList.message.send')}</Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
