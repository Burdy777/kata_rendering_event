import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PositionStyle } from '../../shared/interfaces/positionStyle';
import { CALENDAR_HOURS, HOUR_IN_MINUTES } from '../../shared/constants/calendar-constant';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgStyle, NgFor, NgIf],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent{
  @Input({alias:'events'}) overlappingGroups :any = [];
  hours = CALENDAR_HOURS;


  // Calculate events style css
  calculateEventStyle(event: any, groupSize: number, positionInGroup: number): PositionStyle {
    const calendarStart = 9;
    const calendarEnd = 21; 
    
    const calendarHeight = window.innerHeight + 10;

    //Convert in minutes
    const [startHour, startMinutes] = event.start.split(':').map(Number); 
    const eventStartInMinutes = (startHour * HOUR_IN_MINUTES + startMinutes) - (calendarStart * HOUR_IN_MINUTES);
    
    // Position event
    const top = (eventStartInMinutes / ((calendarEnd - calendarStart) * HOUR_IN_MINUTES)) * calendarHeight;
    const height = (event.duration / ((calendarEnd - calendarStart) * HOUR_IN_MINUTES)) * calendarHeight;

    // Calcul width and position
    const width = `calc(${100 / groupSize}% - 10px)`; 
    const left = `calc(${(positionInGroup * 100) / groupSize}%)`;

    return {
      top: `${top}px`,
      height: `${height}px`,
      width,
      left,
    };
  }


}