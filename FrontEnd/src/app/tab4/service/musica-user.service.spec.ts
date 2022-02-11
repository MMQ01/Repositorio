import { TestBed } from '@angular/core/testing';

import { MusicaUserService } from './musica-user.service';

describe('MusicaUserService', () => {
  let service: MusicaUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicaUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
