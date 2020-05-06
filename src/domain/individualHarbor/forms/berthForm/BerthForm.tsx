import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Button, TextInput } from 'hds-react';

import { Berth, FormProps } from './types';
import { BerthMooringType } from '../../../../@types/__generated__/globalTypes';
import Grid from '../../../../common/grid/Grid';
import Select from '../../../../common/select/Select';
import Checkbox from '../../../../common/checkbox/Checkbox';
import styles from './berthForm.module.scss';
import { Pier } from '../../utils/utils';

interface BerthFormProps extends FormProps<Berth> {
  onSubmitText?: string;
  pierOptions?: Pier[];
}

const getBerthValidationSchema = (t: TFunction) =>
  Yup.object().shape({
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
    depth: Yup.mixed<number | null>().typeError(
      t('forms.common.errors.numberType')
    ),
    mooringType: Yup.string().required(t('forms.common.errors.required')),
  });

const BerthForm: React.FC<BerthFormProps> = ({
  initialValues,
  isSubmitting,
  onSubmit,
  onCancel,
  onDelete,
  onSubmitText,
  pierOptions,
}) => {
  const { t } = useTranslation();
  const validationSchema = getBerthValidationSchema(t);

  return (
    <Formik
      initialValues={initialValues ?? {}}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit?.(values)}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Grid colsCount={3} className={styles.grid}>
            {!pierOptions && (
              <TextInput
                id="pier"
                readOnly
                value={values.pier}
                labelText={t('forms.berth.pier')}
                invalid={!!errors.pier}
                invalidText={errors.pier}
              />
            )}
            {pierOptions && (
              <Select
                id="pierId"
                required
                value={values.pierId}
                options={pierOptions.map(pier => {
                  return {
                    label: pier.identifier,
                    value: pier.id,
                  };
                })}
                onChange={handleChange}
                labelText={t('forms.berth.pier')}
              />
            )}
            <TextInput
              id="number"
              type="number"
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
                label: t([`common.mooringTypes.${mooringType}`, mooringType]),
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
            {onDelete && (
              <Button
                disabled={isSubmitting}
                color={'secondary'}
                onClick={() => onDelete(values)}
              >
                {t('forms.common.delete')}
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {onSubmitText}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default BerthForm;
