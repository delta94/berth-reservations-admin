import React from 'react';
import { Formik } from 'formik';
import { TextInput, Button } from 'hds-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { INDIVIDUAL_BERTH_QUERY } from './queries';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { INDIVIDUAL_BERTH } from './__generated__/INDIVIDUAL_BERTH';
import {
  UPDATE_BERTH,
  UPDATE_BERTHVariables as UPDATE_BERTH_VARS,
} from './__generated__/UPDATE_BERTH';
import { DELETE_BERTH_MUTATION, UPDATE_BERTH_MUTATION } from './mutations';
import Grid from '../../../../common/grid/Grid';
import styles from './berthForm.module.scss';
import Select from '../../../../common/select/Select';
import { BerthMooringType } from '../../../../@types/__generated__/globalTypes';
import Checkbox from '../../../../common/checkbox/Checkbox';
import { Berth, BerthFormProps } from './types';
import {
  DELETE_BERTH,
  DELETE_BERTHVariables as DELETE_BERTH_VARS,
} from './__generated__/DELETE_BERTH';
import { getBerth } from './utils/utils';

const BerthForm: React.FC<BerthFormProps> = ({
  berthId,
  onCancel,
  onUpdate,
  onDelete,
  refetchQueries,
}) => {
  const { loading, error, data } = useQuery<INDIVIDUAL_BERTH>(
    INDIVIDUAL_BERTH_QUERY,
    { variables: { id: berthId } }
  );

  const [updateBerth, { loading: isSubmitting }] = useMutation<
    UPDATE_BERTH,
    UPDATE_BERTH_VARS
  >(UPDATE_BERTH_MUTATION, {
    refetchQueries: [
      ...(refetchQueries ? refetchQueries : []),
      { query: INDIVIDUAL_BERTH_QUERY, variables: { id: berthId } },
    ],
  });

  const [deleteBerth] = useMutation<DELETE_BERTH, DELETE_BERTH_VARS>(
    DELETE_BERTH_MUTATION,
    {
      refetchQueries: refetchQueries ? refetchQueries : [],
    }
  );

  const { t } = useTranslation();

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (error) return <div>{t('forms.common.error')}</div>;

  const berthSchema = Yup.object().shape({
    pier: Yup.string().required(t('forms.common.errors.required')),
    number: Yup.number()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    width: Yup.number()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    length: Yup.number()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    depth: Yup.number().typeError(t('forms.common.errors.numberType')),
    mooringType: Yup.string().required(t('forms.common.errors.required')),
  });

  const initialValues: Berth = getBerth(data);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={berthSchema}
      onSubmit={values => {
        const {
          width,
          length,
          mooringType,
          comment,
          isActive,
          ...rest
        } = values;
        updateBerth({
          variables: {
            input: {
              id: berthId,
              width,
              length,
              mooringType,
              comment,
              isActive,
            },
          },
        }).then(() => onUpdate && onUpdate(values));
      }}
    >
      {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Grid colsCount={3} className={styles.grid}>
            <TextInput
              id="pier"
              readOnly
              value={values.pier}
              labelText={t('forms.berth.pier')}
              invalid={!!errors.pier}
              invalidText={errors.pier}
            />
            <TextInput
              id="number"
              type="number"
              readOnly
              value={String(values.number)}
              labelText={t('forms.berth.number')}
              invalid={!!errors.number}
              invalidText={errors.number}
            />
            <div />

            <TextInput
              id="width"
              type="number"
              onChange={handleChange}
              value={String(values.width)}
              labelText={t('forms.berth.width')}
              invalid={!!errors.width}
              invalidText={errors.width}
            />
            <TextInput
              id="length"
              type="number"
              onChange={handleChange}
              value={String(values.length)}
              labelText={t('forms.berth.length')}
              invalid={!!errors.length}
              invalidText={errors.length}
            />
            <TextInput
              id="depth"
              type="number"
              onChange={handleChange}
              value={String(values.depth)}
              labelText={t('forms.berth.depth')}
              invalid={!!errors.depth}
              invalidText={errors.depth}
              readOnly
            />
          </Grid>

          <hr />

          <Select
            id="mooringType"
            value={values.mooringType}
            labelText={t('forms.berth.mooringType')}
            options={Object.keys(BerthMooringType).map(mooringType => {
              return {
                label: t(`common.mooringTypes.${mooringType}`),
                value: mooringType,
              };
            })}
            onChange={handleChange}
            required
          />

          <TextInput
            id="comment"
            onChange={handleChange}
            value={values.comment}
            labelText={t('forms.berth.comment')}
          />
          <Checkbox
            id="isActive"
            onChange={handleChange}
            checked={values.isActive}
            label={t('forms.berth.isActive')}
          />
          <div className={styles.formActionButtons}>
            <Button
              disabled={isSubmitting}
              color={'supplementary'}
              onClick={onCancel}
            >
              {t('forms.common.cancel')}
            </Button>
            <Button
              disabled={isSubmitting}
              color={'secondary'}
              onClick={() => {
                deleteBerth({ variables: { input: { id: berthId } } }).then(
                  () => onDelete && onDelete(values)
                );
              }}
            >
              {t('forms.common.delete')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {t('forms.common.update')}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default BerthForm;
