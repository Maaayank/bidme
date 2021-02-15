import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../../services/data.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'homepage-baseform',
  templateUrl: './baseform.component.html',
  styleUrls: ['./baseform.component.css']
})
export class BaseformComponent implements OnInit {

  @Output() public onNext: EventEmitter<any> = new EventEmitter();
  @Output() public clearAll: EventEmitter<any> = new EventEmitter();

  title = ""
  nextButtonText = "Next"
  buttonActive: Boolean = false
  out: Boolean = true;

  baseForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    auctionAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
    startsAt: new FormControl(null, Validators.required),
    endsAt: new FormControl(null, Validators.required),
  })

  constructor(
    private _dataService: DataService,
  ) { }

  ngOnInit(): void {
  }

  onNextClicked() {
    if (this.nextButtonText == "Next") {
      this.nextButtonText = "Clear All"
      this.onNext.emit(this.baseForm.value)
    } else {
      this.nextButtonText = "Next"
      this.baseForm.setValue({
        title: "",
        auctionAmount: "",
        startsAt: "",
        endsAt: ""
      })

      this.clearAll.emit()
    }
  }

}
