import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  matrix:any[][]=[];
  numberOfColumns=4;
  gameOver=false;
  currentScore=0;
  isView=false
  
  ngOnInit(): void {
    this.restart()
  }

  selectNumberOfColumn(event:any){
    if(event.target.value==null || event.target.value=="")return;
    this.isView=false;
    this.numberOfColumns=event.target.value;
    this.restart()
  }

  createMatrix(){
    for(let i=0;i<this.numberOfColumns;i++){
      this.matrix[i] = []
      for(let j=0;j<this.numberOfColumns;j++){
        this.matrix[i][j]=0;
      }
    }
  }

  restart(){
    this.matrix=[]
    this.createMatrix();
    this.generate();
    this.generate();
    this.gameOver=false;
    this.currentScore=0;
    this.isView=true;
  }


  generate() {
    let row = Math.floor(Math.random() *this.numberOfColumns)
    let column = Math.floor(Math.random() *this.numberOfColumns)
    if (this.matrix[row][column] == 0) {
      this.matrix[row][column]=2
      this.checkForGameOver()
    } else this.generate()
  }

  checkForGameOver(){
    this.gameOver=true
    for(let i=0;i<this.numberOfColumns;i++){
      for(let j=0;j<this.numberOfColumns;j++){
        if(this.matrix[i][j]==0)this.gameOver=false;
      }
      if(!this.gameOver)break;
    }
  }

  clickEvent(shiftDirection:any){
    if(this.gameOver)return;
    switch(shiftDirection){
      case "left":this.leftMove();break;
      case "right":this.rightMove();break;
      case "up":this.upMove();break;
      case "down":this.bottomMove();break;
    }
    this.generate();
  }

  leftMove(){
      for(let i=0;i<this.numberOfColumns;i++){
        let count=0;
        let arr:number[]=this.opration(this.matrix[i]);
        for(let j=0;j<this.numberOfColumns;j++){
          if(arr[j]!=0){
            arr[count]=arr[j];
            if(count!=j)arr[j]=0;
            count++;
          }
        }
        this.matrix[i]= arr;
      }
  }

  rightMove(){
    for(let i=0;i<this.numberOfColumns;i++){
      let count=this.numberOfColumns-1;
      let arr:number[]=this.reversOpration(this.matrix[i]);
      for(let j=this.numberOfColumns-1;j>=0;j--){
        if(arr[j]!=0){
          arr[count]=arr[j];
          if(count!=j)arr[j]=0;
          count--;
        }
      }
      this.matrix[i]= arr;
    }
  }

  upMove(){
    for(let i=0;i<this.numberOfColumns;i++){
      let count=0;
      let arr:number[]=this.opration(this.getColumnArr(i));
      for(let j=0;j<this.numberOfColumns;j++){
        if(arr[j]!=0){
          arr[count]=arr[j];
          if(count!=j)arr[j]=0;
          count++;
        }
      }
      for(let j=0;j<this.numberOfColumns;j++){
        this.matrix[j][i]= arr[j];
      }
    }
  }

  bottomMove(){
    for(let i=0;i<this.numberOfColumns;i++){
      let count=this.numberOfColumns-1;
      let arr:number[]=this.reversOpration(this.getColumnArr(i));

      for(let j=this.numberOfColumns-1;j>=0;j--){
        if(arr[j]!=0){
          arr[count]=arr[j];
          if(count!=j)arr[j]=0;
          count--;
        }
      }
      for(let j=0;j<this.numberOfColumns;j++){
        this.matrix[j][i]= arr[j];
      }
    }
  }

  getColumnArr(columnIndex:number):number[]{
    let columnArray:number[]=[]
    for(let i=0;i<this.numberOfColumns;i++){
      columnArray[i]=this.matrix[i][columnIndex];
    }
    return columnArray;
  }

  opration(arr:number[]):number[]{
    let i=1;
    while(i<this.numberOfColumns){
      if(arr[i-1]==arr[i]){
        arr[i-1]=2*arr[i];
        this.currentScore=this.currentScore+arr[i-1];
        arr[i]=0;
      }
      i++;
    }
    return arr;
  }

  reversOpration(arr:number[]):number[]{
    let i=this.numberOfColumns-2;
    while(i>=0){
      if(arr[i+1]==arr[i]){
        arr[i+1]=2*arr[i];
        this.currentScore=this.currentScore+arr[i+1];
        arr[i]=0;
      }
      i--;
    }
    return arr;
  }


}
