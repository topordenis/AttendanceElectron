
import { MDBCard, MDBCardBody, MDBIcon, MDBTypography, MDBDropdownToggle, MDBDropdownMenu, MDBRow, MDBBtn, MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownLink, MDBContainer, MDBInput, MDBTable, MDBTableHead, MDBTableBody, MDBPaginationLink, MDBPaginationItem } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom'
import s_events from '../../../Services/events.service';
import InfiniteScroll from "react-infinite-scroll-component";
import useCache from '../../../Storage/useCache';


function Event(props) {
    const { ev } = props;
    const navigate = useNavigate();
    const { id } = useParams();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const getMonthName = (date) => {

        return date.toLocaleString('default', { month: 'long' });
    }
    const getYear = () => {

        var StartDate = new Date(ev.StartDate);
        var EndDate = new Date(ev.EndDate);
        if (StartDate.getFullYear() == EndDate.getFullYear())
            return EndDate.getFullYear();
        else
            return StartDate.getFullYear() + "-" + EndDate.getFullYear();
    }
    const getDays = () => {

        var StartDate = new Date(ev.StartDate);
        var EndDate = new Date(ev.EndDate);
        if (StartDate.getDay() == EndDate.getDay() && StartDate.getMonth() == EndDate.getMonth())
            return (parseInt(EndDate.getDay()) + 1) + " " + getMonthName(EndDate);
        else if (StartDate.getMonth() == EndDate.getMonth())
            return (parseInt(StartDate.getDay()) + 1) + "-" + (parseInt(EndDate.getDay()) + 1) + " " + getMonthName(EndDate);
    }
    const editEvent = () => {
        console.info('clicked editEvent');
        navigate('/dashboard/events/edit', { state: ev });
    }
    const viewEvent = () => {
        console.info('clicked viewEvent ' + JSON.stringify(ev));
        navigate('/dashboard/events/attendance', { state: ev });
    }

    return <MDBRow className='m-5'>
        <MDBCol start sm={'2'} className='col-sm-2 d-flex-row align-items-sm-center justify-content-center'>
            <h5 className='text-center'>
                <span className='text-danger m-1'>{ev.FromDay} {ev.ToDay}</span>

            </h5>
            <h5 className='text-center'>
                <span className='text-danger m-1'>{ev.Month}</span>
            </h5>
            <h5 className='text-center'>
                <span className='text-disabled m-1'>{ev.Year}</span>
            </h5>
        </MDBCol>
        <MDBCol>

            <h3>{ev.Title}</h3>
            <p>{ev.FromDay},{ev.ToDay} {ev.Month}, {ev.Year} @ {ev.SheduleTime}</p>
            {ev.Venue ? <p className='mb-1 text-primary'>{ev.Venue}</p> : null}
            {ev.ABACAEvent ? <p>{ev.ABACAEvent}</p> : null}
           
        </MDBCol>
        <MDBRow end>
            <MDBCol className='d-flex flex-row justify-content-end'>
                <MDBBtn className='m-1' onClick={viewEvent} >
                    View attendance
                </MDBBtn>
                <MDBBtn className='m-1' type='submit' onClick={editEvent}>
                    Edit event
                </MDBBtn>
            </MDBCol>
        </MDBRow>
    </MDBRow>
}


function Events() {
    let location = useLocation();
    const [loading, setLoading] = useState(false);
    const { events, setEvents, lastEventId, setLastEventId } = useCache();
    const [searchName, setSearchName] = useState('');
    const [updatedQuery, setUpdatedQuery] = useState(false);
    const [eventsFetchCount, setEventsFetchCount] = useState(0);

    const fetchData = async () => {

        if (events.length !== 0 && eventsFetchCount == 0) {
            setEventsFetchCount(eventsFetchCount + 1);

            return;
        }
        setEventsFetchCount(eventsFetchCount + 1);

        const response = await s_events.searchByName(searchName, updatedQuery ? -1 : lastEventId);

        if (updatedQuery) {

            setLastEventId(-1);
            setEvents([]);
            setUpdatedQuery(false);
            console.log('rsponse ' + JSON.stringify(response));
            setLastEventId(response.data.result.length == 0 ? -1 : response.data.result[response.data.result.length - 1].Id);
            setEvents(response.data.result);
            return;
        }
        if (response.data.result.length > 0) {
            setLastEventId(response.data.result[response.data.result.length - 1].Id);

            if (events == undefined)
                setEvents(response.data.result);
            else
                setEvents([...events, ...response.data.result]);
        }

    }
    useEffect(() => {

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
    return (

        <div className="d-flex-inline">

            <MDBRow>
                <MDBCol sm={'2'}>
                    <h2>Events</h2>

                </MDBCol>
                <MDBCol className='col-dd-flex d-flex justify-content-end' end>
                    <MDBInput value={searchName} label='Search event by name' type='text' className='ml-3' onChange={onUpdateQuery}></MDBInput>
                    <MDBBtn floating href='#/Dashboard/Events/Add' className='ripple ripple-surface ripple-surface-light btn btn-primary ms-3' tag='a'>
                        <MDBIcon fas icon='plus' />
                    </MDBBtn>
                </MDBCol>
            </MDBRow>


            <InfiniteScroll
                dataLength={events ? events.length : 0}
                next={fetchData}
                hasMore={true}
                loader={null}>
                {events ? events.map((i, index) => (
                    <Event ev={i} key={index} />
                )) : null}
            </InfiniteScroll>
        </div>
    );
}

export default Events;
