import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Activity, Client, Page, Role} from './admin-tools-models';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminToolsClientService {
  private baseURL = environment.base_api_url + '/v1';

  constructor(private http: HttpClient) {
  }

  /********************************************** CLIENTS ENDPOINTS ***********************************************/
  getClientsPage(page?: number, size?: number, sort?: string, filter?: string): Observable<Page<Client>> {
    return this.http.get<Page<Client>>(`${this.baseURL}/clients?page=${page}&size=${size}&sort=${sort}&q=${filter ? filter : ''}`);
  }

  getClient(clientId: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseURL}/clients/${clientId}`);
  }

  /********************************************** ROLES ENDPOINTS ***********************************************/
  getRolesPage(page?: number, size?: number, sort?: string, filter?: string): Observable<Page<Role>> {
    return this.http.get<Page<Role>>(`${this.baseURL}/roles?page=${page}&size=${size}&sort=${sort}&q=${filter ? filter : ''}`);
  }

  /********************************************** ACTIVITIES ENDPOINTS ***********************************************/
  getActivitiesPage(page?: number, size?: number, sort?: string, filter?: string): Observable<Page<Activity>> {
    return this.http.get<Page<Activity>>(`${this.baseURL}/activities?page=${page}&size=${size}&sort=${sort}&q=${filter ? filter : ''}`);
  }
}
