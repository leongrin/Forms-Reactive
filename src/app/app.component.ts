import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {promise} from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenNames = ['Max', 'Suzan'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.deniedName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.deniedEmails])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });

/*    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });*/

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

/*    this.signupForm.setValue({
      'userData': {
        'username': 'Leon',
        'email': 'test@test.com'
      },
      'gender': 'female',
      'hobbies': []
    });*/

    this.signupForm.patchValue({
      'userData': {
        'username': 'Mr. Leonardo'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  deniedName(control: FormControl) {
    if (this.forbiddenNames.includes(control.value)) {
      return {'denied': true};
    }
    return null;
  }

  deniedEmails(control: FormControl) {
    const promise = new Promise((resolve, reject) => setTimeout(
      () => {
        if (control.value === 'l@grinstein.com.br') {
          resolve({'deniedEmail': true});
        } else {
          resolve(null);
        }
      }
      , 3000));
    return promise;
  }


}
