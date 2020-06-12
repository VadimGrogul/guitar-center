import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Guitar } from "../interfaces/guitar.interface";

@Injectable({
  providedIn: 'root'
})
export class GuitarsService {

  constructor(private _http: HttpClient) { }

  getGuitars(): Observable<Guitar[]> {
    return this._http.get<Guitar[]>(`${environment.dbUrl}/guitars.json`)
      .pipe(
        map(res => {
          return  Object.keys(res)
            .map(key => ({
              ...res[key],
              reviews: Object.keys(res[key].reviews)
                .map(key2 => {
                  return {
                    ...res[key].reviews[key2],
                    id: key2
                  }
                }),
              id: key
            }));
        })
      )
  }

  getGuitarById(id): Observable<Guitar> {
    return this._http.get<Guitar>(`${environment.dbUrl}/guitars/${id}.json`)
      .pipe(
        map(guitar => {
          return {
            ...guitar,
            id: id,
            reviews: Object.keys(guitar.reviews)
              .map(key => {
                return {
                  ...guitar.reviews[key],
                  id: key
                }
              })
          }
        })
      )
  }

  postGuitar(guitar: Guitar) {
    this._http.post(`${environment.dbUrl}/guitars.json`, guitar);
  }
}
