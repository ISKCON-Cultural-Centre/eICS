import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { LookupService } from '../../shared/services/lookup.service';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { RelationshipMaster } from '../../shared/sdk/models/RelationshipMaster';
import { LookupData } from '../../shared/services/models/lookupData';
import { LookupTableData } from '../../shared/services/models/lookupTableData';
import { LookupEntryComponent } from './lookup-entry/lookup-entry.component';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css'],
  entryComponents:[ LookupEntryComponent ]
})
export class LookupComponent implements OnInit, AfterViewInit {

  relationships: RelationshipMaster[];  
  lookupData: LookupData[];
  newLookupData:LookupData;
  modifiedLookupData:LookupData;
  //isLoggedIn: Boolean;
  //isLoggedIn$: Observable <Boolean>;
  //devoteeName$: Observable <String>;
  username: String = '';
  selectedLookupTable: LookupTableData;
  lookupTables: LookupTableData[];
  displayedColumns = []; //Used to store display Column Names and actual coulmn names
  columns = []; //Used to refer to the actual columns
  selection = new SelectionModel(false, []);
  modeNew = "New";
  modeEdit ="Edit";
  //dataSource = new MatTableDataSource<Element>(this.relationships);
  dataSource = new MatTableDataSource();  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private notificationService: NotificationService,
    private lookupService: LookupService,
    public dialog: MatDialog) {
     }

 getLookupData():void{
   this.displayedColumns = [];
   this.columns = ['select'];
   this.lookupService.getLookupData(this.selectedLookupTable.lookupTableName)
   .subscribe(lookupData=> {(this.dataSource = new MatTableDataSource(lookupData)),
     (this.selectedLookupTable.fields.forEach((obj,index)=>{this.displayedColumns.
      push({fieldDisplayName:obj.fieldDisplayName, fieldName:"lookupField"+(index) });
      if(index>0)this.columns.push("lookupField" + (index))})), (this.dataSource.paginator = 
        this.paginator),(this.dataSource.sort = this.sort) 
     });
 }

 getLookupTableData():void{
   this.lookupService.getLookupTableData()
      .subscribe(lookupTables => {(this.lookupTables = lookupTables)});
 }  

 ngOnInit() {

}

 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  openDialog(mode:string): void {
    var self = this;
    let dialogRef;
    if(mode == this.modeNew){
       dialogRef = this.dialog.open(LookupEntryComponent, {
        width: '500px',
        data: {selectedLookupTable: this.selectedLookupTable, lookupItem:new Object({id:null}), mode:mode}
      });

      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      self.newLookupData = result;
      self.dataSource.data = self.dataSource.data.concat([self.newLookupData]);
      self.dataSource = new MatTableDataSource(self.dataSource.data);
      self.selection = new SelectionModel(false, []);
      });
    }
    else if(mode == this.modeEdit){     
       dialogRef = this.dialog.open(LookupEntryComponent, {
        width: '500px',
        data: {selectedLookupTable: this.selectedLookupTable, lookupItem:this.selection.selected[0], mode:mode}
      }); 

      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      self.modifiedLookupData = result;
      }); 
    }
  }

  onDeleteClick():void {   
    if(confirm("Are you sure to delete "+this.selection.selected[0].lookupField1 + " entry")) {
      this.selection.selected.forEach(item => {
      console.log(item);
      this.dataSource.data.splice(this.dataSource.data.findIndex(x=>x ==this.selection.selected[0]),1);

      this.dataSource = new MatTableDataSource(this.dataSource.data);
      });
    }  
  }
}