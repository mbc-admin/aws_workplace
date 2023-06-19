import React, {useState, useEffect, useCallback, useMemo} from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import mobiscroll, {Eventcalendar, getJson, toast, setOptions, localeEs, momentTimezone} from '@mobiscroll/react';
import * as moment from 'moment';

import {getCalendar, getHolidaysDays} from '../../services/user.service';

momentTimezone.moment = moment;

import './diary.css';


setOptions({
    locale: localeEs,
    theme: 'ios',
    themeVariant: 'light'
});

const Diary = () => {
    const [typeCalendar, setTypeCalendar] = useState('week');
    const [myEvents, setMyEvents] = useState([]);
    const [invalidDays, setInvalidDays] = useState([]);
    const invalids = [{
        start: '06:00',
        end: '22:00',
        title: 'Fin de semana',
        //type: 'lunch',
        recurring: {
            repeat: 'weekly',
            weekDays: 'SA,SU'
        }
    }];
    const defaultEvents = [{
        id: 1,
        start: '2023-04-18T13:00',
        end: '2023-04-18T13:45',
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

    useEffect(() => {
        getCalendar(8).then(res => {
            let events = [];
            res.data.map(event => {
                console.log('EVENT', event);
                events.push(event.recurring);
            })
            setMyEvents(events);
        }).catch(err => {
            console.log('ERROR al recoger los eventos del calendario', err);
        })

        getHolidaysDays().then(res => {
            console.log('Vacaciones recogidas con exito', res.data);
            let invalids = [];
            res.data.map(invalid => {
                invalid.title = 'Festivo';
                invalids.push(invalid);
            })
            setInvalidDays(invalids);
        }).catch(err => {
            console.log('ERROR al recoger las vacaciones', err);
        })
    }, []);

    /*const view = useMemo(() => {
        return {
            schedule: {
                type: typeCalendar,
                startDay: 1,
                endDay: 0,
                startTime: '06:00',
                endTime: '22:00',
            }
        };
    }, []);*/

    return (
        <div className={'containerDiary'}>
            <div className={'containerHeaderDiary'}>
                <select
                    className={'selectDiary'}
                    onChange={value => setTypeCalendar(value.target.value)}
                >
                    <option value={'day'}>Dia</option>
                    <option value={'week'} selected>Semana</option>
                    <option value={'month'}>Mes</option>
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
                newEventText={'Work'}
                event
                dragToCreate={false}
                clickToCreate={false}
                dragToMove={false}
                colorEventList={true}
                day
                colors={['#0F1841']}
                invalid={invalidDays}
                data={myEvents}
                view={{
                    schedule: {
                        type: typeCalendar,
                        startDay: 1,
                        endDay: 0,
                        startTime: '06:00',
                        endTime: '22:00',
                    }
                }}
            />
        </div>
    )
}

export default Diary;
