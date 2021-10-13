import { AlertModuleModule } from './alert-module.module';

describe('AlertModuleModule', () => {
  let alertModuleModule: AlertModuleModule;

  beforeEach(() => {
    alertModuleModule = new AlertModuleModule();
  });

  it('should create an instance', () => {
    expect(alertModuleModule).toBeTruthy();
  });
});
