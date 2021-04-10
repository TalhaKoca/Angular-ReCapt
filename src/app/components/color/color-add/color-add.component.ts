import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  color:Color;
  addColorForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService
  ) { }

  ngOnInit(): void {

    this.createColorAddForm();
  }


  createColorAddForm(){
    this.addColorForm = this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  addColor(){
    if(this.addColorForm.valid){
      this.color = Object.assign({},this.addColorForm.value);
      this.colorService.add(this.color).subscribe(response=>{
        this.addColorForm.reset();
        this.toastrService.success(response.message,'Girdi başarıyla eklendi')
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
