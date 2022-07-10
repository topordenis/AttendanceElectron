import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBValidationItem, MDBValidation, MDBFile, MDBCheckbox, MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput, MDBTable, MDBTableHead, MDBTableBody, MDBPaginationLink, MDBPaginationItem } from 'mdb-react-ui-kit';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import BarcodeModal from '../BarcodeModal';
import { useState } from 'react'
import useCache from '../../../Storage/useCache';
import s_contacts from '../../../Services/contacts.service';
import {toast } from 'react-toastify'

function EditMember() {
    let location = useLocation();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState(location.state);
    const { members, setMembers } = useCache();
    const [showBarcode, setShowBarcode] = useState(false);

    const setBarCode = (code) => {
        console.log('setBarCode ' + code);
        setFormValue({ ...formValue, ['Barcode']: `${code}` });
        toggleBarcode();
    }


    const toggleBarcode = (e) => {
        if (e)
            e.preventDefault();
        setShowBarcode(!showBarcode);
    }

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };


    const saveMember = async (e) => {

        e.preventDefault();
        console.log('add member ' + JSON.stringify(formValue));
        var result = await s_contacts.update(formValue);



        if (members && members.length > 0) {
            const newItems = [...members];
            var index = newItems.findIndex(m => m.Id === formValue.Id);

            if (index !== -1) {
                newItems[index] = formValue;
                toast.success("Saved member succesfully.")
                console.log('newItems ' + JSON.stringify(newItems));
                setMembers(newItems);
                navigate('/dashboard/members')
            }
        }

    }

    return (
        <div className="d-flex-inline">
            <BarcodeModal setBarCode={setBarCode} showBarcode={showBarcode} setShowBarcode={setShowBarcode} toggleBarcode={toggleBarcode} />
            <MDBCard alignment='center'>
                <MDBValidation onSubmit={saveMember} noValidate={false}>
                    <MDBCardHeader>Edit profile</MDBCardHeader>
                    <MDBCardBody>



                        <MDBRow className='mb-4'>
                            <MDBValidationItem
                                feedback='User must have name'
                                invalid
                            >
                                <MDBInput label='Name' name="Name" value={formValue.Name} onChange={onChange} required />
                            </MDBValidationItem>

                        </MDBRow>
                        <MDBValidationItem
                            className='mb-5'
                            feedback='User must have a phone number'
                            invalid
                        >
                            <MDBInput type='tel' label='Phone number' value={formValue.Phone} name="Phone" onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem
                            className='mb-5'
                            feedback='User must have a Location'
                            invalid
                        >
                            <MDBInput label='Location' name="Location" value={formValue.Location} onChange={onChange} required />
                        </MDBValidationItem>

                        <MDBValidationItem
                            className='mb-5'
                            feedback='User must have role'
                            invalid
                        >
                            <MDBInput label='Role' name="Role" value={formValue.Role} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem
                            className='mb-5'
                            feedback='User must have age'
                            invalid
                        >
                            <MDBInput type='number' label='Age' name="Age" value={formValue.Age} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem
                            className='mb-5'
                            feedback='User must have a code'
                            invalid
                        >
                            <MDBRow>
                                <MDBCol md="8">
                                    <MDBInput type="text" name="Barcode" label="Barcode" value={formValue.Barcode} onChange={onChange} required disabled />
                                </MDBCol>
                                <MDBCol md="4" className='d-flex justify-content-center'>
                                    <MDBBtn block className='btn-secondary' onClick={toggleBarcode}>SCAN CODE</MDBBtn>
                                </MDBCol>
                            </MDBRow>



                        </MDBValidationItem>
                        <MDBValidationItem
                            className='mb-5'
                            feedback='User must have a profile photo'
                            invalid
                        >
                            <input type='file' className='form-control' aria-label='file example' />
                        </MDBValidationItem>

                    </MDBCardBody>
                    <MDBCardFooter>
                        <MDBBtn className='mb-1' type='submit' block >
                            Save member
                        </MDBBtn>
                    </MDBCardFooter>
                </MDBValidation>
            </MDBCard>






        </div>
    );
}

export default EditMember;
