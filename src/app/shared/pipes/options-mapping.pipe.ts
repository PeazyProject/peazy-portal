import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionsMapping'
})
export class OptionsMappingPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const options: { label: string, value: any }[] = args[0];
    const option = options.find(x => x.value === value);
    return option?.label ?? value;
  }


}
