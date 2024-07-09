import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StarwarService {
  private baseUrl = environment.URL;
  currentPage:any=1;
  constructor(private http: HttpClient) { }
  // getCharacters(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/people/`);
  // }
  getByPage(number: any): Observable<any> {
    const params = { page: number }
    return this.http.get(`${this.baseUrl}/people/`, { params }).pipe(shareReplay(1));
  }
  setPage(page:any){
    this.currentPage=page;
  }
  getPage(){
    return this.currentPage;
  }
  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}/`);
  }

  getFilms(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/films/`);
  }
  getFilm(id: any) {
    return this.http.get<any>(`${this.baseUrl}/films/${id}`);
  }

  getSpecies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/species/`);
  }

  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles/`);
  }

  getVehicle(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles/${id}`);
  }


  getStarships(): Observable<any> {
    return this.http.get(`${this.baseUrl}/starships/`);
  }
  getStarship(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/starships/${id}`);
  }

}
function Replay(arg0: number): import("rxjs").OperatorFunction<Object, any> {
  throw new Error('Function not implemented.');
}

