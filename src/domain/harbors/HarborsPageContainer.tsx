import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
// For some reason eslint import plugin is unable to detect the following type
// eslint-disable-next-line
import { Column } from 'react-table';

import { HARBORS_QUERY } from './harborsQuery';
import Table from '../../common/table/Table';
import { getHarborsData, HarborData } from './utils';
import { HARBORS } from './__generated__/HARBORS';
import Icon from '../../common/icon/Icon';
import HarborDetails from './harborDetails/HarborDetails';
import Page from '../page/Page';
import HarborsPage from './HarborsPage';

interface Props2 {
  name?: string;
  imageFile?: string;
  streetAddress?: string;
  zipCode?: React.ReactNode;
  municipality?: string;
  wwwUrl?: string;
  servicemapId?: string;
}

interface Props {
  data: Props2;
}

// export const HarborDetails = ({ data }: Props) => {
//   const address = `${data.streetAddress} ${data.zipCode} ${data.municipality}`;
//   const servicemapUrl = `http://palvelukartta.hel.fi/unit/${data.servicemapId}`;

//   const Harbor1 = () => (
//     <Card>
//       <Paragraph>
//         <figure>
//           <img src={data.imageFile} alt={data.name}></img>
//           <figcaption>{data.name}</figcaption>
//         </figure>
//       </Paragraph>
//       <Paragraph title="Osoite">
//         <Text color="brand" size="xs">
//           {address}
//         </Text>
//       </Paragraph>
//       <Paragraph>
//         <Text color="brand" size="s">
//           <a href={data.wwwUrl}>Toimipisteen nettisivut</a>
//         </Text>
//       </Paragraph>
//       <Paragraph>
//         <Text color="brand" size="s">
//           Satamakartta (PDF)
//         </Text>
//       </Paragraph>
//       <Paragraph>
//         <Text color="brand" size="s">
//           <a href={servicemapUrl}>Palvelukartta</a>
//         </Text>
//       </Paragraph>
//     </Card>
//   );

//   const Harbor2 = () => (
//     <Card>
//       <Paragraph>
//         <LabelValuePair label="Max leveys" value="2.5m - 4m" />
//         <LabelValuePair
//           label="Kiinnitys"
//           value="Aisa-, Kävelyaisa- ja Peräpoijupaikkoja"
//         />
//         <LabelValuePair
//           label="Päällikkö"
//           value="Mikko Mallikas +358 00 000 000"
//         />
//         <LabelValuePair label="Huoltotiimi" value="Itäinen veneilytiimi" />
//       </Paragraph>
//     </Card>
//   );

//   const Harbor3 = () => (
//     <Card>
//       <Paragraph title="Viimeaikainen toiminta">
//         <Text color="brand" size="xs">
//           Ei mitään
//         </Text>
//       </Paragraph>
//     </Card>
//   );

//   return (
//     <Grid colsCount={3}>
//       <Harbor1 />
//       <Harbor2 />
//       <Harbor3 />
//     </Grid>
//   );
// };

type ColumnType = Column<HarborData> & { accessor: keyof HarborData };

const HarborsContainer: React.FC = () => {
  const { loading, error, data } = useQuery<HARBORS>(HARBORS_QUERY);
  const { t } = useTranslation();
  const columns: ColumnType[] = [
    {
      Header: t('harbors.tableHeaders.harbor'),
      accessor: 'name',
    },
    {
      Header: t('harbors.tableHeaders.places'),
      accessor: 'numberOfPlaces',
    },
    {
      Cell: ({ cell }) => (
        <Icon
          name="plug"
          outlined
          color={!!cell.value ? 'secondary' : 'standard'}
        />
      ),
      Header: () => <Icon name="plug" outlined />,
      accessor: 'electricity',
    },
    {
      Cell: ({ cell }) => (
        <Icon
          name="fence"
          outlined
          color={!!cell.value ? 'secondary' : 'standard'}
        />
      ),
      Header: () => <Icon name="fence" outlined />,
      accessor: 'gate',
    },
    {
      Cell: ({ cell }) => (
        <Icon
          name="streetLight"
          outlined
          color={!!cell.value ? 'secondary' : 'standard'}
        />
      ),
      Header: () => <Icon name="streetLight" outlined />,
      accessor: 'lighting',
    },
    {
      Cell: ({ cell }) => (
        <Icon
          name="waterTap"
          outlined
          color={!!cell.value ? 'secondary' : 'standard'}
        />
      ),
      Header: () => <Icon name="waterTap" outlined />,
      accessor: 'water',
    },
    {
      Cell: ({ cell }) => (
        <Icon
          name="trash"
          outlined
          color={!!cell.value ? 'secondary' : 'standard'}
        />
      ),
      Header: () => <Icon name="trash" outlined />,
      accessor: 'wasteCollection',
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const tableData = getHarborsData(data);

  return (
    <Page>
      <HarborsPage>
        <Table
          data={tableData}
          columns={columns}
          renderSubComponent={row => <HarborDetails {...row.original} />}
          renderMainHeader={() => t('harbors.tableHeaders.mainHeader')}
          canSelectRows
        />
      </HarborsPage>
    </Page>
  );
};

export default HarborsContainer;
