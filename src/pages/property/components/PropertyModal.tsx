import React, { useState, memo, useEffect, FC } from 'react';
import { Modal, Button, Form, Input, message, InputNumber } from 'antd';
import { ISinglePropertyType, FromValues } from '@/interface/Property';
import styles from './PropertyModal.less';

interface PropertyModal {
  visible: true | false;
  ModalVisibleCloseHandler: () => void;
  onFinish: (values: FromValues) => void;
}
const PropertyModal: FC<PropertyModal> = (props) => {
  const { visible, ModalVisibleCloseHandler, onFinish } = props;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
    },
  };

  const submitHandler = () => {
    form.submit();
  };

  const cancelHandler = () => {
    form.resetFields();
    ModalVisibleCloseHandler();
  };

  return (
    <div>
      <Modal
        visible={visible}
        bodyStyle={styles.modal}
        okText="Accept"
        cancelText="Cancel"
        closable={false}
        onOk={submitHandler}
        onCancel={cancelHandler}
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          {...formItemLayout}
        >
          <h2>Enter property details</h2>
          <Form.Item
            label="Address"
            name="address"
            // add regex
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input your address!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Valuation"
            name="valuation"
            // add regex
            rules={[
              {
                required: true,
                type: 'number',
                message: 'Please input your valuation!',
                // validator: checkPrice,
                //^[0-9]*\.?[0-9]+$
              },
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: '50%' }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PropertyModal;
