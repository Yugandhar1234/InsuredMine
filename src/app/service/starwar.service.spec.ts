import { TestBed } from '@angular/core/testing';

import { StarwarService } from './starwar.service';

describe('StarwarService', () => {
  let service: StarwarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarwarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
