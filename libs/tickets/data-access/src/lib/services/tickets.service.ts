import { Injectable, inject } from "@angular/core";
import { ApiService } from "@mycab/core/http-client";
import { Ticket } from "../models/ticket";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TicketsService {
  private readonly apiService = inject(ApiService);

  getTickets(): Observable<Ticket[]> {
    return this.apiService.get<Ticket[]>('/tickets');
  }

  getTicket(id: number): Observable<Ticket> {
    return this.apiService.get<Ticket>('/tickets/' + id);
  }

  deleteTicket(id: number): Observable<void> {
    return this.apiService.delete<void>('/tickets/' + id);
  }

}
