import { Injectable, Injector } from "@angular/core";
import { BaseService } from "./base.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class StudentService extends BaseService {
    router: Router;

    constructor(injector: Injector, router: Router) {
        super(injector);
        this.router = router;
    }

    insert(data: any): Observable<any> {
        return this.http.post(`${this.api_url}/student`, data, { headers: this.getHttpHeaders() });
    }

    getHttpHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken');

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }
}  