import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Button, TextInput } from 'hds-react';
import { ObjectSchema } from 'yup';

import { Berth, FormProps } from './types';
import { BerthMooringType } from '../../../../@types/__generated__/globalTypes';
import Grid from '../../../../common/grid/Grid';
import Select from '../../../../common/select/Select';
import Checkbox from '../../../../common/checkbox/Checkbox';
import styles from './berthForm.module.scss';
import { Pier } from '../../utils/utils';
import Text from '../../../../common/text/Text';

interface BerthFormProps extends FormProps<Berth> {
  onSubmitText?: string;
  pierOptions: Pier[];
}

const getBerthValidationSchema = (
  t: TFunction,
  pierOptions: Pier[]
): ObjectSchema => {
  return Yup.object().shape({
    pierId: Yup.string()
      .oneOf(pierOptions.map(pier => pier.id))
      .required(t('forms.common.errors.required')),
    number: Yup.number()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    width: Yup.number()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    length: Yup.number()
      .typeError(t('forms.common.errors.numberType'))
      .required(t('forms.common.errors.required')),
    mooringType: Yup.string()
      .oneOf(Object.keys(BerthMooringType))
      .required(t('forms.common.errors.required')),
  });
};

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
  const validationSchema = getBerthValidationSchema(t, pierOptions);

  const initial =
    initialValues ??
    ({
      pierId: pierOptions[0].id,
      mooringType: Object.keys(BerthMooringType)[0],
      comment: '',
      isActive: true,
    } as Berth);

  return (
    <Formik
      initialValues={initial}
      onSubmit={values => onSubmit?.(values)}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.heading}>
            <Text as="h4">{t('forms.berth.title')}</Text>
            {onDelete && (
              <button disabled={isSubmitting} onClick={() => onDelete(values)}>
                <Text color="critical">{t('forms.common.delete')}</Text>
              </button>
            )}
          </div>
          <Grid colsCount={3} className={styles.grid}>
            <Select
              id="pierId"
              value={values.pierId}
              options={pierOptions.map(pier => {
                return {
                  label: pier.identifier,
                  value: pier.id,
                };
              })}
              onChange={handleChange}
              labelText={t('forms.berth.pier')}
              required
            />
            <TextInput
              id="number"
              type="number"
              value={String(values.number)}
              onChange={handleChange}
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
            onChange={event =>
              handleChange({
                target: {
                  id: 'isActive',
                  value: event.target.checked,
                },
              })
            }
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
