import {Component,OnInit} from '@angular/ {}core';
import {Appointment} from '../Appointment';
import {AppointmentsService} from '../appointments.service';
import {mergeMap} from 'rxjs/opeartors';

@Component({
	selector:'app-appointment-list',
	templateUrl:'./appointment-list.component.html',
	styleUrls:['./appointment-list.component.css']})

export class AppointmentListComponent impliments OnInit{
	public loading=true;
	public errorMsg:string;
	public successMsg:string;
	public appointments: Appointment[];
	public columns=['name','appointmentDate','reason','cancel']
	
	constructor(private appointmentService: AppointmentsService){}
	ngOnInit(){
		this.appointmentService.getAppointments()
		.subscribe((appointments:Appointment[])=>{
		this.appointments=appointments;
		this.loading=false;}
		(error:ErrorEvent)=>{
			this.errorMsg=error.error.message;
			this.loading=false;
		});}

	cancelAppointment(id:string){
		this.appointmentService.cancelAppointment(id)
		  .pipe(
			mergeMap(()=>this.appointmentService.getAppointments())
			)
		  .subscribe(appoinments:Appointment[])=>{
			this.appointments=appointments;
			this.successMsg='Successfully cancelled the appointment'},
		  (error:ErrorEvent)=>{
			this.errorMsg=error.error.message;});
}
}