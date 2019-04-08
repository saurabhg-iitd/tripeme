import { TestBed } from '@angular/core/testing';
import { GlobalDataService } from './global-data.service';
describe('GlobalDataService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(GlobalDataService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=global-data.service.spec.js.map