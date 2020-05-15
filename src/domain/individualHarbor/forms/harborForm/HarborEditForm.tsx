import React, { FunctionComponent } from 'react';
import { Button, TextInput } from 'hds-react/lib';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TFunction } from 'i18next';
import { useMutation, useQuery } from '@apollo/react-hooks';

import styles from './harborEditForm.module.scss';
import Section from '../../../../common/section/Section';
import FileUpload, { FileContainer } from '../../../../common/fileUpload/FileUpload';
import Text from '../../../../common/text/Text';
import { HARBOR_FORM_QUERY } from './queries';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { FormProps, Harbor } from '../types';
import { getHarbor, mapValuesToMutation } from './utils/utils';
import { UPDATE_HARBOR_MUTATION } from './mutations';
import { UPDATE_HARBOR, UPDATE_HARBORVariables as UPDATE_HARBOR_VARS } from './__generated__/UPDATE_HARBOR';
import { HARBOR_FORM } from './__generated__/HARBOR_FORM';

export interface Props extends FormProps<Harbor> {
  harborId: string;
}

const imageFileMaxSize = 500 * 1000;

const getValidationSchema = (t: TFunction) =>
  Yup.object<Harbor>().shape({
    name: Yup.string().required(t('forms.common.errors.required')),
    streetAddress: Yup.string().required(t('forms.common.errors.required')),
    zipCode: Yup.string().required(t('forms.common.errors.required')),
    municipality: Yup.string().required(t('forms.common.errors.required')),
    wwwUrl: Yup.string().required(t('forms.common.errors.required')),
    imageFile: Yup.object<FileContainer>()
      .test('fileRequired', t('forms.common.errors.required'), (value) => value.markedForDeletion === false)
      .test(
        'maxFileSize',
        t('forms.common.errors.maxFileSize'),
        (value) => !value.data || value.data.size <= imageFileMaxSize
      )
      .required(t('forms.common.errors.required')),
    maps: Yup.array<FileContainer>(),
  });

const HarborEditForm: FunctionComponent<Props> = ({ harborId, onCancel, onSubmit, refetchQueries }) => {
  const { loading, error, data } = useQuery<HARBOR_FORM>(HARBOR_FORM_QUERY, {
    variables: { id: harborId },
  });
  const [updateHarbor, { loading: isSubmitting, error: updateError }] = useMutation<UPDATE_HARBOR, UPDATE_HARBOR_VARS>(
    UPDATE_HARBOR_MUTATION,
    {
      refetchQueries: [...(refetchQueries ?? []), { query: HARBOR_FORM_QUERY, variables: { id: harborId } }],
    }
  );

  const { t } = useTranslation();
  const validationSchema = getValidationSchema(t);

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (error || updateError) return <div>{t('forms.common.error')}</div>;

  const initial: Harbor = getHarbor(data) ?? {
    name: '',
    streetAddress: '',
    zipCode: '',
    municipality: 'Helsinki',
    wwwUrl: '',
    imageFile: undefined,
    maps: [],
  };

  const handleSubmit = (values: Harbor) =>
    updateHarbor({
      variables: {
        input: mapValuesToMutation(harborId, values),
      },
    }).then(() => onSubmit?.(values));

  return (
    <Formik initialValues={initial} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ errors, setFieldValue }) => (
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
              name="imageFile"
              label={t('forms.harbor.imageFile')}
              maxSize={imageFileMaxSize}
              accept="image/png, image/jpeg"
              required
              onChange={(value: File) => {
                setFieldValue('imageFile', value);
              }}
              invalid={!!errors.imageFile}
              helperText={errors.imageFile}
            />
          </Section>

          <Section>
            <Field
              as={FileUpload}
              name="maps"
              label={t('forms.harbor.maps')}
              multiple
              onChange={(value: File[]) => {
                setFieldValue('maps', value);
              }}
              invalid={!!errors.maps}
              helperText={errors.maps}
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
