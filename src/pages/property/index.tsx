import React, {
  useState,
  memo,
  useCallback,
  useEffect,
  useRef,
  FC,
} from 'react';
import { Table, Button } from 'antd';
import { connect, Dispatch, Loading } from 'umi';
import {
  ISinglePropertyType,
  FromValues,
  PropertyState,
} from '@/interface/property';
import { ColumnsType } from 'antd/es/table';
import PropertyModel from './components/PropertyModal';
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
  const [propertyList, setPropertyList] = useState<ISinglePropertyType[]>([]);
  const [modalVisible, setModalVisible] = useState<true | false>(false);

  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  };

  function changeMoneyFormat(num: number) {
    return num.toLocaleString('en-IN', options);
  }

  const columns: ColumnsType<ISinglePropertyType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '10%',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filterSearch: true,
      width: '60%',
    },
    {
      title: 'Valuation',
      dataIndex: 'valuation',
      sorter: (a: { valuation: number }, b: { valuation: number }) =>
        a.valuation - b.valuation,
      width: '30%',
      align: 'right',
      render: (text) => <p>{changeMoneyFormat(text)}</p>,
    },
  ];

  useEffect(() => {
    if (property.properties.length > 0) {
      const list: ISinglePropertyType[] = [];
      let total = 0;
      property.properties.map((item: ISinglePropertyType) => {
        if (item.hidden === false) {
          list.push(item);
          total += item.valuation;
        }
      });
      setPropertyList(list);
      setTotalValuation(total);
    }
  }, [propertyDataLoading, property]);

  const ModalVisibleCloseHandler = useCallback(() => {
    setModalVisible(false);
  }, []);

  const ModalVisibleOpenHandler = () => {
    setModalVisible(true);
  };

  const onFinish = useCallback(async (values: FromValues) => {
    const postData = async () => {
      try {
        await dispatch({
          type: 'property/postProperty',
          payload: { values },
        });
        await dispatch({
          type: 'property/getAllList',
        });
      } catch (error) {
        console.log(error);
      }
    };
    setModalVisible(false);
    postData();
  }, []);

  console.log(2);

  return (
    <div className={styles['list-table']}>
      <h1>Properties</h1>
      <div className={styles['button-right']}>
        <Button type="primary" onClick={ModalVisibleOpenHandler}>
          Add Property
        </Button>
      </div>
      <PropertyModel
        visible={modalVisible}
        ModalVisibleCloseHandler={ModalVisibleCloseHandler}
        onFinish={onFinish}
      />
      <div>
        <Table
          columns={columns}
          dataSource={propertyList}
          rowKey="id"
          bordered
          pagination={false}
          loading={propertyDataLoading}
        />
        {!propertyDataLoading && (
          <div>
            <p className={styles['total-valuation']}>
              {!propertyDataLoading && changeMoneyFormat(totalValuation)}
            </p>
          </div>
        )}
      </div>
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
