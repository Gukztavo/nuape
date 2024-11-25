import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root',
})
export class ProfessorService extends BaseService {

    router: Router;

    constructor(injector: Injector, router: Router) {
        super(injector);
        this.router = router;
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.api_url}/professor`, { headers: this.get_tokens.headers });
    }
}