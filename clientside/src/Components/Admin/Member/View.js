import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBValidationItem, MDBValidation, MDBFile, MDBCheckbox, MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput, MDBTable, MDBTableHead, MDBTableBody, MDBPaginationLink, MDBPaginationItem
} from 'mdb-react-ui-kit';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import s_contacts from '../../../Services/contacts.service';
import useCache from '../../../Storage/useCache';
function ViewMember() {
    let location = useLocation();
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState(false);

    const {members, setMembers} = useCache();
    
    const toggleDeleteModal = () => setDeleteModal(!deleteModal);



    const member = location.state;

    const deleteContact = async () => {
        console.info('clicked deleteContact');
        await s_contacts.delete(location.state);
        setMembers(members.filter(m => m.Id !== location.state.Id));
        navigate('/dashboard/members/');
    }
    
    const editContact =  () => {
        console.info('clicked editContact');
        navigate('/dashboard/members/edit', {state: location.state});
    }
    return (
        <>
            <MDBRow>
                <MDBCol lg="4">
                    <MDBCard mb="4">
                        <MDBCardBody className='text-center'>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px" }} />

                            <h5 className="my-3">{member.Name}</h5>
                            <p className="text-muted mb-1">{member.Role}</p>

                            <div className="d-flex justify-content-center mb-2 mt-5">
                                <button type="button" className="btn btn-danger" onClick={toggleDeleteModal}>DELETE</button>
                                <button type="button" className="btn btn-outline-primary ms-1" onClick={editContact}>Edit</button>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
                <MDBCol lg="8">
                    <MDBCard mb="4">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol className='col-sm-3'>
                                    <p className='mb-0'>Name</p>
                                </MDBCol>
                                <MDBCol className='col-sm-3'>
                                    <p className='text-muted mb-0'>{member.Name}</p>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol className='col-sm-3'>
                                    <p className='mb-0'>Phone</p>
                                </MDBCol>
                                <MDBCol className='col-sm-6'>
                                    <p className='text-muted mb-0'>{member.Phone}</p>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol className='col-sm-3'>
                                    <p className='mb-0'>Location</p>
                                </MDBCol>
                                <MDBCol className='col-sm-6'>
                                    <p className='text-muted mb-0'>{member.Location}</p>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol className='col-sm-3'>
                                    <p className='mb-0'>role</p>
                                </MDBCol>
                                <MDBCol className='col-sm-6'>
                                    <p className='text-muted mb-0'>{member.Role}</p>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol className='col-sm-3'>
                                    <p className='mb-0'>Age</p>
                                </MDBCol>
                                <MDBCol className='col-sm-6'>
                                    <p className='text-muted mb-0'>{member.Age}</p>
                                </MDBCol>
                            </MDBRow>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>
            <MDBModal show={deleteModal} setShow={setDeleteModal} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Attempt delete</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleDeleteModal}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>Are you sure you want to delete this contact?</MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleDeleteModal}>
                                Close
                            </MDBBtn>
                            <MDBBtn className='btn-danger' onClick={deleteContact}>DELETE</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default ViewMember;
