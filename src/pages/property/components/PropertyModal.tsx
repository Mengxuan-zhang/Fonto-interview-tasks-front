import React, { useState, memo, useEffect, FC } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { ISinglePropertyType, FromValues } from '@/interface/Property';
import './PropertyModal.less';

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
      sm: { span: 17 },
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
        className="modal"
        okText="Accept"
        cancelText="Cancel"
        closable={false}
        onOk={submitHandler}
        onCancel={cancelHandler}
      >
        <Form
          name="basic"
          data-testid="form"
          form={form}
          onFinish={onFinish}
          {...formItemLayout}
        >
          <h2 className="text">Enter property details</h2>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input your address!',
              },
            ]}
          >
            <Input data-testid="address" />
          </Form.Item>

          <Form.Item
            label="Valuation"
            name="valuation"
            rules={[
              {
                required: true,
                type: 'number',
                message: 'Please input your valuation!',
              },
            ]}
          >
            <InputNumber
              min={0}
              data-testid="valuation"
              className="input"
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

export default memo(PropertyModal);
