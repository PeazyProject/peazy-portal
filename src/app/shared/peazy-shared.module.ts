import { PasswordModule } from 'primeng-lts/password';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng-lts/calendar';
import { DropdownModule } from 'primeng-lts/dropdown';
import { InputTextModule } from 'primeng-lts/inputtext';
import { ButtonModule } from 'primeng-lts/button';
import { TableModule } from 'primeng-lts/table';
import { ToastModule } from 'primeng-lts/toast';
import { BlockUIModule } from 'primeng-lts/blockui';
import { ProgressSpinnerModule } from 'primeng-lts/progressspinner';
import { SidebarModule } from 'primeng-lts/sidebar';
import { PanelMenuModule } from 'primeng-lts/panelmenu';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';
import { PanelModule } from 'primeng-lts/panel';
import { DataViewModule } from 'primeng-lts/dataview';
import { CardModule } from 'primeng-lts/card';
import { RippleModule } from 'primeng-lts/ripple';
import { DialogModule } from 'primeng-lts/dialog';
import { AccordionModule } from 'primeng-lts/accordion';
import { ListboxModule } from 'primeng-lts/listbox';
import { RadioButtonModule } from 'primeng-lts/radiobutton';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { MultiSelectModule } from 'primeng-lts/multiselect';
import { StepsModule } from 'primeng-lts/steps';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { ChipsModule } from 'primeng-lts/chips';
import { TranslateModule } from '@ngx-translate/core';
import { InputSwitchModule } from 'primeng-lts/inputswitch';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import { FileUploadModule } from 'primeng-lts/fileupload'
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { TagModule } from 'primeng-lts/tag';
import { TooltipModule } from 'primeng-lts/tooltip';
import { PickListModule } from 'primeng-lts/picklist';
import { ConfirmPopupModule } from 'primeng-lts/confirmpopup';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { MenubarModule } from 'primeng-lts/menubar';
import { TimelineModule } from 'primeng-lts/timeline';
import { EditorModule } from 'primeng-lts/editor';
import { TabMenuModule } from 'primeng-lts/tabmenu';
import { GalleriaModule } from 'primeng-lts/galleria';
import { TabViewModule } from 'primeng-lts/tabview';
import { AutoCompleteModule } from 'primeng-lts/autocomplete';
import { ReplaceNullWithPipe } from './pipes/replace-null-with.pipe';
import { OptionsMappingPipe } from './pipes/options-mapping.pipe';


const primengModules = [
  CalendarModule,
  DropdownModule,
  InputTextModule,
  ButtonModule,
  TableModule,
  ToastModule,
  BlockUIModule,
  ProgressSpinnerModule,
  SidebarModule,
  PanelMenuModule,
  OverlayPanelModule,
  PanelModule,
  DataViewModule,
  CardModule,
  DialogModule,
  RippleModule,
  AccordionModule,
  ListboxModule,
  RadioButtonModule,
  MultiSelectModule,
  CheckboxModule,
  StepsModule,
  InputNumberModule,
  ChipsModule,
  InputSwitchModule,
  ConfirmDialogModule,
  FileUploadModule,
  InputTextareaModule,
  TagModule,
  TooltipModule,
  PickListModule,
  ConfirmPopupModule,
  ToolbarModule,
  MenubarModule,
  PasswordModule,
  TimelineModule,
  EditorModule,
  TabMenuModule,
  GalleriaModule,
  TabViewModule,
  TimelineModule,
  AutoCompleteModule
];

@NgModule({
  declarations: [
    ReplaceNullWithPipe,
    OptionsMappingPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ...primengModules,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ...primengModules,
    ReplaceNullWithPipe,
    OptionsMappingPipe
  ]
})
export class PeazySharedModule { }
