import { Component } from '@angular/core';
import { NgForm ,FormsModule} from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  model:any={};


  constructor( private global:GlobalService){

  }
  handelRegister(form:NgForm){
    console.log(form);
    console.log(this.model)
    if(form.valid){
     
     this.global.register(this.model).subscribe(data=>{
       console.log(data)
      })
      // this.router.navigateByUrl('/showUsers')
    }
    
   }


}
