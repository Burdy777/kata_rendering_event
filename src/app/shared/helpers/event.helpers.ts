import { EventCalendar } from "../interfaces/event";

export class EventGroupingHelper {

 // get overlapping event group   
 static getOverlappingGroups(events: EventCalendar[]) {
    if(events.length === 0) return [];
    const groups: Array<EventCalendar[]> = [];
    events.sort((a, b) => this.getTimeInMinutes(a.start) - this.getTimeInMinutes(b.start));

    let currentGroup = [events[0]];

    for (let i = 1; i < events.length; i++) {
      const lastEventInGroup = currentGroup[currentGroup.length - 1];
      // put overlapping events in the same group otherwise create a new group
      if (this.doEventsOverlap(lastEventInGroup, events[i])) {
        currentGroup.push(events[i]);
      } else {
        groups.push(currentGroup);
        currentGroup = [events[i]];
      }
    }
    groups.push(currentGroup); 
    return groups;
    }

    // determine if the events are on the same time slot or not
    static doEventsOverlap(eventA: any, eventB: any) {
        const startA = this.getTimeInMinutes(eventA.start);
        const endA = startA + eventA.duration;
        const startB = this.getTimeInMinutes(eventB.start);
        return startB < endA;
    }

    static getTimeInMinutes(time: string) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }
}