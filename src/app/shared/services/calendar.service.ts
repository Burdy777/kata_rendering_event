import { EventMapper } from './../mappers/event-mapper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { EventCalendar } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  ASSET_URL = '/assets/fixtures/data.json';
  constructor(private http:HttpClient) { }

  getEvents() :Observable<Array<EventCalendar[]>>{
    return this.http.get(this.ASSET_URL).pipe(
     delay(2000), 
     map((event:any) => EventMapper.mapApiToEventGroups(event))
    )
  }
}