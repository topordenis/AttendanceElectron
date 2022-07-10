import { MDBValidationItem, MDBInputGroup, MDBValidation, MDBFile, MDBCheckbox, MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput, MDBTable, MDBTableHead, MDBTableBody, MDBPaginationLink, MDBPaginationItem } from 'mdb-react-ui-kit';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useSettings from '../../../Storage/useSettings'

function InputCombo(props) {
    return <select className="form-control select-input" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} onChange={props.onChange} value={props.value}>
        {props.values.map((a, i) => <option key={i} value={i}>{a}</option>)}
    </select>
}

function Settings() {
    let location = useLocation();

    const { scannerMode, setScannerMode } = useSettings();

    const onChangeMode = (ev) =>{
        setScannerMode(ev.target.value);
    }
    return (

        <div className="d-flex-inline">
            <MDBRow>
                <MDBCol className='d-flex col-sm-5' style={{ position: 'relative' }}>Scanner mode</MDBCol>
                <MDBCol className='d-flex col-sm-5' style={{ position: 'relative' }}>
                    <InputCombo values={["Hand scanner", "Web cam"]} onChange={onChangeMode} value={scannerMode} />
                </MDBCol>
            </MDBRow>

        </div>
    );
}

export default Settings;
