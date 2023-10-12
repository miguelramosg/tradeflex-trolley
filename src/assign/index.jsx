import React, { ReactElement, useEffect, useState } from 'react';
import { 
  Form,
  Select,
  Button, 
  message,
  Input
} from 'antd';

const { TextArea } = Input;


export default function AssignCleaner(): ReactElement {
const { Option } = Select;
const [staff, setStaff] = useState([]);
const cleaners = localStorage.getItem('cleaner');

useEffect(() => {
  if (cleaners !== null) {
    setStaff(JSON.parse(cleaners))
  }
},[]);

return (
  <>
      <Form.Item
        name="cleaner"
        label="Cleaner"
        hasFeedback
        rules={[{ required: true }]}
      >
      {staff.length > 0 &&
        <Select
            showSearch
            placeholder="Select a person"
            loading={staff.length < 0}
            disabled={staff.length < 0}
          >
          {staff?.map((person: any) => (
            <Select.Option key={person?.staffId} value={person?.staffId}>
              {person?.label}
            </Select.Option>
          ))}
        </Select>
      }
      </Form.Item>
    <Form.Item
        name="notes"
        label="Notes"
        hasFeedback
      >
        <TextArea rows={4} placeholder="Any note that you want to add" />
      </Form.Item>
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
        >
          Submit
        </Button>
      </Form.Item>
  </>
 )};
