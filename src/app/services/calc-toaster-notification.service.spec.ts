import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { CalcToasterNotificationService } from './calc-toaster-notification.service';

describe('CalcToasterNotificationService', () => {
  let service: CalcToasterNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ToastrModule.forRoot() ]
    });
    service = TestBed.inject(CalcToasterNotificationService);
    // service = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
