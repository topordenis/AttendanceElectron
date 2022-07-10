import React, { useState } from "react";

const CacheContext = React.createContext();

const defaultCache = {
  members: [],
  events: []
};

export const CacheProvider = ({ children, cache }) => {
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [lastEventId, setLastEventId] = useState(-1);
  const [lastMemberId, setLastMemberId] = useState(-1);
  const [eventsFetchCount, setEventsFetchCount] = useState(0);
  const [membersFetchCount, setMembersFetchCount] = useState(0);
  const [attendances, setAttendances] = useState([]);
  const [lastAttendanceId, setLastAttendanceId] = useState(-1);
  const [attendancesFetchCount, setAttendancesFetchCount] = useState(0);

  return (
    <CacheContext.Provider
      value={{
        members: members, setMembers,
        events: events, setEvents,
        attendances: attendances, setAttendances,
        lastEventId, setLastEventId,
        lastMemberId, setLastMemberId,
        lastAttendanceId, setLastAttendanceId,
        eventsFetchCount, setEventsFetchCount,
        membersFetchCount, setMembersFetchCount,
        attendancesFetchCount, setAttendancesFetchCount

      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

export const CacheConsumer = CacheContext.Consumer;
export default CacheContext;