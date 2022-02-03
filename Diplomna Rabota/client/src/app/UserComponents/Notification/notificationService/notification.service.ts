import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  findAllUrl = environment.apiUrl +"/notification/findAll"
  constructor() { }

}
