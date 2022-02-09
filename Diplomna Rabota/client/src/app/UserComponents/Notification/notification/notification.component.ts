import { Component, OnInit } from '@angular/core';
import {Notification} from "../../../model/Notification";
import {NotificationService} from "../notificationService/notification.service";
import {MenuItem, SelectItem} from "primeng/api";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications : Notification[] = []
  listItems: SelectItem[];
  selectedItem: any;
  display= false;

  constructor(private notificationService: NotificationService, private router: Router) {
    this.listItems = [{label: 'pi pi-check', value: 'v1'}, {label: 'pi pi-check', value: 'v2'}];

  }

  ngOnInit(): void {
    this.refreshNotifications()
  }

  refreshNotifications(){
    this.notificationService.getAllNotifications().subscribe(data =>{
      this.notifications = data;
    })
  }

  async read(id: number) {
    await this.notificationService.markNotificationAsRead(id)
    this.refreshNotifications();
  }

  openAddDialog(notification: any) {
    console.log(notification)
    window.location.replace(environment.url+"/add-to-playlist?id="+notification.song.track_id)
  }
}
