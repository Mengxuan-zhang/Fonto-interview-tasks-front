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
// import UserModal from './components/UserModal';
import { ISinglePropertyType, FromValues } from '@/interface/property';

import styles from './index.less';

interface UserPageProps {
  property: ISinglePropertyType;
  dispatch: Dispatch;
  // usersDataLoading: boolean,
}

const PropertyListPage: FC<UserPageProps> = ({ property, dispatch }) => {
  const dataSource = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
          // children: [
          //   {
          //     text: 'Yellow',
          //     value: 'Yellow',
          //   },
          //   {
          //     text: 'Pink',
          //     value: 'Pink',
          //   },
          // ],
        },
        {
          text: 'Category 2',
          value: 'Category 2',
          // children: [
          //   {
          //     text: 'Green',
          //     value: 'Green',
          //   },
          //   {
          //     text: 'Black',
          //     value: 'Black',
          //   },
          // ],
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      width: '30%',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: '40%',
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  // useEffect(() => {
  //   console.log(2);
  //   dispatch({
  //     type: 'property/getAllList'
  //   });
  // }, [])

  return (
    <div className={styles['list-table']}>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} />
    </div>
  );
};

export default connect(({ property }: { property: PropertyState }) => {
  // console.log(loading)
  return {
    property,
    // usersDataLoading: loading.models.users,
  };
})(PropertyListPage);
