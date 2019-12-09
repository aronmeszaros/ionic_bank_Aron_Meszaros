import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwitchUserPage } from './switch-user.page';

describe('SwitchUserPage', () => {
  let component: SwitchUserPage;
  let fixture: ComponentFixture<SwitchUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
