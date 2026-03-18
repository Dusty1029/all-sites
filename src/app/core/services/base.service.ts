import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BaseService<T, Y> {
    private readonly baseApiUrl = 'http://192.168.0.138:7212/api/v1/party';

    protected http = inject(HttpClient);

    // GET all items
    protected getAll(url: string, params?: HttpParams): Observable<T[]> {
        return this.http.get<T[]>(`${this.baseApiUrl}${url}`, { params }).pipe(catchError(this.handleError));
    }

    // GET single item by id
    protected getById(url: string): Observable<T> {
        return this.http.get<T>(`${this.baseApiUrl}${url}`).pipe(catchError(this.handleError));
    }

    // POST new item
    protected create(url: string, item: Y): Observable<string> {
        return this.http.post<string>(`${this.baseApiUrl}${url}`, item).pipe(catchError(this.handleError));
    }

    // PUT update item
    protected update(url: string, item?: Y): Observable<T> {
        return this.http.put<T>(`${this.baseApiUrl}${url}`, item).pipe(catchError(this.handleError));
    }

    // DELETE item
    protected delete(url: string): Observable<void> {
        return this.http.delete<void>(`${this.baseApiUrl}${url}`).pipe(catchError(this.handleError));
    }

    // Gestion centralisée des erreurs
    protected handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Une erreur est survenue';
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            errorMessage = `Erreur: ${error.error.message}`;
        } else {
            // Erreur côté serveur
            errorMessage = `Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
