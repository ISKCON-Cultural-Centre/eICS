import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevoteeComponent } from './devotee.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, DevoteeSearchSelectService } from '../../../app/shared/services';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { DevoteeSearchComponent } from './devotee-search.component';
import { DevoteeProfileComponent } from './devotee-profile.component';
import { DevoteeRoleComponent } from './devotee-role.component';
import { CommonComponentsModule } from '../common/common-components.module';
import { DevoteeSkillComponent } from './devotee-skill.component';
import { DevoteeLanguageComponent } from './devotee-language.component';
import { DevoteeServiceInterestComponent } from './devotee-service-interest.component';
import { DevoteeServiceAvailabilityComponent } from './devotee-service-availability.component';
import { ChangePasswordComponent } from './change-password.component';
import { DevoteeDetailSearchComponent } from './devotee-detail-search.component';
import { DevoteesListService } from './devotees-list-service';
import { DevoteeDetailComponent } from './devotee-detail.component';
import { DevoteesListComponent } from './devotees-list.component';
import { DevoteeSearchFilterShareService } from './devotee-search-filter-share-service';
import { DevoteeSearchFilterComponent } from './devotee-search-filter.component';
import { DevoteeCardComponent } from './devotee-card.component';
import { DevoteeQuickAddComponent } from './devotee-quick-add.component';
import { DevoteeDetailAddComponent } from './devotee-detail-add.component';
import { DevoteeMaterialFamilyComponent } from './devotee-material-family.component';
import { DevoteeGroupComponent } from './devotee-group.component';
import { DevoteeLiteSearchComponent } from './devotee-lite-search.component';
import { DevoteeServiceComponent } from './devotee-service.component';
import { DevoteeManagementComponent } from './devotee-management.component'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserModule,
    CommonComponentsModule
  ],
  declarations: [
    DevoteeComponent, 
    DevoteeSearchComponent, 
    DevoteeProfileComponent, DevoteeRoleComponent, DevoteeSkillComponent,
    DevoteeLanguageComponent, DevoteeServiceInterestComponent, 
    DevoteeServiceAvailabilityComponent, ChangePasswordComponent, DevoteeDetailSearchComponent, 
    DevoteeDetailComponent, DevoteesListComponent, DevoteeSearchFilterComponent, DevoteeCardComponent, 
    DevoteeQuickAddComponent, DevoteeDetailAddComponent, 
    DevoteeMaterialFamilyComponent, DevoteeGroupComponent, 
    DevoteeLiteSearchComponent, DevoteeServiceComponent, DevoteeManagementComponent
  ],
  providers: [
    DevoteeSearchSelectService,
    DevoteesListService,
    DevoteeSearchFilterShareService
  ],
  entryComponents: [
    DevoteeDetailComponent,
    DevoteeQuickAddComponent,
    DevoteeDetailAddComponent,
    DevoteeProfileComponent,
    DevoteeCardComponent
  ],  
  exports: [
    DevoteeSearchComponent
  ],
})
export class DevoteeModule { }
