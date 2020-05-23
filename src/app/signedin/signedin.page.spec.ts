import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignedinPage } from './signedin.page';

describe('SignedinPage', () => {
  let component: SignedinPage;
  let fixture: ComponentFixture<SignedinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignedinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
