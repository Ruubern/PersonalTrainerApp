import { useState, useEffect } from "react";
import type { Training } from "../types";
import { getTrainingSessions } from "../trainingApi";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CalendarEvent } from "../types";


    export default function SessionCalendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);


    useEffect(() => {
        getTrainingSessions()
            .then((trainings: Training[]) => {
                
                const calendarEvents: CalendarEvent[] = trainings.map(session => ({
                    id: session.id.toString(),
                    title: `${session.activity} w/ ${session.customer.firstname} ${session.customer.lastname}`,
                    start: new Date(session.date).toISOString(),
                    end: new Date(new Date(session.date).setMinutes(new Date(session.date).getMinutes() + session.duration)).toISOString(),
                }));
                setEvents(calendarEvents);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"

                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                height="auto"
            />
        </div>
    );
}