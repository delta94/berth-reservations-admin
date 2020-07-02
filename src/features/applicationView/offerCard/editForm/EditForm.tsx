import React from 'react';
import { Formik } from 'formik';
import { Checkbox } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { PureQueryOptions } from 'apollo-client';

import styles from './editForm.module.scss';
import { ORDER_OPTIONAL_PRODUCTS_QUERY } from './queries';
import { ORDER_OPTIONAL_PRODUCTS } from './__generated__/ORDER_OPTIONAL_PRODUCTS';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import List from '../../../../common/list/List';
import ListItem from '../../../../common/list/ListItem';
import { getProductServiceTKey, getPeriodTKey } from '../../../../common/utils/translations';
import {
  CREATE_ORDER_LINE,
  CREATE_ORDER_LINEVariables as CREATE_ORDER_LINE_VARS,
} from './__generated__/CREATE_ORDER_LINE';
import { CREATE_ORDER_LINE_MUTATION, DELETE_ORDER_LINE_MUTATION } from './mutation';
import {
  DELETE_ORDER_LINE,
  DELETE_ORDER_LINEVariables as DELETE_ORDER_LINE_VARS,
} from './__generated__/DELETE_ORDER_LINE';
import { formatPrice } from '../../../../common/utils/format';
import Button from '../../../../common/button/Button';
import Text from '../../../../common/text/Text';

export interface EditFormProps {
  orderId: string;
  selectedProducts: { productId: string; orderId: string }[];
  refetchQueries: PureQueryOptions[] | string[];
  handleCancel(): void;
  handleSubmit(): void;
}

interface Values {
  [productId: string]: boolean;
}

const EditForm: React.FC<EditFormProps> = ({
  orderId,
  selectedProducts,
  refetchQueries,
  handleCancel,
  handleSubmit,
}) => {
  const { t, i18n } = useTranslation();
  const { data, loading } = useQuery<ORDER_OPTIONAL_PRODUCTS>(ORDER_OPTIONAL_PRODUCTS_QUERY);
  const [createOrderLine] = useMutation<CREATE_ORDER_LINE, CREATE_ORDER_LINE_VARS>(CREATE_ORDER_LINE_MUTATION);
  const [deleteOrderLine] = useMutation<DELETE_ORDER_LINE, DELETE_ORDER_LINE_VARS>(DELETE_ORDER_LINE_MUTATION, {
    refetchQueries,
  });

  if (loading)
    return (
      <div className={styles.editForm}>
        <LoadingSpinner isLoading={loading} />
      </div>
    );
  if (!data?.additionalProducts) return <div className={styles.editForm}>{t('common.notification.noData')}</div>;

  const initialValues = data.additionalProducts.edges.reduce<Values>((acc, edge) => {
    if (!edge?.node) return acc;
    const productNodeId = edge.node.id;

    return {
      ...acc,
      [edge.node.id]: selectedProducts.find(({ productId }) => productId === productNodeId) ? true : false,
    };
  }, {});

  const onSubmit = async (values: Values) => {
    type CreateMutation = ReturnType<typeof createOrderLine>;
    type DeleteMutation = ReturnType<typeof deleteOrderLine>;

    const createMutations: CreateMutation[] = [];
    const deleteMutations: DeleteMutation[] = [];

    Object.keys(initialValues).forEach((key) => {
      if (initialValues[key] === values[key]) return;
      if (values[key] === true)
        return createMutations.concat([createOrderLine({ variables: { input: { orderId, productId: key } } })]);
      if (values[key] === false) {
        const product = selectedProducts.find(({ productId }) => productId === key);
        return product && deleteMutations.concat([deleteOrderLine({ variables: { input: { id: product.orderId } } })]);
      }
    });

    await Promise.all<CreateMutation | DeleteMutation>([...createMutations, ...deleteMutations]);

    handleSubmit();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, errors, handleChange, handleSubmit }) => {
        type Product = { id: string; label: string; price: number };

        const products = data?.additionalProducts?.edges.reduce<Product[]>((acc, edge) => {
          if (!edge?.node) return acc;

          const product = {
            id: edge.node.id,
            label: `${t(getProductServiceTKey(edge.node.service))}, ${t(getPeriodTKey(edge.node.period))}`,
            price: edge.node.priceValue,
          };

          return [...acc, product];
        }, []);

        const ProductsItems = products?.map(({ id, label, price }, i) => (
          <ListItem key={i} className={styles.listItem}>
            <Checkbox id={id} name={id} checked={values[id]} onChange={handleChange} label={label} />
            <span>{formatPrice(price, i18n.language)}</span>
          </ListItem>
        ));

        return (
          <form className={styles.editForm} onSubmit={handleSubmit}>
            <div>
              <Text as="h4" color="brand" size="m" uppercase>
                {t('offer.billing.additionalServices')}
              </Text>
              <List noBullets>{ProductsItems}</List>
            </div>
            <div className={styles.buttons}>
              <Button onClick={handleCancel} variant="secondary">
                {t('common.cancel')}
              </Button>
              <Button type="submit">{t('common.save')}</Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default EditForm;
