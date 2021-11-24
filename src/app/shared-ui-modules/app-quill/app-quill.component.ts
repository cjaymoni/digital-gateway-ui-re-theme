import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-app-quill',
  templateUrl: './app-quill.component.html',
  styleUrls: ['./app-quill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppQuillComponent implements OnInit {
  text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
  constructor() { }

  ngOnInit() {
  }

  quillConfig={
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['clean'],                                         // remove formatting button
        ['link'],
        //['link', 'image', 'video']  
      ],
      
    },
}


onSelectionChanged = (event:any) =>{
  if(event.oldRange == null){
    console.log('focussed')
  }
  if(event.range == null){
    console.log('blurred')
  }
}

onContentChanged = (event:any) =>{
  //console.log(event.html);
}
}