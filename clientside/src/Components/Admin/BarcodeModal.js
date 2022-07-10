import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,

    MDBTypography,
    MDBModalFooter, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBValidationItem, MDBValidation, MDBFile, MDBCheckbox, MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput, MDBTable, MDBTableHead, MDBTableBody, MDBPaginationLink, MDBPaginationItem
} from 'mdb-react-ui-kit';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { createRef, useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import useSettings from '../../Storage/useSettings';
import Scanner from '../Admin/Events/Attendance/Scanner/Scanner'
import { ScannerContainer } from '../Admin/Events/Attendance/View'

import { toast } from 'react-toastify';

const ScannerResult = forwardRef((props, ref) => {
    const [result, setResult] = useState(undefined);
    const [lastDetected, setLastDetected] = useState(undefined);

    const [lastResults, setResults] = useState([]);

    useImperativeHandle(ref, () => ({
        onDetected(receivedResult) {
          
            setResults([receivedResult, ...lastResults])
            if (lastResults.length > 5) {
                var distribution = {},
                    max = 0,
                    result = [];

                lastResults.forEach(function (a) {
                    distribution[a] = (distribution[a] || 0) + 1;
                    if (distribution[a] > max) {
                        max = distribution[a];
                        result = [a];
                        return;
                    }
                    if (distribution[a] === max) {
                        result.push(a);
                    }
                });


                setResult(result);
                setResults([]);
            }
        },
        getCode() {
            return result;
        },
    }));

    useEffect(() => {
        // const interval = setInterval(() => {

        //     if (!lastDetected || (new Date() - lastDetected) / 1000 > 3) {
        //         codeResult = undefined;
        //         setResult("Put the codebar in front of camera.");
        //     }
        // }, 50);
        //return () => clearInterval(interval);
    }, [lastDetected, result]);
    return (
        <MDBTypography className='mt-5' variant='h2'>{result ? result : 'Please scan the barcode'}</MDBTypography>
    );
});


const BarcodeModal = ({ showBarcode, toggleBarcode, setShowBarcode, setBarCode }) => {

    const { scannerMode, setScannerMode } = useSettings();
    const scannerRef = useRef(null);
    const resultRef = createRef();
    const [scanning, setScanning] = useState(false);

    const [codeResult, setCodeResult] = useState();

    const onDetected = result => {
        console.log(JSON.stringify(result));
        resultRef.current.onDetected(result);
    };
    useEffect(() => {
        setScanning(true);
    });

    const assignCode = () => {

        

        var barcode = resultRef.current.getCode();
        if (!barcode){
            toast.error("Can't assign undefined code.");
            return;
        }

        setBarCode(barcode);

    }


    return (showBarcode ?
        <MDBModal show={showBarcode} setShow={setShowBarcode} tabIndex='-1'>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Assign codebar to member</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleBarcode}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>

                  
                            {scanning ? <Scanner onDetected={onDetected} /> : null}

                        <ScannerResult ref={resultRef} />
                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleBarcode}>
                            Close
                        </MDBBtn>
                        <MDBBtn className='btn-success' onClick={assignCode} >Assign</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal> : null
    )
}
export default BarcodeModal;