import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { DisciplineModel } from "../model/discipline.model";

@Injectable({
    providedIn: 'root',
})
export class DisciplineService extends BaseService {
    router: Router;

    constructor(injector: Injector, router: Router) {
        super(injector);
        this.router = router;
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.api_url}/disciplinas`, { headers: this.get_tokens.headers });
    }

    insert(data: any): Observable<any> {
        return this.http.post(`${this.api_url}/disciplinas`, data, { headers: this.get_tokens.headers });
    }

    update(data: DisciplineModel): Observable<any> {
        return this.http.put(`${this.api_url}/disciplinas/${data.name}`, data, { headers: this.get_tokens.headers });
    }

    delete(disciplinaId: number): Observable<any> {
        return this.http.delete(`${this.api_url}/disciplinas/${disciplinaId}`, { headers: this.get_tokens.headers });
    }
}