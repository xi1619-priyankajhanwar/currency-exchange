import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'keyvalue',  pure: true })
export class KeysPipe implements PipeTransform {
    transform(value: any, _args: any = null): any {
        return Object.keys(value)
    }
}