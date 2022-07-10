import {
    MDBValidationItem,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBDataTable,
    MDBTabsPane, MDBCard, MDBTypography, MDBCardBody, MDBIcon, MDBDropdownToggle, MDBDropdownMenu, MDBRow, MDBBtn, MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownLink, MDBContainer, MDBInput, MDBTable, MDBTableHead, MDBTableBody, MDBPaginationLink, MDBPaginationItem
} from 'mdb-react-ui-kit';
import { Routes, Route, useLocation } from 'react-router-dom'
import React, { useState, useMemo, useRef, useCallback, useEffect, createRef, forwardRef, useImperativeHandle, useLayoutEffect, memo } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import useCache from '../../../../Storage/useCache';
import useSettings from '../../../../Storage/useSettings';

import s_attendances from '../../../../Services/attendance.service.js'
import styled from 'styled-components';
import Scanner from './Scanner/Scanner';
import s_attendance from '../../../../Services/attendance.service.js';
import { toast } from 'react-toastify';

const ScannerResultContainer = styled.p`

color: black;
font-size: 2rem;

`;
const ScannerResult = forwardRef((props, ref) => {
    const [result, setResult] = useState(0);
    const [lastDetected, setLastDetected] = useState(undefined);

    useImperativeHandle(ref, () => ({
        onDetected(receivedResult) {
            console.log('onDetected ScannerResult ' + receivedResult);
            setResult(receivedResult);
            setLastDetected(new Date());
        },

    }));

    useEffect(() => {
        const interval = setInterval(() => {

            if (!lastDetected || (new Date() - lastDetected) / 1000 > 3) {
                setResult("Put the codebar in front of camera.");
            }
        }, 50);
        return () => clearInterval(interval);
    }, [lastDetected, result]);
    return (
        <ScannerResultContainer>{result}</ScannerResultContainer>
    );
});
function Attendance({ attendance }) {

    return <tr>
        <th scope='row'>{attendance.Id}</th>
        <td>{attendance.Contact.Name}</td>
        <td>{new Date(attendance.createdAt).toLocaleString()}</td>

        <td><MDBDropdown group>
            <MDBDropdownToggle color='primary'>Action</MDBDropdownToggle>
            <MDBDropdownMenu>
                <MDBDropdownItem>
                    <MDBDropdownLink href="#">View proffile</MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownItem>
                    <MDBDropdownLink href="#">Delete</MDBDropdownLink>
                </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown></td>
    </tr>


}
function InputCombo(props) {
    return <select className="form-control select-input" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} onChange={props.onChange} value={props.value}>
        {props.values.map((a, i) => <option key={i} value={i}>{a}</option>)}
    </select>
}

function SelectHidDevice() {

    const [hidDevice, selectHidDevice] = useState(0);

    const onChange = (ev) => {
        selectHidDevice(ev.target.value);
    }
    return <MDBRow className='mt-3'>
        <MDBCol className='d-flex col-sm-5' style={{ position: 'relative' }}>Select scanner device</MDBCol>
        <MDBCol className='d-flex col-sm-5' style={{ position: 'relative' }}>
            <InputCombo values={["KEYBOARD", "RAZER"]} onChange={onChange} value={hidDevice} />
        </MDBCol>
    </MDBRow>
}
const AttendanceList = forwardRef(({ event }, ref) => {

    const [attendances, setAttendances] = useState([]);
    const [lastEventId, setLastEventId] = useState(-1);

    const [searchName, setSearchName] = useState('');
    const [updatedQuery, setUpdatedQuery] = useState(false);
    const [attendancesFetchCount, setAttendancesFetchCount] = useState(0);

    const lastRequest = useRef(new Date());

    useImperativeHandle(ref, () => ({
        setAttendances(state) {
            setAttendances(state);
        },
        getAttendances() {
            return attendances;
        }
    }));

    const toggleDeleteModal = (ev) => {

    }

    const fetchData = async () => {

        if (attendances.length !== 0 && attendancesFetchCount == 0) {
            setAttendancesFetchCount(attendancesFetchCount + 1);

            return;
        }
        setAttendancesFetchCount(attendancesFetchCount + 1);

        console.log('lastEventId ' + lastEventId);
        const response = await s_attendances.searchByName(searchName, event.Id, updatedQuery ? -1 : lastEventId);

        if (updatedQuery) {

            setLastEventId(-1);
            setAttendances([]);
            setUpdatedQuery(false);
            console.log('rsponse ' + JSON.stringify(response));
            setLastEventId(response.data.result.length == 0 ? -1 : response.data.result[response.data.result.length - 1].Id);
            setAttendances(response.data.result);
            return;
        }
        if (response.data.result.length > 0) {
            setLastEventId(response.data.result[response.data.result.length - 1].Id);

            if (attendances == undefined)
                setAttendances(response.data.result);
            else
                setAttendances([...attendances, ...response.data.result]);
        }

    }

    useLayoutEffect(() => {

        const timerId = setTimeout(() => {

            fetchData();
        }, 200);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchName]);

    const onUpdateQuery = async (ev) => {
        setUpdatedQuery(true);
        setSearchName(ev.target.value);
    }

    return (<MDBRow>
        <MDBCol className='d-flex justify-content-end' end>
            <MDBInput label='Search attendance' value={searchName} onChange={onUpdateQuery} type='text' className='ml-3'></MDBInput>
        </MDBCol>

        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
            <InfiniteScroll
                dataLength={attendances !== undefined ? attendances.length : 0}
                next={fetchData}
                hasMore={true}
                loader={<h4></h4>}>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Time</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </MDBTableHead>

                    <MDBTableBody>

                        {attendances ? attendances.map((i, index) => (
                            <Attendance attendance={i} modalToggle={toggleDeleteModal} key={index} />
                        )) : null}

                    </MDBTableBody>

                </MDBTable>
            </InfiniteScroll>
        </div>
    </MDBRow>)
});

function CardBody({ event, cref }) {
    const [basicActive, setBasicActive] = useState('tab1');
    const { scannerMode, setScannerMode } = useSettings();
    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }

        setBasicActive(value);
    };


    const onChangeMode = (ev) => {
        setScannerMode(ev.target.value);
        console.log(ev.target.value);
    }
    return (<MDBCardBody>
        <MDBTabs className='mb-3'>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                    List
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                    Settings
                </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>
        <MDBTabsContent>
            <MDBTabsPane show={basicActive === 'tab1'}>
                <AttendanceList ref={cref} event={event} />

            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab2'}>
                <MDBRow>
                    <MDBCol className='d-flex col-sm-5' style={{ position: 'relative' }}>Scanner mode</MDBCol>
                    <MDBCol className='d-flex col-sm-5' style={{ position: 'relative' }}>
                        <InputCombo values={["Hand scanner", "Web cam"]} onChange={onChangeMode} value={scannerMode} />
                    </MDBCol>
                </MDBRow>

                {scannerMode == 0 ? <SelectHidDevice /> : null}

            </MDBTabsPane>

        </MDBTabsContent>
    </MDBCardBody>)
}

function EventAttendanceView(props) {
    let location = useLocation();

    const event = location.state;


    const { scannerMode, setScannerMode } = useSettings();
    console.log(JSON.stringify(event));


    const [hidDevices, setHidDevices] = useState();

    const lastRequest = useRef(new Date());

    const attendancesRef = useRef();
    const resultRef = useRef();
    const nextTimeout = useRef(2);
    const onDetected = useCallback(async (result) => {

        resultRef.current.onDetected(result);
        if (((new Date() - lastRequest.current) / 1000) > 2) {
            lastRequest.current = new Date();
            console.log("Called request to db")
            s_attendance.add({ Barcode: result, EventId: event.Id }).then(result => {
                if (result) {
                    if (result.data.status == 'SUCCESS') {
                        toast.success("Succefully attended member.");
                        if (attendancesRef.current.getAttendances() == undefined)
                            attendancesRef.current.setAttendances(result.data.result);
                        else
                            attendancesRef.current.setAttendances([result.data.result, ...attendancesRef.current.getAttendances()]);
                        nextTimeout.current = 7;
                    }
                    else {
                        toast.error(result.data.message);
                        nextTimeout.current = 3;
                    }
                }
            })


        }
    });



    const scan = useMemo(() => { return <Scanner onDetected={onDetected} /> }, [scannerMode]);

    return (

        <MDBRow>
            <MDBCol lg="4">
                <MDBCard mb="4" style={{ backgroundColor: '#F7F7F7' }}>
                    <MDBCardBody className='text-center'>

                        <h5 className="my-3">{event.Title}</h5>


                        <h1 className='text-primary mt-5'>Please scan the barcode</h1>
                        {scan}
                        <ScannerResult ref={resultRef} />
                    </MDBCardBody>
                </MDBCard>

            </MDBCol>
            <MDBCol lg="8">
                <MDBCard mb="4">
                    <CardBody cref={attendancesRef} event={event} />
                </MDBCard>
            </MDBCol>
        </MDBRow >
    );
}

export default EventAttendanceView;
