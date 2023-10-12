import React, { ReactElement, useEffect, useState } from 'react';
import { 
  Form,
  Select
} from 'antd';


export default function FloorChoose(): ReactElement {
const { Option } = Select;

const [levels, setLevels] = useState([]);
let level = localStorage.getItem('level');
const algo = false;

useEffect(() => {
  if (level !== null) {
  	let floorArr: any = [];
  	const objLvl = JSON.parse(level);
  	for (const prop in objLvl) {
  		if (objLvl[prop] !== 'floor'){
		  	floorArr.push(objLvl[prop])
  		}
	}
    setLevels(floorArr)
  }
},[]);

return (
	<>
		<Form.Item
	    	name="floorSelect"
		    label="Pick one"
			hasFeedback
			rules={[{ required: true, message: 'Please select a level!' }]}
	    >
			{levels?.length > 0 &&
		      <Select 
		      	placeholder="Please select one"
		      	loading={level?.length < 0}
	           	disabled={level?.length < 0}
		      >
			    {
				    levels?.map( (x,y) => 
				      <Option key={y} value={x?.id}>{x?.title}</Option>
				    )
				 }
		      </Select>
			}
		</Form.Item>
	</>
 )
}