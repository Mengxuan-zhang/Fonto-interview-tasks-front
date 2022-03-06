import React, {
  useState,
  memo,
  useCallback,
  useEffect,
  useRef,
  FC,
} from 'react';
import { Table, Tag, Space, Input, Popconfirm, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { connect, Dispatch, Loading, PropertyState } from 'umi';
import { ISinglePropertyType, FromValues } from '@/interface/property';
import { ColumnsType } from 'antd/es/table';

import styles from './index.less';

interface PropertyPageProps {
  property: PropertyState;
  dispatch: Dispatch;
  propertyDataLoading: boolean;
}

const PropertyListPage: FC<PropertyPageProps> = ({
  property,
  dispatch,
  propertyDataLoading,
}) => {
  const [totalValuation, setTotalValuation] = useState(0);
  const columns: ColumnsType<ISinglePropertyType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Category 1',
      //     value: 'Category 1',
      //     // children: [
      //     //   {
      //     //     text: 'Yellow',
      //     //     value: 'Yellow',
      //     //   },
      //     //   {
      //     //     text: 'Pink',
      //     //     value: 'Pink',
      //     //   },
      //     // ],
      //   },
      //   {
      //     text: 'Category 2',
      //     value: 'Category 2',
      //     // children: [
      //     //   {
      //     //     text: 'Green',
      //     //     value: 'Green',
      //     //   },
      //     //   {
      //     //     text: 'Black',
      //     //     value: 'Black',
      //     //   },
      //     // ],
      //   },
      // ],
      // filterMode: 'tree',
      // filterSearch: true,
      // onFilter: (value, record) => record.name.includes(value),
      width: '10%',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: 'Valuation',
      dataIndex: 'valuation',
      sorter: (a: { valuation: number }, b: { valuation: number }) =>
        a.valuation - b.valuation,
      width: '40%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filterSearch: true,
      width: '40%',
    },
  ];

  function propertyListFilter(properties: ISinglePropertyType[]) {
    console.log(properties);
    return properties.length > 0
      ? properties.filter((property) => property.hidden === false)
      : [];
  }

  return (
    <div className={styles['list-table']}>
      <Table
        columns={columns}
        dataSource={propertyListFilter(property.properties)}
        rowKey="id"
        loading={propertyDataLoading}
      />
      <p></p>
    </div>
  );
};

export default connect(
  ({ property, loading }: { property: PropertyState; loading: Loading }) => {
    return {
      property,
      propertyDataLoading: loading.models.property,
    };
  },
)(PropertyListPage);
