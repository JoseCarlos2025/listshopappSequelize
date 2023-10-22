import { TestBed } from '@angular/core/testing';

import { ListshopidService } from './listshopid.service';

describe('ListshopidService', () => {
  let service: ListshopidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListshopidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
