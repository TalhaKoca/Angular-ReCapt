import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brands:Brand[]=[];
  brand:Brand;
  updateBrandForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService :BrandService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getByBrandId(params["brandId"]);
      }
    })
    this.createUpdateBrandForm();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  getByBrandId(brandId:number){
    this.brandService.getByBrandId(brandId).subscribe(response=>{
      this.brand = response.data[0];
      console.log(this.brand)
    })
  }

  createUpdateBrandForm(){
    this.updateBrandForm=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  update(){
    if(this.updateBrandForm.valid){
      let brand:Brand=Object.assign({},this.updateBrandForm.value);
      brand.brandId = this.brand.brandId;
      console.log(this.updateBrandForm.value)
      console.log(brand)
      this.brandService.update(brand).subscribe(
        (response) => {
          return this.toastrService.success(
            response.message,
            'Marka Güncelleme başarıyla gerçekleştirildi.'
          );
        },
        (responseError) => {
          console.log(responseError.error.ValidationErrors);
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
        }
      );
    }else {
      this.toastrService.warning('Form eksik bilgiler içeriyor.', 'Dikkat');
    }
  }

}
