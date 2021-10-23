import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { minDateValidator } from './MinDate.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularQuestReactiveForm';

  // declare all controls with validation rules
  orderForm = this.fb.group({
    title: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.max(5)]],
    date: ['', Validators.required],
    contact: ['', [Validators.required, Validators.email]],
    payments: this.fb.array([]) // FormArray control
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  addPayment() {
    // create FormGroup with two FormControl
    const paymentForm = this.fb.group({
      date: ['', [Validators.required, minDateValidator(new Date())]],
      amount: ['', Validators.required]
    });
    // parse abstract control to FormArray
    const payments = this.orderForm.get('payments') as FormArray;
    // add new FormGroup to control 'payments'
    payments.push(paymentForm);
  }

  get payments(): FormArray {
    // convert abstract control to FormArray
    return this.orderForm.get('payments') as FormArray;
  }

  onSubmit(){
    alert("Submited")
  }
}
