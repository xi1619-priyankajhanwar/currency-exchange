import { TestBed } from '@angular/core/testing';

import { CurrencyExchangerService } from './currency-exchanger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CurrencyExchangerService', () => {
  let service: CurrencyExchangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [CurrencyExchangerService]
    });
    service = TestBed.inject(CurrencyExchangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
