import React, { ReactElement, useEffect, useState } from 'react';
import { 
  message, 
  Form,
  Collapse,
  Input,
  Modal,
} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { doc } from 'firebase/firestore';
import { 
  useFirestoreDocData, 
  useFirestore, 
} from 'reactfire';
import FloorChoose from './../floor';
import AssignCleaner from './../assign';
import ItemsToPick from './../items';
import * as FirestoreService from './../utilities/firebaseConfig'

import type { CollapseProps } from 'antd';

export default function StepsForm(props): ReactElement {
  const { confirm } = Modal;
  const [form] = Form.useForm();
  const {changeStage} = props;
  const level = localStorage.getItem('level');
  const cleaners = localStorage.getItem('cleaners');
  const sentData = localStorage.getItem('sentData')
  const getIniDate = localStorage.getItem('getIniDate');
  const trolley = window.location.hash;  
  const [valueForm, setValueForm] = useState({});
  const [activeKey, setActiveKey] = useState(1);
  const [floorSelect, setFloorSelect] = useState('');
  const [checkedItems, setCheckedItems] = useState(false);

  const itemAccs: CollapseProps['items'] = [
    {
      key: 1,
      label: 'Select the level',
      children: <FloorChoose />,
    },
    {
      key: 2,
      label: 'Make sure that you have this items',
      children: <ItemsToPick floor={floorSelect}/>,
    },
    {
      key: 3,
      label: 'Who is the cleaner?',
      children: <AssignCleaner />,
    },
  ];

  useEffect(() => {
    if(sentData === null) {
      localStorage.setItem('sentData', false);
    }
    if(getIniDate === null) {
      localStorage.setItem('getIniDate', new Date);
    }
  },[])

  useEffect(() => {
    if (floorSelect !== undefined && floorSelect !== '') {
      setActiveKey(2);
    }
  }, [floorSelect]);

  useEffect(() => {
    if (checkedItems) {
      setActiveKey(3);
    }
  }, [checkedItems]);


  const showConfirm = (values) => {
    confirm({
      title: 'Do you want to save this form?',
      icon: <ExclamationCircleFilled />,
      content: 'Have you checked all things that you need, or missed any comment to do?',
      onOk() {
        FirestoreService.addData(values).then((doc => {
          localStorage.removeItem('getIniDate');
          localStorage.setItem('sentData', true);
          localStorage.setItem('stageTodo', true);
          localStorage.setItem('floorSelect', floorSelect);
        }))
      }
    });
  };

  const onFinish = (values) => {
    //console.log('Received values of form: ', values);
    showConfirm(values);
  };

  const onFieldsChange = (values) => {
    if (values[0].name[0] === 'floorSelect') {
      setFloorSelect(values[0].value);
    }
    if (values[0].name[0] === 'agreementItems'){
      setCheckedItems(true);
    }
  };

  const onChange = (key: any) => {
    setActiveKey(key);
  };


  const GetDataLevel = () => {
    const levelDb = doc(useFirestore(), 'trade', 'floor');
    const { status, data } = useFirestoreDocData(levelDb);

    if (level === null && status === 'success') {
      localStorage.setItem('level', JSON.stringify(data))
    }

    return <p>Data Loaded Level</p>;
  }

  const GetDataCleaners = () => {
    const cleanerDb = doc(useFirestore(), 'trade', 'user');
    const { status, data } = useFirestoreDocData(cleanerDb);

    if (cleaners === null && status === 'success') {
      localStorage.setItem('cleaner', JSON.stringify(data?.cleaners))
    }

    form.setFieldsValue({
      'datePicker': getIniDate,
      'trolleyNumber': trolley
    })

    return <p>Data Loaded cleaners</p>;
  }

  return (
    <>
      <GetDataLevel />
      <GetDataCleaners />
      <Form
          form={form} 
          name="validateOnly"
          onFinish={onFinish}
          onFieldsChange={onFieldsChange}
          layout="horizontal"
        >
        <Form.Item 
          name="datePicker"
          hidden
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="trolleyNumber"
          hidden
        >
          <Input />
        </Form.Item>
        <Collapse 
          accordion
          items={itemAccs} 
          defaultActiveKey={[activeKey]} 
          onChange={onChange}
          activeKey={activeKey}
        />
      </Form>
    </>
  );
}

