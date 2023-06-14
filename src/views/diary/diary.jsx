import React, {useState, useEffect, useCallback, useMemo} from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import mobiscroll, {Eventcalendar, getJson, toast, setOptions, localeEs} from '@mobiscroll/react';

import './diary.css';

const Diary = () => {
    const [myEvents, setEvents] = useState([]);
    const invalids = [{
        start: '12:00',
        end: '13:00',
        title: 'Lunch break',
        type: 'lunch',
        recurring: {
            repeat: 'weekly',
            weekDays: 'MO,TU,WE,TH,FR'
        }
    }];
    const defaultEvents = [{
        id: 1,
        start: '2023-03-08T13:00',
        end: '2023-03-08T13:45',
        title: 'Lunch @ Butcher\'s',
        description: '',
        allDay: false,
        free: true,
        color: '#0F1841',
        background: '#0F1841'
    }, {
        id: 2,
        start: '2023-03-20T15:00',
        end: '2023-03-20T16:00',
        title: 'General orientation',
        description: '',
        allDay: false,
        free: false,
        color: '#0F1841',
        background: '#0F1841'
    }, {
        id: 3,
        start: '2023-03-19T18:00',
        end: '2023-03-19T22:00',
        title: 'Dexter BD',
        description: '',
        allDay: false,
        free: true,
        color: '#0F1841',
        background: '#0F1841'
    }, {
        id: 4,
        start: '2023-03-21T10:30',
        end: '2023-03-21T11:30',
        title: 'Stakeholder mtg.',
        description: '',
        allDay: false,
        free: false,
        color: '#0F1841',
        background: '#0F1841'
    }];

    /*useEffect(() => {
        mobiscroll.util.http.getJson('https://trial.mobiscroll.com//workday-events/?vers=5', (events) => {
            setEvents(events);
        }, 'jsonp');
    }, []);*/

    const onEventCreateFailed = useCallback((event) => {
        if (event.invalid.type === "lunch") {
            toast({
                message: "Can't create this task on lunch break."
            });
        }
    });

    const onEventUpdateFailed = useCallback((event) => {
        if (event.invalid.type === "lunch") {
            toast({
                message: "Can't schedule this task on lunch break."
            });
        }
    });

    const view = useMemo(() => {
        return {
            schedule: {
                type: 'week',
                startDay: 1,
                endDay: 5,
                startTime: '09:00',
                endTime: '18:00'
            }
        };
    }, []);

    return (
        <div className={'containerDiary'}>
            <div className={'containerHeaderDiary'}>
                <select className={'selectDiary'}>
                    <option selected>Dia</option>
                    <option>Semana</option>
                    <option>Mes</option>
                </select>

                <div className={'optionDiary'}>
                    <div className={'workDiary'}></div>
                    <p className={'textOptionDiary'}>Horario laboral</p>
                </div>

                <div className={'optionDiary'}>
                    <div className={'notWorkDiary'}></div>
                    <p className={'textOptionDiary'}>Horario no laboral</p>
                </div>

                <div className={'optionDiary'}>
                    <div className={'partyDiary'}></div>
                    <p className={'textOptionDiary'}>Festivo</p>
                </div>
            </div>
            <Eventcalendar
                className={'calendar'}
                themeVariant="light"
                locale={localeEs}
                newEventText={'Work'}
                event
                dragToCreate={true}
                dragToMove={true}
                colorEventList={true}
                onEventCreate={event => {
                    console.log('NEW EVENT', event)
                }}
                day
                colors={['#0F1841']}
                //invalid={invalids}
                data={defaultEvents}
                view={view}
                onEventCreateFailed={onEventCreateFailed}
                onEventUpdateFailed={onEventUpdateFailed}
            />
        </div>
    )
}

export default Diary;
