import {Component, OnInit} from '@angular/core';
import {AdminToolsClientService} from '../admin-tools.client.service';
import {Activity, Client, Page} from '../admin-tools-models';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  client: Client= new Client();
  viewMode: boolean = false;
  editMode: boolean = false;
  newMode: boolean = false;
  activities: Activity[];

  constructor(private clientManagementClientService: AdminToolsClientService) {
  }

  ngOnInit() {
    if(history.state.view) {
      this.viewMode = true;
      this.loadClient();

    } else if(history.state.edit) {
      this.editMode = true;
      this.loadClient();
      this.loadActivities();

    } else if(history.state.new) {
      this.newMode = true;
      this.client = new Client();
      this.loadActivities();
    }
  }

  editClient() {
    this.loadActivities();
    this.viewMode = false;
    this.newMode = false;
    this.editMode = true;
  }

  deleteClient() {

  }

  private loadClient() {
    this.clientManagementClientService.getClient(history.state.data).subscribe((client: Client) => {
      this.client = client;
    });
  }

  private loadActivities() {
    this.clientManagementClientService.getActivitiesPage(0, 1000, '').subscribe((activitiesPage: Page<Activity>) => {
      this.activities = activitiesPage.content;

      if(this.editMode) {
        let currentActivityIndex = this.activities.indexOf(this.client.activity, 0);
        this.activities.splice(currentActivityIndex, 1);
      }
    });
  }
}

