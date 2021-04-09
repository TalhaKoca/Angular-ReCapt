import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brand:Brand;
  addBrandForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService
  ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.addBrandForm = this.formBuilder.group({
      brandName : ["",Validators.required]
    })
  }

  addBrand(){
    if(this.addBrandForm.valid){
      this.brand = Object.assign({},this.addBrandForm.value);
      this.brandService.add(this.brand).subscribe(response=>{
        this.addBrandForm.reset();
        this.toastrService.success(response.message,'Belirtilen marka başarıyla eklendi.')
      },responseError=>{
        if (responseError.error.ValidationErrors.length > 0)
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
      })
    }else {
      this.toastrService.warning('Form eksik bilgiler içeriyor.', 'Dikkat');
    }
  }

}
