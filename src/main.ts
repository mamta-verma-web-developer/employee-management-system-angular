import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense }
from '@syncfusion/ej2-base';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1JHaF1cXmhPYVJ2WmFZfVhgdl9GaFZQQ2YuP1ZhSXxVdkBiWH9ccHxXRGVbWU19XEE='
);