import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './AppComponents/app.component';
import { AppRoutes } from './app.routing';
import { CoreModule } from './Core/core.module';
import { ValueComponent } from './AppComponents/value/value.component';

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
  ],
  imports: [
    CoreModule,
    HttpModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
