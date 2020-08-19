import * as React from 'react';
import { Formik } from 'formik';
import { TextArea, TextInput } from 'hds-react';
import { TFunction } from 'i18next';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { useTranslation } from 'react-i18next';

import { MessageFormValues } from './types';
import styles from './customerMessageForm.module.scss';
import Select from '../../common/select/Select';
import Button from '../../common/button/Button';
import Grid from '../../common/grid/Grid';
import Preview from './preview/Preview';

export type CustomerMessageFormProps = {
  handleCancel: () => void;
  handleCancelPreview: () => void;
  handlePreview: (templateId: string) => void;
  handleSendMessage?: (message: MessageFormValues) => void;
  previewHtml: string | undefined;
  recipientCount: number;
  templateOptions: { value: string; label: string }[];
};

const getMessageFormValidationSchema = (t: TFunction): ObjectSchema => {
  return Yup.object().shape({
    subject: Yup.string().required(t('forms.common.errors.required')),
    message: Yup.string().required(t('forms.common.errors.required')),
  });
};

export const CustomerMessageForm = ({
  handleCancel,
  handleCancelPreview,
  handlePreview,
  handleSendMessage,
  previewHtml,
  recipientCount,
  templateOptions,
}: CustomerMessageFormProps) => {
  const { t } = useTranslation();

  const initialValues: MessageFormValues = {
    templateId: templateOptions[0].value,
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
            {!previewHtml ? (
              <>
                <Grid colsCount={2}>
                  <Select
                    id="templateId"
                    value={values.templateId}
                    options={templateOptions}
                    onChange={handleChange}
                    label={t('customerList.message.template')}
                    required
                  />
                  <div className={styles.recipientCount}>
                    {t('customerList.message.recipient', { count: recipientCount })}
                  </div>
                </Grid>
                <TextInput
                  id="subject"
                  value={values.subject}
                  onChange={handleChange}
                  label={t('customerList.message.subject')}
                  invalid={!!errors.subject}
                  helperText={errors.subject}
                  required
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
              </>
            ) : (
              <>
                <p>
                  {values.subject}　{t('customerList.message.recipient', { count: recipientCount })}
                </p>
                <Preview html={previewHtml as string} />
                <p>
                  {`${t('customerList.message.template')}: ${
                    (templateOptions.find(({ value }) => {
                      return value === values.templateId;
                    }) as { label: string }).label
                  }`}
                </p>
              </>
            )}

            <div className={styles.formActionButtons}>
              <Button variant="secondary" onClick={handleCancel}>
                {t('common.cancel')}
              </Button>
              <div className={styles.formActionButtonsRight}>
                {!previewHtml ? (
                  <Button variant="secondary" onClick={() => handlePreview(values.templateId)}>
                    {t('customerList.message.preview')}
                  </Button>
                ) : (
                  <Button variant="secondary" onClick={handleCancelPreview}>
                    {t('common.edit')}
                  </Button>
                )}
                <Button type="submit">{t('customerList.message.send')}</Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
