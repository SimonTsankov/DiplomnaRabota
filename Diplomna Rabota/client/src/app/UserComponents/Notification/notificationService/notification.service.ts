import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import{Notification} from "../../../model/Notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  findAllUrl = environment.apiUrl +"notifications/findAll"
  read = environment.apiUrl +"notifications/read"

  constructor(private http: HttpClient) { }

  getAllNotifications(){
    return this.http.get<Notification[]>(this.findAllUrl);
  }
  async markNotificationAsRead(id: number) {
    return await this.http.put(this.read+"?id="+id,"",{responseType:"text"}).toPromise()
  }
}
