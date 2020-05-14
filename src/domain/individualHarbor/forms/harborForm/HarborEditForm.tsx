import React, { FunctionComponent } from 'react';
import { Button, TextInput } from 'hds-react/lib';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TFunction } from 'i18next';
import { useMutation, useQuery } from '@apollo/react-hooks';

import styles from './harborEditForm.module.scss';
import Section from '../../../../common/section/Section';
import FileUpload from '../../../../common/fileUpload/FileUpload';
import Text from '../../../../common/text/Text';
import { INDIVIDUAL_HARBOR_QUERY } from '../../queries';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { INDIVIDUAL_HARBOR } from '../../__generated__/INDIVIDUAL_HARBOR';
import { Harbor } from './types';
import { getHarbor } from './utils/utils';

export interface HarborEditFormProps {
  onCancel: () => void;
  onSubmit: () => void;
  harborId: string;
}

const getValidationSchema = (t: TFunction) =>
  Yup.object<Harbor>().shape({
    name: Yup.string().required(t('forms.common.errors.required')),
    streetAddress: Yup.string().required(t('forms.common.errors.required')),
    zipCode: Yup.string().required(t('forms.common.errors.required')),
    municipality: Yup.string().required(t('forms.common.errors.required')),
    wwwUrl: Yup.string().required(t('forms.common.errors.required')),
    imageFile: Yup.object().required(t('forms.common.errors.required')),
  });

const HarborEditForm: FunctionComponent<HarborEditFormProps> = ({ onCancel, onSubmit, harborId }) => {
  const { loading, error, data } = useQuery<INDIVIDUAL_HARBOR>(INDIVIDUAL_HARBOR_QUERY, {
    variables: { id: harborId },
  });

  // TODO: Create update mutation

  const { t } = useTranslation();
  const validationSchema = getValidationSchema(t);

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (error) return <div>{t('forms.common.error')}</div>;

  const initial: Harbor = getHarbor(data) ?? {
    name: '',
    streetAddress: '',
    zipCode: '',
    municipality: 'Helsinki',
    wwwUrl: '',
    imageFile: undefined,
  };

  return (
    <Formik initialValues={initial} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isSubmitting, errors, setFieldValue }) => (
        <Form>
          <Text as="h4" color="brand">
            {t('forms.harbor.title').toUpperCase()}
          </Text>

          <Section>
            <Field
              required={true}
              as={TextInput}
              id="name"
              name="name"
              labelText={t('forms.harbor.name')}
              invalid={!!errors.name}
              invalidText={errors.name}
            />
          </Section>

          <Section>
            <Field
              required={true}
              as={TextInput}
              id="streetAddress"
              name="streetAddress"
              labelText={t('forms.harbor.streetAddress')}
              invalid={!!errors.streetAddress}
              invalidText={errors.streetAddress}
            />
            <Field
              required={true}
              as={TextInput}
              id="zipCode"
              name="zipCode"
              labelText={t('forms.harbor.zipCode')}
              invalid={!!errors.zipCode}
              invalidText={errors.zipCode}
            />
            <Field
              required={true}
              as={TextInput}
              id="municipality"
              name="municipality"
              labelText={t('forms.harbor.municipality')}
              invalid={!!errors.municipality}
              invalidText={errors.municipality}
            />
          </Section>

          <Section>
            <Field
              required={true}
              as={TextInput}
              id="wwwUrl"
              name="wwwUrl"
              labelText={t('forms.harbor.wwwUrl')}
              invalid={!!errors.wwwUrl}
              invalidText={errors.wwwUrl}
            />
          </Section>

          <Section>
            <Field
              as={FileUpload}
              label={t('forms.harbor.imageFile')}
              maxSize={500 * 1000}
              name="imageFile"
              onChange={(value: File) => {
                setFieldValue('imageFile', value);
              }}
              required
            />
          </Section>

          <Section>
            <Field
              as={FileUpload}
              label={t('forms.harbor.harborMaps')}
              name="harborMaps"
              multiple
              onChange={(value: File[]) => {
                setFieldValue('harborMaps', value);
              }}
              required
            />
          </Section>

          <div className={styles.formActionButtons}>
            <Button color="supplementary" onClick={onCancel}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {t('common.save')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default HarborEditForm;
