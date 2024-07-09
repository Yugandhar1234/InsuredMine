import { NgModule } from "@angular/core";
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

const modules = [
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatOptionModule,
    MatIconModule
]
@NgModule({
    imports: [modules],
    exports: [modules]
})
export class MaterialModule { }