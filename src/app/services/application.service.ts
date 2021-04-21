import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Permission } from '../interfaces/permission';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClient: HttpClient) { 
   
  }

  getAll(){
    return this.httpClient.get(`${environment.apiUrl}/Permission`, { headers: {'Content-Type': 'application/json'} });
  }

  getById(id){
    return this.httpClient.get(`${environment.apiUrl}/Permission/${id}`, { headers: {'Content-Type': 'application/json'} });
  }

  getAllTypes(){
    return this.httpClient.get(`${environment.apiUrl}/PermissionType`, { headers: {'Content-Type': 'application/json'} });
  }

  getType(id){
    return this.httpClient.get(`${environment.apiUrl}/PermissionType/${id}`, { headers: {'Content-Type': 'application/json'} });
  }

  create(permission: Permission){
    return this.httpClient.post(`${environment.apiUrl}/Permission`, permission, { headers: {'Content-Type': 'application/json'} });
  }

  update(permission: Permission){
    return this.httpClient.put(`${environment.apiUrl}/Permission/${permission.id}`, permission, { headers: {'Content-Type': 'application/json'} });
  }

  delete(id){
    return this.httpClient.delete(`${environment.apiUrl}/Permission/${id}`, { headers: {'Content-Type': 'application/json'} });
  }
}
