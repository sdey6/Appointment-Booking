import {Injectable} from '@angular/core';
	
	@Injectable({
		providedIn:'root'
	})
	export class AppointmentsService{
		private BASE_URL=environment.API_URL;
		constructor(private http: HttpClient){ }
		
		getAppointment():Observable<Appointment[]>{
			return this.http.get<Appointment[]>('${this.BASE_URL}/appoitments')
		}

		createAppointment(name:string,appointmentDate:string,reason:string):Observable<Appointment>{
			return this.http.post<Appointment>('${this.BASE_URL}/appoitments',
			{name,appointmentDate,reason});}}

		cancelAppointment(id:string):Observable<any>{
			return this.http.delete('${this.BASE_URL}/appoitments/${id}');
		}