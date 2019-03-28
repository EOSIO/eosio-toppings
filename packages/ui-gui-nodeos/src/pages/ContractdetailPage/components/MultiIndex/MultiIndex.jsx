import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { fetchStart, paramsSet } from './MultiIndexReducer';

import { push } from 'connected-react-router'

import { Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import styled from 'styled-components';
import { CodeViewer } from 'components';

const SelectLabel = styled.label`
  font-weight: bold;
  padding: 8px 10px 0 0;
`
const DivFlexStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 25px 15px 15px 15px;
`

const MultiIndex = (props) => {

  const [dropDownSelctedValue, setSelectedValue] = useState("Select Table");
  const [showDetailsSection, setShowDetailsSection ] = useState(false);
  const [ isOpenDropDown, toggleDropDown] = useState(false);  

  let { multiIndex: { isFetching, data, params } } = props;
  let { payload, error } = data;
  let { abiData } = props;

  return (
    <div className="MultiIndex">
      <DivFlexStyled>
        <SelectLabel>Select Table to Display multi-Index Table:</SelectLabel>
        <Dropdown isOpen={isOpenDropDown} toggle={()=>{toggleDropDown(!isOpenDropDown)}}>
          <DropdownToggle caret>{dropDownSelctedValue}</DropdownToggle>
          <DropdownMenu right>
            {(abiData.abi.tables).map((eachTable)=>
                <DropdownItem 
                  key={eachTable.name} 
                  onClick={()=>{ 
                    setSelectedValue(eachTable.name);
                    props.paramsSet({endpoint: 'http://localhost:8888',  contract_name: abiData.name, table_name: eachTable.name });
                    props.fetchStart();
                    setShowDetailsSection(true);   
                  }}>
                {eachTable.name}</DropdownItem>)}
          </DropdownMenu>     
        </Dropdown>               
      </DivFlexStyled>                
      {error
        ? <button onClick={props.fetchStart}>{JSON.stringify(error)} Click to reload.</button>
        : isFetching 
          ? `loading...`
          : showDetailsSection
            ? payload.length === 0
              ? `No data in Multi-Index table ${params.table_name}`
              : <div>
                  <Card>
                    <CardBody>
                      <CodeViewer
                        language="json"
                        value={JSON.stringify(payload, null, 2)}
                        readOnly={true}
                        height={600}
                      />
                    </CardBody>        
                  </Card>   
                </div>
              :<div></div>}         
    </div>
  );
}

export default connect(
  ({ contractdetailPage: { multiIndex }}) => ({
    multiIndex
  }),
  {
    fetchStart,
    paramsSet,
    push
  }

)(MultiIndex);
