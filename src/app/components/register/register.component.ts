import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { reservedNameValidator } from './reserved-name.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm!: FormGroup<{
    name: FormControl<string | null>;
    username: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(18),
          reservedNameValidator(),
        ],
      ],
      username: [
        '',
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(18),
      ],
      email: ['', Validators.required, Validators.email],
      password: [
        '',
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ],
      confirmPassword: [
        '',
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ],
    });
  }

  get registrationFormControls() {
    return this.registrationForm.controls;
  }

  register(v: {
    name: string;
    username: string;
    email: string;
    password: string;
  }): void {}

  getFormValue(): void {}
}
