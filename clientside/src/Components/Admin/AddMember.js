import { MDBValidationItem, MDBInputGroup, MDBValidation, MDBFile, MDBCheckbox, MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput, MDBTable, MDBTableHead, MDBTableBody, MDBPaginationLink, MDBPaginationItem } from 'mdb-react-ui-kit';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import s_contacts from '../../Services/contacts.service';
import useCache from './../../Storage/useCache';
import BarcodeModal from './BarcodeModal.js'
import { toast } from 'react-toastify'
function AddMember() {
    let location = useLocation();
    const navigate = useNavigate();
    const { members, setMembers } = useCache();


    const [formValue, setFormValue] = useState({ Name: '', Role: '', Phone: '', Age: '', Location: '', Barcode: '' });


    const [showBarcode, setShowBarcode] = useState(false);

    const setBarCode = (code) => {
        console.log('setBarCode ' + code);
        setFormValue({ ...formValue, ['Barcode']: `${code}` });
        toggleBarcode();
    }


    const toggleBarcode = (e) => {

        setShowBarcode(!showBarcode);
    }

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log('add member ' + JSON.stringify(formValue));
        var result = await s_contacts.add(formValue);

        console.log('result ' + JSON.stringify(result));
        if (result && result.data.status == 'SUCCESS') {

            toast.success('Added member succesfully.');
            console.log('insertedId ' + result.data.result.Id);
            formValue.Id = result.data.result.Id;

            if (members && members.length > 0)
                setMembers([formValue, ...members]);
            else {
                setMembers([formValue]);
            }
            navigate('/dashboard/members')
        } else {
            if (result.data.status) {
                toast.error(result.data.message);
            } else
                toast.error("Unknown error!")
        }
    }
    return (

        <div className="d-flex-inline">
            <BarcodeModal setBarCode={setBarCode} showBarcode={showBarcode} setShowBarcode={setShowBarcode} toggleBarcode={toggleBarcode} />

            <MDBRow className='pt-5 pb-3'>
                <MDBCol start>
                    <h2>Add new member</h2>

                </MDBCol>
            </MDBRow>

            <MDBValidation onSubmit={handleSubmit} noValidate={false}>


                <MDBValidationItem
                    className='mb-5'
                    feedback='User must have  a name'
                    invalid
                >
                    <MDBInput label='Name' name="Name" value={formValue.Name} onChange={onChange} required />
                </MDBValidationItem>
                <MDBValidationItem
                    className='mb-5'
                    feedback='User must have a phone'
                    invalid
                >
                    <MDBInput label='Phone' name="Phone" value={formValue.Phone} onChange={onChange} required />
                </MDBValidationItem>
                <MDBValidationItem
                    className='mb-5'
                    feedback='User must have a location'
                    invalid
                >
                    <MDBInput label='Location' name="Location" value={formValue.Location} onChange={onChange} required />
                </MDBValidationItem>

                <MDBValidationItem
                    className='mb-5'
                    feedback='User must have a role'
                    invalid
                >
                    <MDBInput label='Role' name="Role" value={formValue.Role} onChange={onChange} required />
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
                    feedback='User must have a age'
                    invalid
                >
                    <MDBInput type="number" name="Age" label="Age" value={formValue.Age} onChange={onChange} required />
                </MDBValidationItem>

                {/* <MDBValidationItem
                    className='mb-5'
                    feedback='User must have a profile photo'
                    invalid
                >
                    <input type='file' className='form-control' aria-label='file example' />
                </MDBValidationItem> */}

                <MDBBtn className='mb-1' block type='submit'>Add member</MDBBtn>
            </MDBValidation>



        </div>
    );
}

export default AddMember;
