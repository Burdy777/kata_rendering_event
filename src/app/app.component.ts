import { CalendarService } from './shared/services/calendar.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { tap } from 'rxjs';
import { EventCalendar } from './shared/interfaces/event';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {  
  events!:Array<EventCalendar[]> 
  constructor(private calendarService:CalendarService){}

  ngOnInit(){
     this.calendarService.getEvents().pipe(
      tap((event)=> this.events = event )).subscribe();
  }
 
 
}
