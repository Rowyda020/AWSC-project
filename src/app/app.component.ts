import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public global:GlobalService){
    if(localStorage.getItem('token')) this.global.isLogIn = true
    console.log(this.global.isLogIn)
    
  }
  title = 'str-group';

  showFiller = false;
  toggleButtonCounter = 0;

  plus() {
    this.toggleButtonCounter++;
  } 


  


  handleLogOut(){
    localStorage.removeItem('token')
    this.global.isLogIn = false
    
  }
}
