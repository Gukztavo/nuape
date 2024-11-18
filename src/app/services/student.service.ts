import { Injectable, Injector } from "@angular/core";
import { BaseService } from "./base.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { FileModel } from "../model/file.model";
import { StudentModel } from "../model/student.model";

@Injectable({
    providedIn: 'root',
})
export class StudentService extends BaseService {
    router: Router;

    constructor(injector: Injector, router: Router) {
        super(injector);
        this.router = router;
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.api_url}/student`, { headers: this.get_tokens.headers });
    }

    insert(data: any): Observable<any> {
        return this.http.post(`${this.api_url}/student`, data, { headers: this.get_tokens.headers });
    }

    update(data: StudentModel): Observable<any> {
        return this.http.put(`${this.api_url}/student/${data.id}`, data, { headers: this.get_tokens.headers });
    }

    delete(studentId: number): Observable<any> {
        return this.http.delete(`${this.api_url}/student/${studentId}`, { headers: this.get_tokens.headers });
    }

    insertAlunoPdf(data: FormData): Observable<any> {
        return this.http.post(`${this.api_url}/store-pdf`, data, { headers: this.get_tokens.headers });
    }
}  