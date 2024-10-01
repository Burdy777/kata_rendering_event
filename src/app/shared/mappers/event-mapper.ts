import { EventGroupingHelper } from './../helpers/event.helpers';
import { EventCalendar } from "../interfaces/event";

export class EventMapper {
    static mapApiToEventGroups = ({events}:any): Array<EventCalendar[]> => EventGroupingHelper.getOverlappingGroups(events);
}