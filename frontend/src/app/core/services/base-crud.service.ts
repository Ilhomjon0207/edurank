import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@/environments/environment';

export abstract class BaseCrudService<T, CreateDto, UpdateDto> {
    protected readonly http = inject(HttpClient);
    protected readonly apiUrl = environment.apiUrl;

    constructor(protected readonly endpoint: string) {}

    getAll() {
        return this.http.get<T[]>(`${this.apiUrl}${this.endpoint}`);
    }

    getById(id: number | string) {
        return this.http.get<T>(`${this.apiUrl}${this.endpoint}/${id}`);
    }

    create(dto: CreateDto) {
        return this.http.post<T>(`${this.apiUrl}${this.endpoint}`, dto);
    }

    update(id: number | string, dto: UpdateDto) {
        return this.http.patch<T>(`${this.apiUrl}${this.endpoint}/${id}`, dto);
    }

    delete(id: number | string) {
        return this.http.delete<void>(`${this.apiUrl}${this.endpoint}/${id}`);
    }
}
