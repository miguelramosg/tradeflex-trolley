import React, { ReactElement, useEffect, useState } from 'react';
import {
  Checkbox,
  Form,
  List,
  Space,
  InputNumber,
  Input
} from 'antd';
import {
  CheckCircleTwoTone,
} from '@ant-design/icons';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export interface ItemsPick {
  floor: string;
}

export default function ItemsToPick(props: ItemsPick): ReactElement {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const {floor} = props;

  const [itemsLvl, setItemLvl] = useState([]);
  const itemsLevel = localStorage.getItem('level');

  useEffect(() => {
    if (itemsLvl !== null) {
      const objLvl = JSON.parse(itemsLevel);
      for (const prop in objLvl) {
        if (objLvl[prop] !== 'floor'){
          if(objLvl[prop].id === floor){
            setItemLvl(objLvl[prop].items)
          }
        }
      }
    }
  },[floor]);  

  return (
    <>  
      <h4>Items needed to pick up</h4>
      <List
        itemLayout="horizontal"
        dataSource={itemsLvl}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<CheckCircleTwoTone />}
              title={item}
            />
            {item === 'Imop'  && (
              <Space.Compact size="large">
                <Form.Item
                  name="numberImop"
                  hasFeedback
                  rules={[{ required: true }]}
                  className="no-margin"
                >
                  <InputNumber 
                    min={1} 
                    max={2} 
                    placeholder="Number"
                  />
                  </Form.Item>
              </Space.Compact>
            )}
            {item === 'Vaccum'  && (
                <Space.Compact 
                  size="large"
                >
                  <Form.Item
                    className="no-margin"
                    name="numberVaccum"
                    hasFeedback
                    rules={[{ required: true }]}
                  >
                  <InputNumber 
                    min={1} 
                    max={4} 
                    placeholder="Number"
                  />
                  </Form.Item>
                </Space.Compact>
            )}
            {item === 'Bucket'  && (
                <Space.Compact size="large">
                  <Form.Item
                    name="colorBucket"
                    hasFeedback
                    className="no-margin"
                    rules={[{ required: true }]}
                  >
                    <Input 
                      placeholder="Color" 
                    />
                  </Form.Item>
                </Space.Compact>
            )}
          </List.Item>
        )}
      />
    <Form.Item
        name="agreementItems"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should read and pick up items')),
          },
        ]}
      >
        <Checkbox>
          I have read the items and I have picked up all items needed to clean the selected level
        </Checkbox>
      </Form.Item>
    </>
  );
};