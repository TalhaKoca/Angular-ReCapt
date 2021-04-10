import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colors:Color[]=[];
  color:Color;
  updateColorForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getColors();
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        this.getByColorId(params["colorId"]);
      }
    })
    this.createUpdateColorForm();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  getByColorId(colorId:number){
    this.colorService.getByColorId(colorId).subscribe(response=>{
      this.color=response.data[0];
      console.log(this.color)
    })
  }

  createUpdateColorForm(){
    this.updateColorForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  update(){
    if(this.updateColorForm.valid){
      let color:Color=Object.assign({},this.updateColorForm.value);
      color.colorId = this.color.colorId;
      console.log(this.updateColorForm.value)
      console.log(color)
      this.colorService.update(color).subscribe(
        (response) => {
          return this.toastrService.success(
            response.message,
            'Renk Güncelleme başarıyla gerçekleştirildi.'
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
