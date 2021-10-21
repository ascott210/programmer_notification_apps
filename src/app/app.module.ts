import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectionComponent } from './selection/selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmailContainerComponent } from './email-container/email-container.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { HeaderComponent } from './shared/header/header.component';
import { TemplateManagerComponent } from './template-manager/template-manager.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateDetailsComponent } from './template-details/template-details.component';
import { PreviewComponent } from './preview/preview.component';
import { RecipientsComponent } from './recipients/recipients.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    EmailContainerComponent,
    HeaderComponent,
    TemplateManagerComponent,
    TemplateListComponent,
    TemplateDetailsComponent,
    PreviewComponent,
    RecipientsComponent,
  ],
  entryComponents: [
    TemplateManagerComponent,
    TemplateListComponent,
    TemplateDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMultiSelectModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
