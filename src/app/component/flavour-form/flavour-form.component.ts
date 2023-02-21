import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { messages } from 'src/app/services/messages';

@Component({
  selector: 'flavour-form',
  templateUrl: './flavour-form.component.html',
  styleUrls: ['./flavour-form.component.scss']
})
export class FlavourFormComponent implements OnInit {

  @Output() reloadData: EventEmitter<any> = new EventEmitter();
  
  newFlavourForm: FormGroup;
  subCategoryList: any[] = [];
  categoryList: any[] = [];
  appData: any[] = [];
  isError: boolean = false;
  errMsg: String;

  constructor(private fb: FormBuilder,
    private httpService: HttpService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.initData();
    this.categoryList = this.dataService.categoryList;
  }

  initData() {
    this.newFlavourForm = this.fb.group({
      "name": "",
      "category": "",
      "ingredient": this.fb.array([]),
      "allergen": "",
      "nutriValue": "",
      "sellingPrice": "",
      "buyingPrice": ""
    })
    this.getAllFlavours();
  }

  getAllFlavours() {
    this.httpService.getAllFlavours().subscribe((res: any) => {
      if (res) {
        this.appData = res;
      }
    }, err => {
      console.log(err);
    })
  }

  changeCategory(name: any) {
    if (name) {
      this.subCategoryList = this.categoryList.filter(item => item.name == name);
      this.subCategoryList = this.subCategoryList[0].subcategory;
      this.subCategoryList.forEach(item => {
        this.newFlavourForm.addControl(item.name, new FormControl());
      })
    }
  }

  validateFlavourName(){
    this.errMsg = "";
    this.isError = false;
    const flavourName = this.newFlavourForm.controls['name'].value.trim()
    const filteredData = this.appData.filter(data => data.name.toLowerCase() == flavourName.toLowerCase());
    if(filteredData.length > 0){
      this.errMsg = messages.flavour_name_present;
      this.isError = true;
    } else{
      this.addNewFlavour();
    }
  }

  addNewFlavour() {
    var flavours = this.newFlavourForm.controls['flavours']?.value?.split(',');
    this.newFlavourForm.controls['flavours']?.setValue(flavours);
    var fruits = this.newFlavourForm.controls['fruits']?.value?.split(',');
    this.newFlavourForm.controls['fruits']?.setValue(fruits);
    this.httpService.addFlavour(this.newFlavourForm.value).subscribe((res: any) => {
      this.newFlavourForm.reset();
      this.reloadData.emit();
    }, err => {
      this.errMsg = messages.provide_form_details;
      this.isError = true;
    })
  }
  
  ingredients(): FormArray {
    return this.newFlavourForm.get("ingredient") as FormArray
  }

  newIngredient(): FormGroup {
    return this.fb.group({
      ingredientName: '',
    })
  }

  addIngredient() {
    this.ingredients().push(this.newIngredient());
  }

  removeIngredient(i: number) {
    this.ingredients().removeAt(i);
  }

  resetData() {
    this.newFlavourForm.reset();
  }

}
