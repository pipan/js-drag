import { Module } from "@wildebeest/js-modules";
import { CommonModule } from "@wildebeest/common";
import { Container } from "inversify";


export class DragModule implements Module
{
    getDependencies(): Array<any>
    {
        return [CommonModule];
    }

    register(container: Container): void { }

    boot(container: Container): void { }
}