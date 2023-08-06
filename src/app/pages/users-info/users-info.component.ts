import { Component } from '@angular/core';
import { GlobalService } from './../../services/global.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent {
  users:any[]=[];

  constructor(private global:GlobalService){
    this.global.getUsers().subscribe(data=>{
      console.log(data)
      this.users=data.data
   });
  }

}
