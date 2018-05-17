import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import {  difference } from 'set-manipulator';

import { Devotee, ServiceArea, DevoteeServiceInterest  } from '../../shared/sdk/models';
import { ServiceAreaApi, DevoteeServiceInterestApi } from '../../shared/sdk';
import { DevoteeSearchSelectService, NotificationService } from '../../shared/services';
import { Subscription } from 'rxjs/Subscription';
import {LoopBackFilter} from '../../shared/sdk/models/BaseModels';

@Component({
  selector: 'app-devotee-service-interest',
  templateUrl: './devotee-service-interest.component.html',
  styleUrls: ['./devotee-service-interest.component.css']
})
export class DevoteeServiceInterestComponent implements OnInit, OnDestroy {
  @Input() devoteeId: String = ' ';
  loopBackFilter: LoopBackFilter = {};

  devotee: Devotee;
  one$ = new Subscription();
  two$ = new Subscription();
  three$ = new Subscription();
  four$ = new Subscription();
  five$ = new Subscription();

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  model = {name: 'test'};

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  
  allServices = [];
  assignedServices = [];
  remainingServices = [];

  constructor(
    private notificationService: NotificationService,
    private devoteeServiceInterestApi: DevoteeServiceInterestApi,
    private devoteeSearchSelectService: DevoteeSearchSelectService,
    private serviceAreaApi: ServiceAreaApi
  ) { }

  ngOnInit() {
    this.loadDevoteeServices(this.devoteeId);
    this.one$ = this.devoteeSearchSelectService.missionAnnounced$.
    subscribe(
      selectedDevotee => {
        this.loadDevoteeServices(selectedDevotee.id);
        this.devotee = selectedDevotee;
        this.devoteeId = selectedDevotee.id;
      }
    );
  }

  loadAllServices() {
    //this.loopBackFilter.where = {'startTime': {gte: new Date()}};
    //this.loopBackFilter.include = ['fkDepartmentAnnouncementDepartment1rel'];
    this.loopBackFilter.order = ['serviceName ASC'];
    this.two$ =  this.serviceAreaApi.find<ServiceArea>(this.loopBackFilter)
    .subscribe(
      allServices => {
        this.allServices =  allServices;
        this.remainingServices = difference(this.allServices, this.assignedServices, (object) => object.id);
      }
    );
  }

  loadDevoteeServices(devoteeId: String) {
    this.three$ =  this.devoteeServiceInterestApi.find<DevoteeServiceInterest>(
      {
        where: {devoteeId: devoteeId},
        include: {
          relation: 'fkDevoteeServiceInterestServiceArea1rel'
        }
      }
    )
    .subscribe(
      devoteeServices => {
        this.assignedServices = devoteeServices.map((service) => service.fkDevoteeServiceInterestServiceArea1rel);
        this.loadAllServices();
      }
    );
  }

  displayFn(service?: ServiceArea): string | undefined {
    return service ? service.serviceName : '';
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    let value = event.option.value;
    this.four$ =  this.devoteeServiceInterestApi.create({devoteeId: this.devoteeId, serviceAreaId: value.id })
    .subscribe(
      devoteeService => {
       this.assignedServices.push(new ServiceArea(value));
       this.remainingServices = difference(this.allServices, this.assignedServices, (object) => object.id);
       this.notificationService.notificationSubject.next('Service added successfully');
      }
    );
  }


  remove(serviceArea: ServiceArea): void {
    let index = this.assignedServices.indexOf(serviceArea);
    this.five$ =  this.devoteeServiceInterestApi.destroyAll({devoteeId: this.devoteeId, id: serviceArea.id })
    .subscribe(
      devoteeService => {
        let index = this.assignedServices.indexOf(serviceArea);
        if (index >= 0) {
          this.assignedServices.splice(index, 1);
        }
        this.remainingServices = difference(this.allServices, this.assignedServices, (object) => object.id);
        this.notificationService.notificationSubject.next('Service removed successfully');
      }
    );
  }

  addService(serviceArea: ServiceArea): void {
    this.four$ = this.devoteeServiceInterestApi.create({devoteeId: this.devoteeId, serviceAreaId: serviceArea.id})
     .subscribe(
       devoteeRole => {
        this.assignedServices.push(serviceArea);
        this.remainingServices = difference(this.allServices, this.assignedServices, (object) => object.id);
        this.notificationService.notificationSubject.next('Service added successfully');
       }
     );
  }

  removeService(serviceArea: ServiceArea): void {
    this.five$ = this.devoteeServiceInterestApi.destroyAll({devoteeId: this.devoteeId, serviceAreaId: serviceArea.id })
    .subscribe(
      devoteeRole => {
        const index = this.assignedServices.indexOf(serviceArea);
        if (index >= 0) {
          this.assignedServices.splice(index, 1);
        }
        this.remainingServices = difference(this.allServices, this.assignedServices, (object) => object.id);
       this.notificationService.notificationSubject.next('Role deleted successfully');
      }
    );
  }


  ngOnDestroy(){
    this.one$.unsubscribe();
    this.two$.unsubscribe();
    this.three$.unsubscribe();
    this.four$.unsubscribe();
    this.five$.unsubscribe();
   }
}
