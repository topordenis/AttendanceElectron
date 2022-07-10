import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter, MDBIcon, MDBDropdownToggle, MDBDropdownMenu, MDBRow, MDBBtn, MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownLink, MDBContainer, MDBInput, MDBTable, MDBTableHead, MDBTableBody, MDBPaginationLink, MDBPaginationItem
} from 'mdb-react-ui-kit';
import { useEffect, useState, createContext, useContext } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom'
import s_contacts from '../../Services/contacts.service';
import InfiniteScroll from "react-infinite-scroll-component";
import useCache from '../../Storage/useCache';
import { toast } from 'react-toastify';

function Member(data) {

  const navigate = useNavigate();


  const { member, modalToggle } = data;

  const editMember = () => {
    console.info('clicked editMember');
    navigate('/dashboard/members/edit', { state: member });
  }
  const viewMember = () => {
    console.info('clicked viewMember ' + JSON.stringify(member));
    navigate('/dashboard/members/view', { state: member });
  }

  return (<tr>
    <th scope='row'>{member.Id}</th>
    <td>{member.Name}</td>
    <td>{member.Phone}</td>
    <td><MDBDropdown group>
      <MDBDropdownToggle color='primary'>Action</MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem>
          <MDBDropdownLink onClick={viewMember}>View</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink onClick={editMember}>Edit</MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <MDBDropdownLink onClick={() => { modalToggle(member.Id) }}>Delete</MDBDropdownLink>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown></td>
  </tr>);
}
function Members() {
  let location = useLocation();

  const { members, setMembers, lastMemberId, setLastMemberId } = useCache();

  const [searchName, setSearchName] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);
  const [IdModal, setIdModal] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [updatedQuery, setUpdatedQuery] = useState(false)
  const [membersFetchCount, setMembersFetchCount] = useState(0);
  const toggleDeleteModal = (Id) => {
    console.log('toggleDeleteModal ' + Id);
    setDeleteModal(!deleteModal);
    setIdModal(Id);

  };

  const fetchData = async () => {

    if (members.length !== 0 && membersFetchCount == 0) {
      setMembersFetchCount(membersFetchCount + 1);
      console.log('skipped fetch');
      return;
    }
    setMembersFetchCount(membersFetchCount + 1);

    console.log('fetch lastMemberId ' + lastMemberId);
    const response = await s_contacts.searchByName(searchName, updatedQuery ? -1 : lastMemberId);

    if (updatedQuery) {
      console.log('updated query');
      setLastMemberId(-1);
      setMembers([]);
      setUpdatedQuery(false);
      console.log('rsponse ' + JSON.stringify(response));
      setLastMemberId(response.data.result.length == 0 ? -1 : response.data.result[response.data.result.length - 1].Id);
      setMembers(response.data.result);
      return;
    }
    if (response.data.result.length > 0) {
      setLastMemberId(response.data.result[response.data.result.length - 1].Id);

      if (members == undefined)
        setMembers(response.data.result);
      else
        setMembers([...members, ...response.data.result]);
    }

  }

  const deleteContact = async () => {
    setMembers(members.filter(m => m.Id !== IdModal));
    await s_contacts.delete({ Id: IdModal });
    toast.info('Deleted member succesfully.');
    toggleDeleteModal(null);
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
        <MDBCol start>
          <h2>Members</h2>

        </MDBCol>
        <MDBCol className='d-flex justify-content-end' end>
          <MDBInput label='Search member' value={searchName} onChange={onUpdateQuery} type='text' className='ml-3'></MDBInput>
          <MDBBtn floating href='#/Dashboard/Members/Add' className='ripple ripple-surface ripple-surface-light btn btn-primary ms-3' tag='a'>
            <MDBIcon fas icon='plus' />
          </MDBBtn>
        </MDBCol>
      </MDBRow>

      <InfiniteScroll
        dataLength={members !== undefined ? members.length : 0}
        next={fetchData}
        hasMore={true}
        loader={<h4></h4>}>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Phonenumber</th>
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>

            {members ? members.map((i, index) => (
              <Member member={i} modalToggle={toggleDeleteModal} key={index} />
            )) : null}

          </MDBTableBody>

        </MDBTable>
      </InfiniteScroll>
      
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
    </div>
  );
}

export default Members;
