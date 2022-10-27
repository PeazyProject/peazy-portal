import { TestBed } from '@angular/core/testing';
import { peazySettingService } from './peazy-setting.service';

describe('peazySettingService', () => {
  let service: peazySettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(peazySettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
