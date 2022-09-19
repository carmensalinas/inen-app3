import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if(post.nombres.toLowerCase().indexOf(arg) > -1){
        resultPosts.push(post);
      }else if(post.numDocumento.indexOf(arg) > -1){
        resultPosts.push(post);
      }else if(post.nombres.toUpperCase().indexOf(arg) > -1){
        resultPosts.push(post);
      }else if(post.apellidos.toUpperCase().indexOf(arg) > -1){
        resultPosts.push(post);
      }else if(post.apellidos.toLowerCase().indexOf(arg) > -1){
        resultPosts.push(post);
      }
    }
    return resultPosts; 
  }

}
