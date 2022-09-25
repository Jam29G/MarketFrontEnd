import { NgModule } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';
import {TreeSelectModule} from 'primeng/treeselect';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DataViewModule} from 'primeng/dataview';
import {InputNumberModule} from 'primeng/inputnumber';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [],
  exports: [
    MenubarModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    PaginatorModule,
    TreeSelectModule,
    CheckboxModule,
    RadioButtonModule,
    DataViewModule,
    InputNumberModule,
    MultiSelectModule
  ]
})
export class PrimeNgModule { }
