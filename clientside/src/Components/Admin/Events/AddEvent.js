import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBValidationItem, MDBValidation, MDBFile, MDBCheckbox, MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput, MDBTable, MDBTableHead, MDBTableBody, MDBPaginationLink, MDBPaginationItem } from 'mdb-react-ui-kit';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import s_events from '../../../Services/events.service';
import useCache from '../../../Storage/useCache';
import { ToastContainer, toast } from 'react-toastify';
function AddEventPage() {


    let location = useLocation();

    const navigate = useNavigate();

    const [formValue, setFormValue] = useState([]);
    const { events, setEvents } = useCache();
    
    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const saveEvent = async () => {

        const result = await s_events.add(formValue);
        if (result && result.data) {

            setEvents([formValue, ...events]);


            navigate('/dashboard/events/');
        }
        else
            toast("Error!");
    }

    return (
        <div className="d-flex-inline">

            <MDBCard alignment='center'>
                <MDBCardHeader>Add new event</MDBCardHeader>
                <MDBCardBody>

                    <MDBValidation noValidate={false} onSubmit={saveEvent}>

                        <MDBValidationItem className='mb-5' feedback='Event must have a Title' invalid>
                            <MDBInput type='text' label='Title' name="Title" value={formValue.Title} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className='mb-5' feedback='Event must have a Event_Category' invalid>
                            <MDBInput type='text' label='Event_Category' name="Event_Category" value={formValue.Event_Category} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBInput wrapperClass='mb-5' textarea="true" name="ABACAEvent" maxLength={1000} value={formValue.ABACAEvent} onChange={onChange} rows={4} label='ABACAEvent' />
                        <MDBValidationItem className='mb-5' feedback='Event must have a FromDay' invalid>
                            <MDBInput type='text' label='From Day' name="FromDay" value={formValue.FromDay} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className='mb-5' feedback='Event must have a ToDay' invalid>
                            <MDBInput type='text' label='To Day' name="ToDay" value={formValue.ToDay} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className='mb-5' feedback='Event must have a Month' invalid>
                            <MDBInput type='text' label='Month' name="Month" value={formValue.Month} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className='mb-5' feedback='Event must have a Year' invalid>
                            <MDBInput type='text' label='Year' name="Year" value={formValue.Year} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className='mb-5' feedback='Event must have a SheduleTime' invalid>
                            <MDBInput type='text' label='Shedule Time' name="SheduleTime" value={formValue.SheduleTime} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className='mb-5' feedback='Event must have a Organizer' invalid>
                            <MDBInput type='text' label='Organizer' name="Organizer" value={formValue.Organizer} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className='mb-5' feedback='Event must have a Venue' invalid>
                            <MDBInput type='text' label='Venue' name="Venue" value={formValue.Venue} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className='mb-5' feedback='Event must have a Venue' invalid>
                            <MDBInput type='text' label='Banner' name="Banner" value={formValue.Banner} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className='mb-5' feedback='Event must have a Fee' invalid>
                            <MDBInput type='text' label='Fee' name="Fee" value={formValue.Fee} onChange={onChange} required />
                        </MDBValidationItem>
                        <MDBBtn type='submit' block>
                            Save event
                        </MDBBtn>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>

                </MDBCardFooter>
            </MDBCard>






        </div >
    );
}

export default AddEventPage;
