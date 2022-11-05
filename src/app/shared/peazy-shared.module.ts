import { PasswordModule } from 'primeng/password';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { StepsModule } from 'primeng/steps';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipsModule } from 'primeng/chips';
import { TranslateModule } from '@ngx-translate/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { PickListModule } from 'primeng/picklist';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { TimelineModule } from 'primeng/timeline';
import { EditorModule } from 'primeng/editor';
import { TabMenuModule } from 'primeng/tabmenu';
import { GalleriaModule } from 'primeng/galleria';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReplaceNullWithPipe } from './pipes/replace-null-with.pipe';
import { OptionsMappingPipe } from './pipes/options-mapping.pipe';
import {RatingModule} from 'primeng/rating';
import { ImagePipe } from './pipes/image.pipe';

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
  AutoCompleteModule,
  RatingModule
];

@NgModule({
  declarations: [
    ReplaceNullWithPipe,
    OptionsMappingPipe,
    ImagePipe
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
    OptionsMappingPipe,
    ImagePipe
  ]
})
export class PeazySharedModule { }
