import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'homepage-baseform',
  templateUrl: './baseform.component.html',
  styleUrls: ['./baseform.component.css']
})
export class BaseformComponent implements OnInit {


  @Output() public onNext: EventEmitter<any> = new EventEmitter();
  @Output() public clearAll: EventEmitter<any> = new EventEmitter();

  nextButtonText = "Next"
  buttonActive: Boolean = false
  disableForm: Boolean = false
  out: Boolean = true;

  selected;
  keyword = 'productTitle';
  data: Titles;

  isloggedIn: Boolean = false;

  baseForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    auctionAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
    startsAt: new FormControl(null, Validators.required),
    endsAt: new FormControl(null, Validators.required),
  })

  constructor(
    private _userService: UserService,
    private _dataService: DataService,
    private _toastr: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._toastr.info("", "Initializing....")

    this._dataService.isLoggedIn.subscribe((data) => {
      this.isloggedIn = data
    })

    this._userService.productTitles().subscribe(
      (data: any) => {
        this._toastr.success("", "Ready")
        this.data = data.titles
      },
      err => console.log(err)
    )
  }

  onNextClicked() {
    if (this.isloggedIn) {

      if (this.nextButtonText == "Next") {
        this.disableForm = true
        this.nextButtonText = "Clear All"
        var formData = this.baseForm.value
        formData.selectedProduct = this.selected
        this.onNext.emit(formData)
      } else {
        this.nextButtonText = "Next"
        this.disableForm = false
        this.baseForm.setValue({
          title: "",
          auctionAmount: "",
          startsAt: "",
          endsAt: ""
        })
        this.clearAll.emit()
      }

    } else {

      this._toastr.info("", "Please Signin to Continue")
      this._router.navigate(['/login']);
      
    }
  }

  selectEvent(title) {
    this.selected = title
  }
}

interface Titles {
  pid: String,
  productTitle: String
}
