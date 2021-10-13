import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonService } from './common.service';
@NgModule({

})
export class CommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonModule,
      providers: [CommonService]
    }
  }
}
