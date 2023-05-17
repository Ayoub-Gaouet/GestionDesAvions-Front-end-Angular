import { Company } from '../model/company.model';
import { Injectable } from '@angular/core';
import { Avion } from '../model/avion.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import {AuthService} from "./auth.service";
import {Image} from "../model/image.model";

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class AvionService {
  avions! : Avion[];
  avion! : Avion[];
  company! :Company[];
  constructor(private http : HttpClient
  ,private authService:AuthService) {
  }

  listeCompany():Observable<Company[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Company[]>(apiURL+"/com", {headers:httpHeaders});
  }
  consulterCompany(id:number): Company{
    return this.company.find(com => com.idCom == id)!;
  }
  listeAvions(): Observable<Avion[]> {
    return this.http.get<Avion[]>(apiURL+"/all");

  }
  ajouterAvion(av: Avion): Observable<Avion> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Avion>(apiURL+"/addav", av, {headers:httpHeaders});
  }

  supprimerAvion(id: number) {
    const url = `${apiURL}/delav/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});

  }

  consulterAvion(id: number): Observable<Avion> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Avion>(url,{headers:httpHeaders});
  }
  updateAvion(prod: Avion): Observable<Avion> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Avion>(apiURL+"/updateav", prod, {headers:httpHeaders});  }
  rechercherParCompany(idCom: number):Observable<Avion[]> {
    const url = `${apiURL}/avcom/${idCom}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Avion[]>(url, {headers:httpHeaders});
  }
  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
  uploadImageAv(file: File, filename: string, idAv:number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uplaodImageAv'}/${idAv}`;
    return this.http.post(url, imageFormData);
  }
  supprimerImage(id : number) {
    const url = `${apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
  uploadImageFS(file: File, filename: string, idAv : number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uploadFS'}/${idAv}`;
    return this.http.post(url, imageFormData);
  }
}
